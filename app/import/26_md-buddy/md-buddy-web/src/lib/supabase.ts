import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your-supabase-url' && 
  supabaseAnonKey !== 'your-supabase-anon-key';

if (!isSupabaseConfigured) {
  console.warn('Supabase環境変数が設定されていません。共有機能は使用できません。');
}

// ダミーのSupabaseクライアント（設定されていない場合）
const dummySupabase = {
  from: () => ({
    insert: () => Promise.reject(new Error('Supabaseが設定されていません')),
    select: () => Promise.reject(new Error('Supabaseが設定されていません')),
    update: () => Promise.reject(new Error('Supabaseが設定されていません')),
    delete: () => Promise.reject(new Error('Supabaseが設定されていません'))
  })
};

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : dummySupabase as any;

// 共有ファイルの型定義
export interface SharedFile {
  id: string;
  file_name: string;
  content: string;
  password_hash?: string;
  expiry_type: '1week' | '1month' | 'unlimited';
  expires_at?: string;
  allow_download: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}