import { supabase, type SharedFile } from '../lib/supabase';
import bcrypt from 'bcryptjs';

interface CreateShareLinkParams {
  fileName: string;
  content: string;
  password?: string;
  expiry: '1week' | '1month' | 'unlimited';
  allowDownload: boolean;
}

export const shareService = {
  /**
   * 共有リンクを作成
   */
  async createShareLink(params: CreateShareLinkParams): Promise<{ url: string; id: string }> {
    const { fileName, content, password, expiry, allowDownload } = params;

    // パスワードをハッシュ化
    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    // データベースに保存
    const { data, error } = await supabase
      .from('shared_files')
      .insert({
        file_name: fileName,
        content,
        password_hash: passwordHash,
        expiry_type: expiry,
        allow_download: allowDownload
      })
      .select()
      .single();

    if (error) {
      console.error('共有リンクの作成に失敗しました:', error);
      throw new Error('共有リンクの作成に失敗しました');
    }

    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const url = `${baseUrl}/share/${data.id}`;

    return { url, id: data.id };
  },

  /**
   * 共有ファイルを取得
   */
  async getSharedFile(id: string, password?: string): Promise<SharedFile> {
    // ファイル情報を取得
    const { data, error } = await supabase
      .from('shared_files')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new Error('共有ファイルが見つかりません');
    }

    // 期限切れチェック
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      throw new Error('この共有リンクは期限切れです');
    }

    // パスワードチェック
    if (data.password_hash) {
      if (!password) {
        throw new Error('パスワードが必要です');
      }

      const isValidPassword = await bcrypt.compare(password, data.password_hash);
      if (!isValidPassword) {
        throw new Error('パスワードが正しくありません');
      }
    }

    // ビューカウントを更新
    await supabase
      .from('shared_files')
      .update({ view_count: data.view_count + 1 })
      .eq('id', id);

    return data as SharedFile;
  },

  /**
   * 共有ファイルをダウンロード
   */
  async downloadSharedFile(id: string, password?: string): Promise<{ fileName: string; content: string }> {
    const sharedFile = await this.getSharedFile(id, password);

    if (!sharedFile.allow_download) {
      throw new Error('このファイルはダウンロードできません');
    }

    return {
      fileName: sharedFile.file_name,
      content: sharedFile.content
    };
  }
};