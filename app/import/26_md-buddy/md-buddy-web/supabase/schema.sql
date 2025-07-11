-- 共有リンク管理テーブル
CREATE TABLE IF NOT EXISTS shared_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  content TEXT NOT NULL,
  password_hash TEXT, -- パスワードが設定されている場合のハッシュ値
  expiry_type TEXT NOT NULL CHECK (expiry_type IN ('1week', '1month', 'unlimited')),
  expires_at TIMESTAMP WITH TIME ZONE,
  allow_download BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_shared_files_expires_at ON shared_files(expires_at);
CREATE INDEX idx_shared_files_created_at ON shared_files(created_at);

-- 期限切れファイルの自動削除関数
CREATE OR REPLACE FUNCTION delete_expired_files()
RETURNS void AS $$
BEGIN
  DELETE FROM shared_files
  WHERE expires_at IS NOT NULL AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- 期限設定時に自動的にexpires_atを計算するトリガー
CREATE OR REPLACE FUNCTION set_expiry_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expiry_type = '1week' THEN
    NEW.expires_at = NOW() + INTERVAL '7 days';
  ELSIF NEW.expiry_type = '1month' THEN
    NEW.expires_at = NOW() + INTERVAL '30 days';
  ELSIF NEW.expiry_type = 'unlimited' THEN
    NEW.expires_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_expiry_date_trigger
BEFORE INSERT OR UPDATE ON shared_files
FOR EACH ROW
EXECUTE FUNCTION set_expiry_date();

-- 更新日時の自動更新
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shared_files_updated_at
BEFORE UPDATE ON shared_files
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security) ポリシー
ALTER TABLE shared_files ENABLE ROW LEVEL SECURITY;

-- 誰でも共有ファイルを作成できる
CREATE POLICY "Anyone can create shared files" ON shared_files
  FOR INSERT WITH CHECK (true);

-- 誰でも共有ファイルを読み取れる（期限切れでない限り）
CREATE POLICY "Anyone can read non-expired shared files" ON shared_files
  FOR SELECT USING (
    expires_at IS NULL OR expires_at > NOW()
  );

-- ビューカウントの更新は誰でもできる
CREATE POLICY "Anyone can update view count" ON shared_files
  FOR UPDATE USING (true)
  WITH CHECK (true);