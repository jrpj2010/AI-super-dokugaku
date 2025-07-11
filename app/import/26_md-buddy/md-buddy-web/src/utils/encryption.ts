// 音声データ暗号化ユーティリティ

// 暗号化設定
export interface EncryptionConfig {
  algorithm?: string;
  keyLength?: number;
  ivLength?: number;
  saltLength?: number;
  iterations?: number;
}

// 暗号化結果
export interface EncryptedData {
  encrypted: ArrayBuffer;
  iv: Uint8Array;
  salt: Uint8Array;
  authTag?: Uint8Array;
}

// 復号化オプション
export interface DecryptionOptions {
  iv: Uint8Array;
  salt: Uint8Array;
  authTag?: Uint8Array;
}

// デフォルト設定
const DEFAULT_CONFIG: Required<EncryptionConfig> = {
  algorithm: 'AES-GCM',
  keyLength: 256,
  ivLength: 12,
  saltLength: 16,
  iterations: 100000
};

// エンコーディングユーティリティ
class EncodingUtils {
  // ArrayBufferをBase64に変換
  static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  // Base64をArrayBufferに変換
  static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // 文字列をArrayBufferに変換
  static stringToArrayBuffer(str: string): ArrayBuffer {
    const encoder = new TextEncoder();
    return encoder.encode(str).buffer;
  }

  // ArrayBufferを文字列に変換
  static arrayBufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder();
    return decoder.decode(buffer);
  }

  // 16進数文字列に変換
  static toHex(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // 16進数文字列から変換
  static fromHex(hex: string): ArrayBuffer {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes.buffer;
  }
}

// 暗号化クラス
export class AudioEncryption {
  private config: Required<EncryptionConfig>;

  constructor(config: EncryptionConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // パスワードからキーを生成
  async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    // パスワードをインポート
    const passwordKey = await crypto.subtle.importKey(
      'raw',
      EncodingUtils.stringToArrayBuffer(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    // PBKDF2でキーを導出
    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: this.config.iterations,
        hash: 'SHA-256'
      },
      passwordKey,
      {
        name: this.config.algorithm,
        length: this.config.keyLength
      },
      false,
      ['encrypt', 'decrypt']
    );
  }

  // ランダムな値を生成
  generateRandom(length: number): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(length));
  }

  // 音声データを暗号化
  async encryptAudio(
    audioData: ArrayBuffer,
    password: string
  ): Promise<EncryptedData> {
    try {
      // Salt と IV を生成
      const salt = this.generateRandom(this.config.saltLength);
      const iv = this.generateRandom(this.config.ivLength);

      // キーを導出
      const key = await this.deriveKey(password, salt);

      // 暗号化
      const encryptedBuffer = await crypto.subtle.encrypt(
        {
          name: this.config.algorithm,
          iv
        },
        key,
        audioData
      );

      // GCMの場合、認証タグを抽出
      let authTag: Uint8Array | undefined;
      if (this.config.algorithm === 'AES-GCM') {
        const encryptedArray = new Uint8Array(encryptedBuffer);
        const tagLength = 16; // GCMの認証タグは128ビット
        authTag = encryptedArray.slice(-tagLength);
      }

      return {
        encrypted: encryptedBuffer,
        iv,
        salt,
        authTag
      };
    } catch (error) {
      throw new Error(`暗号化エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
    }
  }

  // 音声データを復号化
  async decryptAudio(
    encryptedData: ArrayBuffer,
    password: string,
    options: DecryptionOptions
  ): Promise<ArrayBuffer> {
    try {
      // キーを導出
      const key = await this.deriveKey(password, options.salt);

      // 復号化
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: this.config.algorithm,
          iv: options.iv
        },
        key,
        encryptedData
      );

      return decryptedBuffer;
    } catch (error) {
      throw new Error(`復号化エラー: ${error instanceof Error ? error.message : '不明なエラー'}`);
    }
  }

  // ファイル暗号化（大きなファイル用チャンク処理）
  async encryptFileInChunks(
    file: File | Blob,
    password: string,
    onProgress?: (progress: number) => void
  ): Promise<EncryptedData> {
    const chunkSize = 1024 * 1024; // 1MB chunks
    const chunks: ArrayBuffer[] = [];
    let offset = 0;

    // Salt と IV を生成
    const salt = this.generateRandom(this.config.saltLength);
    const iv = this.generateRandom(this.config.ivLength);
    const key = await this.deriveKey(password, salt);

    while (offset < file.size) {
      const chunk = file.slice(offset, offset + chunkSize);
      const buffer = await chunk.arrayBuffer();
      
      // 進捗報告
      if (onProgress) {
        onProgress((offset + chunk.size) / file.size);
      }

      chunks.push(buffer);
      offset += chunkSize;
    }

    // すべてのチャンクを結合
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0);
    const combined = new Uint8Array(totalLength);
    let currentOffset = 0;

    for (const chunk of chunks) {
      combined.set(new Uint8Array(chunk), currentOffset);
      currentOffset += chunk.byteLength;
    }

    // 暗号化
    const encrypted = await crypto.subtle.encrypt(
      {
        name: this.config.algorithm,
        iv
      },
      key,
      combined.buffer
    );

    return {
      encrypted,
      iv,
      salt
    };
  }

  // セキュアな音声データの消去
  secureErase(buffer: ArrayBuffer): void {
    const view = new Uint8Array(buffer);
    // ランダムデータで上書き（3回）
    for (let i = 0; i < 3; i++) {
      crypto.getRandomValues(view);
    }
    // 最後にゼロで上書き
    view.fill(0);
  }

  // 暗号化データのシリアライズ（保存用）
  serializeEncryptedData(data: EncryptedData): string {
    const serialized = {
      encrypted: EncodingUtils.arrayBufferToBase64(data.encrypted),
      iv: EncodingUtils.arrayBufferToBase64(data.iv.buffer),
      salt: EncodingUtils.arrayBufferToBase64(data.salt.buffer),
      authTag: data.authTag ? 
        EncodingUtils.arrayBufferToBase64(data.authTag.buffer) : 
        undefined
    };

    return JSON.stringify(serialized);
  }

  // 暗号化データのデシリアライズ
  deserializeEncryptedData(serialized: string): EncryptedData {
    const parsed = JSON.parse(serialized);
    
    return {
      encrypted: EncodingUtils.base64ToArrayBuffer(parsed.encrypted),
      iv: new Uint8Array(EncodingUtils.base64ToArrayBuffer(parsed.iv)),
      salt: new Uint8Array(EncodingUtils.base64ToArrayBuffer(parsed.salt)),
      authTag: parsed.authTag ? 
        new Uint8Array(EncodingUtils.base64ToArrayBuffer(parsed.authTag)) : 
        undefined
    };
  }

  // パスワード強度チェック
  static checkPasswordStrength(password: string): {
    score: number;
    feedback: string[];
  } {
    let score = 0;
    const feedback: string[] = [];

    // 長さチェック
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length < 8) feedback.push('パスワードは8文字以上にしてください');

    // 文字種チェック
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    // フィードバック
    if (!/[a-z]/.test(password)) feedback.push('小文字を含めてください');
    if (!/[A-Z]/.test(password)) feedback.push('大文字を含めてください');
    if (!/[0-9]/.test(password)) feedback.push('数字を含めてください');
    if (!/[^a-zA-Z0-9]/.test(password)) feedback.push('特殊文字を含めてください');

    // 一般的なパスワードチェック
    const commonPasswords = ['password', '12345678', 'qwerty', 'abc123'];
    if (commonPasswords.includes(password.toLowerCase())) {
      score = 0;
      feedback.push('一般的なパスワードは使用しないでください');
    }

    return {
      score: Math.min(score, 5),
      feedback
    };
  }
}

// メタデータ暗号化（音声以外の情報用）
export class MetadataEncryption {
  // JSONデータの暗号化
  static async encryptJSON<T>(
    data: T,
    password: string
  ): Promise<string> {
    const encryption = new AudioEncryption();
    const jsonString = JSON.stringify(data);
    const buffer = EncodingUtils.stringToArrayBuffer(jsonString);
    
    const encrypted = await encryption.encryptAudio(buffer, password);
    return encryption.serializeEncryptedData(encrypted);
  }

  // JSONデータの復号化
  static async decryptJSON<T>(
    encryptedString: string,
    password: string
  ): Promise<T> {
    const encryption = new AudioEncryption();
    const encrypted = encryption.deserializeEncryptedData(encryptedString);
    
    const decrypted = await encryption.decryptAudio(
      encrypted.encrypted,
      password,
      {
        iv: encrypted.iv,
        salt: encrypted.salt,
        authTag: encrypted.authTag
      }
    );
    
    const jsonString = EncodingUtils.arrayBufferToString(decrypted);
    return JSON.parse(jsonString);
  }
}

// エクスポート
export { EncodingUtils };

// デフォルトインスタンス
export const defaultEncryption = new AudioEncryption();