-- 音声入力機能用アナリティクステーブル作成
-- 作成日: 2024-01-10
-- 説明: 音声入力の使用状況、ユーザーエンゲージメント、フィードバックデータを追跡

-- 1. 音声セッションテーブル
CREATE TABLE IF NOT EXISTS voice_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_id UUID REFERENCES files(id) ON DELETE CASCADE,
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    status TEXT CHECK (status IN ('started', 'active', 'completed', 'error', 'cancelled')) DEFAULT 'started',
    error_message TEXT,
    browser_info JSONB, -- ブラウザ、OS、デバイス情報
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 音声記録テーブル
CREATE TABLE IF NOT EXISTS voice_recordings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES voice_sessions(id) ON DELETE CASCADE,
    recording_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    recording_end TIMESTAMP WITH TIME ZONE,
    duration_seconds REAL,
    audio_size_bytes BIGINT,
    format TEXT DEFAULT 'webm', -- audio format
    sample_rate INTEGER DEFAULT 16000,
    channels INTEGER DEFAULT 1,
    quality_score REAL, -- 音声品質スコア (0-1)
    transcription_status TEXT CHECK (transcription_status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 転写結果テーブル
CREATE TABLE IF NOT EXISTS transcriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    recording_id UUID REFERENCES voice_recordings(id) ON DELETE CASCADE,
    raw_text TEXT, -- 生の転写テキスト
    processed_text TEXT, -- 処理済みテキスト（専門用語辞書適用後）
    confidence_score REAL, -- 全体の信頼度
    language TEXT DEFAULT 'ja',
    word_count INTEGER,
    processing_time_ms INTEGER,
    gemini_model TEXT, -- 使用したGeminiモデル
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Markdown変換テーブル
CREATE TABLE IF NOT EXISTS markdown_conversions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    transcription_id UUID REFERENCES transcriptions(id) ON DELETE CASCADE,
    conversion_type TEXT CHECK (conversion_type IN ('meeting_notes', 'article', 'summary', 'blog_post', 'documentation', 'custom')),
    input_text TEXT,
    output_markdown TEXT,
    metadata JSONB, -- アクションアイテム、キーワードなど
    processing_time_ms INTEGER,
    gemini_model TEXT,
    prompt_version TEXT,
    quality_rating REAL, -- ユーザー評価 (1-5)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ユーザーインタラクションテーブル
CREATE TABLE IF NOT EXISTS user_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES voice_sessions(id) ON DELETE CASCADE,
    interaction_type TEXT CHECK (interaction_type IN (
        'voice_start', 'voice_stop', 'voice_pause', 'voice_resume',
        'transcription_view', 'markdown_generated', 'text_highlighted',
        'comment_added', 'feedback_given', 'share_action', 'download_action'
    )),
    target_id UUID, -- 対象となるレコードのID（柔軟性のため）
    metadata JSONB, -- インタラクション固有データ
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. テキストハイライトテーブル
CREATE TABLE IF NOT EXISTS text_highlights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_id UUID REFERENCES files(id) ON DELETE CASCADE,
    start_position INTEGER NOT NULL,
    end_position INTEGER NOT NULL,
    highlighted_text TEXT NOT NULL,
    context_before TEXT, -- 前後の文脈
    context_after TEXT,
    highlight_type TEXT CHECK (highlight_type IN ('important', 'question', 'action', 'decision', 'custom')) DEFAULT 'important',
    color_code TEXT DEFAULT '#ffff00',
    notes TEXT, -- ユーザーのメモ
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 音声コメントテーブル
CREATE TABLE IF NOT EXISTS voice_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_id UUID REFERENCES files(id) ON DELETE CASCADE,
    position_in_text INTEGER, -- テキスト内の位置
    audio_data BYTEA, -- 音声データ（小さなコメント用）
    transcribed_text TEXT, -- 転写されたコメント
    duration_seconds REAL,
    comment_type TEXT CHECK (comment_type IN ('question', 'suggestion', 'clarification', 'approval', 'concern')) DEFAULT 'suggestion',
    is_resolved BOOLEAN DEFAULT FALSE,
    parent_comment_id UUID REFERENCES voice_comments(id), -- 返信の場合
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. フィードバックテーブル
CREATE TABLE IF NOT EXISTS user_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    feedback_type TEXT CHECK (feedback_type IN (
        'transcription_quality', 'markdown_quality', 'ui_experience', 
        'feature_request', 'bug_report', 'general'
    )),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    context_data JSONB, -- セッション情報、エラー詳細など
    is_anonymous BOOLEAN DEFAULT FALSE,
    status TEXT CHECK (status IN ('new', 'reviewed', 'in_progress', 'resolved', 'closed')) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 使用統計テーブル
CREATE TABLE IF NOT EXISTS usage_statistics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    voice_sessions_count INTEGER DEFAULT 0,
    total_recording_time_seconds INTEGER DEFAULT 0,
    total_transcribed_words INTEGER DEFAULT 0,
    markdown_conversions_count INTEGER DEFAULT 0,
    highlights_created INTEGER DEFAULT 0,
    comments_added INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- 10. エラーログテーブル
CREATE TABLE IF NOT EXISTS error_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id UUID REFERENCES voice_sessions(id) ON DELETE SET NULL,
    error_type TEXT NOT NULL,
    error_code TEXT,
    error_message TEXT,
    stack_trace TEXT,
    user_agent TEXT,
    url TEXT,
    additional_context JSONB,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX IF NOT EXISTS idx_voice_sessions_user_id ON voice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_voice_sessions_created_at ON voice_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_voice_sessions_status ON voice_sessions(status);

CREATE INDEX IF NOT EXISTS idx_voice_recordings_session_id ON voice_recordings(session_id);
CREATE INDEX IF NOT EXISTS idx_voice_recordings_created_at ON voice_recordings(created_at);

CREATE INDEX IF NOT EXISTS idx_transcriptions_recording_id ON transcriptions(recording_id);
CREATE INDEX IF NOT EXISTS idx_transcriptions_created_at ON transcriptions(created_at);

CREATE INDEX IF NOT EXISTS idx_markdown_conversions_transcription_id ON markdown_conversions(transcription_id);
CREATE INDEX IF NOT EXISTS idx_markdown_conversions_type ON markdown_conversions(conversion_type);
CREATE INDEX IF NOT EXISTS idx_markdown_conversions_created_at ON markdown_conversions(created_at);

CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_session_id ON user_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_type ON user_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_user_interactions_timestamp ON user_interactions(timestamp);

CREATE INDEX IF NOT EXISTS idx_text_highlights_user_id ON text_highlights(user_id);
CREATE INDEX IF NOT EXISTS idx_text_highlights_file_id ON text_highlights(file_id);
CREATE INDEX IF NOT EXISTS idx_text_highlights_created_at ON text_highlights(created_at);

CREATE INDEX IF NOT EXISTS idx_voice_comments_user_id ON voice_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_voice_comments_file_id ON voice_comments(file_id);
CREATE INDEX IF NOT EXISTS idx_voice_comments_created_at ON voice_comments(created_at);
CREATE INDEX IF NOT EXISTS idx_voice_comments_parent_id ON voice_comments(parent_comment_id);

CREATE INDEX IF NOT EXISTS idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_type ON user_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_user_feedback_created_at ON user_feedback(created_at);

CREATE INDEX IF NOT EXISTS idx_usage_statistics_user_id ON usage_statistics(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_statistics_date ON usage_statistics(date);

CREATE INDEX IF NOT EXISTS idx_error_logs_user_id ON error_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_error_logs_session_id ON error_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_error_logs_error_type ON error_logs(error_type);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_error_logs_severity ON error_logs(severity);

-- RLS (Row Level Security) ポリシー設定

-- voice_sessions
ALTER TABLE voice_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own voice sessions" ON voice_sessions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own voice sessions" ON voice_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own voice sessions" ON voice_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- voice_recordings
ALTER TABLE voice_recordings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own voice recordings" ON voice_recordings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM voice_sessions 
            WHERE voice_sessions.id = voice_recordings.session_id 
            AND voice_sessions.user_id = auth.uid()
        )
    );
CREATE POLICY "Users can insert own voice recordings" ON voice_recordings
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM voice_sessions 
            WHERE voice_sessions.id = voice_recordings.session_id 
            AND voice_sessions.user_id = auth.uid()
        )
    );

-- transcriptions
ALTER TABLE transcriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transcriptions" ON transcriptions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM voice_recordings vr
            JOIN voice_sessions vs ON vs.id = vr.session_id
            WHERE vr.id = transcriptions.recording_id 
            AND vs.user_id = auth.uid()
        )
    );
CREATE POLICY "Users can insert own transcriptions" ON transcriptions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM voice_recordings vr
            JOIN voice_sessions vs ON vs.id = vr.session_id
            WHERE vr.id = transcriptions.recording_id 
            AND vs.user_id = auth.uid()
        )
    );

-- markdown_conversions
ALTER TABLE markdown_conversions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own markdown conversions" ON markdown_conversions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM transcriptions t
            JOIN voice_recordings vr ON vr.id = t.recording_id
            JOIN voice_sessions vs ON vs.id = vr.session_id
            WHERE t.id = markdown_conversions.transcription_id 
            AND vs.user_id = auth.uid()
        )
    );
CREATE POLICY "Users can insert own markdown conversions" ON markdown_conversions
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM transcriptions t
            JOIN voice_recordings vr ON vr.id = t.recording_id
            JOIN voice_sessions vs ON vs.id = vr.session_id
            WHERE t.id = markdown_conversions.transcription_id 
            AND vs.user_id = auth.uid()
        )
    );

-- user_interactions
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own interactions" ON user_interactions
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own interactions" ON user_interactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- text_highlights
ALTER TABLE text_highlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own highlights" ON text_highlights
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own highlights" ON text_highlights
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own highlights" ON text_highlights
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own highlights" ON text_highlights
    FOR DELETE USING (auth.uid() = user_id);

-- voice_comments
ALTER TABLE voice_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own comments" ON voice_comments
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own comments" ON voice_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON voice_comments
    FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON voice_comments
    FOR DELETE USING (auth.uid() = user_id);

-- user_feedback
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own feedback" ON user_feedback
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own feedback" ON user_feedback
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own feedback" ON user_feedback
    FOR UPDATE USING (auth.uid() = user_id);

-- usage_statistics
ALTER TABLE usage_statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own usage statistics" ON usage_statistics
    FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage statistics" ON usage_statistics
    FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage statistics" ON usage_statistics
    FOR UPDATE USING (auth.uid() = user_id);

-- error_logs (管理者のみアクセス可能)
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert error logs" ON error_logs
    FOR INSERT WITH CHECK (true); -- 誰でもエラーログは挿入可能

-- 更新日時の自動更新用トリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- トリガー設定
CREATE TRIGGER update_voice_sessions_updated_at BEFORE UPDATE ON voice_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_text_highlights_updated_at BEFORE UPDATE ON text_highlights
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_voice_comments_updated_at BEFORE UPDATE ON voice_comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_feedback_updated_at BEFORE UPDATE ON user_feedback
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usage_statistics_updated_at BEFORE UPDATE ON usage_statistics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 使用統計の日次集計用関数
CREATE OR REPLACE FUNCTION update_daily_usage_stats(user_uuid UUID, stats_date DATE DEFAULT CURRENT_DATE)
RETURNS VOID AS $$
BEGIN
    INSERT INTO usage_statistics (
        user_id,
        date,
        voice_sessions_count,
        total_recording_time_seconds,
        total_transcribed_words,
        markdown_conversions_count,
        highlights_created,
        comments_added,
        shares_count
    )
    SELECT 
        user_uuid,
        stats_date,
        COALESCE(session_stats.sessions_count, 0),
        COALESCE(session_stats.total_duration, 0),
        COALESCE(transcription_stats.total_words, 0),
        COALESCE(conversion_stats.conversions_count, 0),
        COALESCE(highlight_stats.highlights_count, 0),
        COALESCE(comment_stats.comments_count, 0),
        COALESCE(interaction_stats.shares_count, 0)
    FROM (
        SELECT 
            COUNT(*) as sessions_count,
            SUM(COALESCE(duration_seconds, 0)) as total_duration
        FROM voice_sessions 
        WHERE user_id = user_uuid 
        AND DATE(created_at) = stats_date
    ) session_stats
    FULL OUTER JOIN (
        SELECT SUM(COALESCE(word_count, 0)) as total_words
        FROM transcriptions t
        JOIN voice_recordings vr ON vr.id = t.recording_id
        JOIN voice_sessions vs ON vs.id = vr.session_id
        WHERE vs.user_id = user_uuid 
        AND DATE(t.created_at) = stats_date
    ) transcription_stats ON true
    FULL OUTER JOIN (
        SELECT COUNT(*) as conversions_count
        FROM markdown_conversions mc
        JOIN transcriptions t ON t.id = mc.transcription_id
        JOIN voice_recordings vr ON vr.id = t.recording_id
        JOIN voice_sessions vs ON vs.id = vr.session_id
        WHERE vs.user_id = user_uuid 
        AND DATE(mc.created_at) = stats_date
    ) conversion_stats ON true
    FULL OUTER JOIN (
        SELECT COUNT(*) as highlights_count
        FROM text_highlights 
        WHERE user_id = user_uuid 
        AND DATE(created_at) = stats_date
    ) highlight_stats ON true
    FULL OUTER JOIN (
        SELECT COUNT(*) as comments_count
        FROM voice_comments 
        WHERE user_id = user_uuid 
        AND DATE(created_at) = stats_date
    ) comment_stats ON true
    FULL OUTER JOIN (
        SELECT COUNT(*) as shares_count
        FROM user_interactions 
        WHERE user_id = user_uuid 
        AND interaction_type = 'share_action'
        AND DATE(timestamp) = stats_date
    ) interaction_stats ON true
    ON CONFLICT (user_id, date) 
    DO UPDATE SET
        voice_sessions_count = EXCLUDED.voice_sessions_count,
        total_recording_time_seconds = EXCLUDED.total_recording_time_seconds,
        total_transcribed_words = EXCLUDED.total_transcribed_words,
        markdown_conversions_count = EXCLUDED.markdown_conversions_count,
        highlights_created = EXCLUDED.highlights_created,
        comments_added = EXCLUDED.comments_added,
        shares_count = EXCLUDED.shares_count,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- コメント追加
COMMENT ON TABLE voice_sessions IS '音声入力セッションの記録';
COMMENT ON TABLE voice_recordings IS '個別の音声録音記録';
COMMENT ON TABLE transcriptions IS '音声転写結果';
COMMENT ON TABLE markdown_conversions IS 'Markdown変換結果';
COMMENT ON TABLE user_interactions IS 'ユーザーインタラクション追跡';
COMMENT ON TABLE text_highlights IS 'テキストハイライト';
COMMENT ON TABLE voice_comments IS '音声コメント';
COMMENT ON TABLE user_feedback IS 'ユーザーフィードバック';
COMMENT ON TABLE usage_statistics IS '使用統計（日次集計）';
COMMENT ON TABLE error_logs IS 'エラーログ';

-- 初期データ挿入（必要に応じて）
-- 管理者用のサンプルクエリなど追加可能