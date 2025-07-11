// アナリティクストラッキングサービス

import { supabase } from '../../lib/supabase';

// トラッキングイベントタイプ
export enum TrackingEvent {
  // 音声セッション
  VOICE_SESSION_START = 'voice_start',
  VOICE_SESSION_STOP = 'voice_stop',
  VOICE_SESSION_PAUSE = 'voice_pause',
  VOICE_SESSION_RESUME = 'voice_resume',
  
  // 転写関連
  TRANSCRIPTION_VIEW = 'transcription_view',
  MARKDOWN_GENERATED = 'markdown_generated',
  
  // インタラクション
  TEXT_HIGHLIGHTED = 'text_highlighted',
  COMMENT_ADDED = 'comment_added',
  FEEDBACK_GIVEN = 'feedback_given',
  
  // 共有・ダウンロード
  SHARE_ACTION = 'share_action',
  DOWNLOAD_ACTION = 'download_action'
}

// セッション情報
interface SessionInfo {
  sessionId?: string;
  userId?: string;
  fileId?: string;
  browserInfo?: {
    userAgent: string;
    language: string;
    platform: string;
    screenResolution: string;
  };
}

// トラッキングメタデータ
interface TrackingMetadata {
  [key: string]: any;
}

// エラートラッキング情報
interface ErrorInfo {
  errorType: string;
  errorCode?: string;
  errorMessage: string;
  stackTrace?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context?: any;
}

// アナリティクストラッカークラス
export class AnalyticsTracker {
  private sessionInfo: SessionInfo = {};
  private sessionStartTime?: Date;
  private recordingStartTime?: Date;
  private pendingEvents: Array<{event: TrackingEvent; metadata: any; timestamp: Date}> = [];
  private flushInterval?: NodeJS.Timeout;

  constructor() {
    // ブラウザ情報を取得
    if (typeof window !== 'undefined') {
      this.sessionInfo.browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`
      };
    }

    // 定期的にペンディングイベントをフラッシュ
    this.startFlushInterval();
  }

  // セッション開始
  async startSession(userId: string, fileId?: string): Promise<string> {
    try {
      this.sessionInfo.userId = userId;
      this.sessionInfo.fileId = fileId;
      this.sessionStartTime = new Date();

      const { data, error } = await supabase
        .from('voice_sessions')
        .insert({
          user_id: userId,
          file_id: fileId,
          status: 'started',
          browser_info: this.sessionInfo.browserInfo
        })
        .select()
        .single();

      if (error) throw error;

      this.sessionInfo.sessionId = data.id;
      
      // セッション開始イベントを記録
      await this.trackEvent(TrackingEvent.VOICE_SESSION_START);
      
      return data.id;
    } catch (error) {
      console.error('Failed to start analytics session:', error);
      throw error;
    }
  }

  // セッション終了
  async endSession(): Promise<void> {
    if (!this.sessionInfo.sessionId || !this.sessionStartTime) return;

    try {
      const duration = Math.floor((new Date().getTime() - this.sessionStartTime.getTime()) / 1000);

      await supabase
        .from('voice_sessions')
        .update({
          session_end: new Date().toISOString(),
          duration_seconds: duration,
          status: 'completed'
        })
        .eq('id', this.sessionInfo.sessionId);

      // セッション終了イベントを記録
      await this.trackEvent(TrackingEvent.VOICE_SESSION_STOP);
      
      // ペンディングイベントをフラッシュ
      await this.flushPendingEvents();
      
      // 日次統計を更新
      await this.updateDailyStats();
      
      // リセット
      this.sessionInfo.sessionId = undefined;
      this.sessionStartTime = undefined;
    } catch (error) {
      console.error('Failed to end analytics session:', error);
    }
  }

  // 録音開始
  async startRecording(): Promise<string | null> {
    if (!this.sessionInfo.sessionId) return null;

    try {
      this.recordingStartTime = new Date();

      const { data, error } = await supabase
        .from('voice_recordings')
        .insert({
          session_id: this.sessionInfo.sessionId,
          transcription_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      return data.id;
    } catch (error) {
      console.error('Failed to start recording analytics:', error);
      return null;
    }
  }

  // 録音終了
  async endRecording(recordingId: string, audioSize?: number): Promise<void> {
    if (!this.recordingStartTime) return;

    try {
      const duration = (new Date().getTime() - this.recordingStartTime.getTime()) / 1000;

      await supabase
        .from('voice_recordings')
        .update({
          recording_end: new Date().toISOString(),
          duration_seconds: duration,
          audio_size_bytes: audioSize,
          transcription_status: 'processing'
        })
        .eq('id', recordingId);

      this.recordingStartTime = undefined;
    } catch (error) {
      console.error('Failed to end recording analytics:', error);
    }
  }

  // 転写完了
  async trackTranscription(
    recordingId: string,
    text: string,
    confidence: number,
    processingTime: number,
    model: string
  ): Promise<void> {
    try {
      const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;

      await supabase
        .from('transcriptions')
        .insert({
          recording_id: recordingId,
          raw_text: text,
          confidence_score: confidence,
          word_count: wordCount,
          processing_time_ms: processingTime,
          gemini_model: model
        });

      await supabase
        .from('voice_recordings')
        .update({ transcription_status: 'completed' })
        .eq('id', recordingId);

      await this.trackEvent(TrackingEvent.TRANSCRIPTION_VIEW, {
        wordCount,
        confidence,
        model
      });
    } catch (error) {
      console.error('Failed to track transcription:', error);
    }
  }

  // Markdown変換追跡
  async trackMarkdownConversion(
    transcriptionId: string,
    conversionType: string,
    inputText: string,
    outputMarkdown: string,
    metadata: any,
    processingTime: number,
    model: string
  ): Promise<void> {
    try {
      await supabase
        .from('markdown_conversions')
        .insert({
          transcription_id: transcriptionId,
          conversion_type: conversionType,
          input_text: inputText,
          output_markdown: outputMarkdown,
          metadata,
          processing_time_ms: processingTime,
          gemini_model: model
        });

      await this.trackEvent(TrackingEvent.MARKDOWN_GENERATED, {
        conversionType,
        processingTime,
        model
      });
    } catch (error) {
      console.error('Failed to track markdown conversion:', error);
    }
  }

  // イベントトラッキング
  async trackEvent(event: TrackingEvent, metadata: TrackingMetadata = {}): Promise<void> {
    const eventData = {
      event,
      metadata,
      timestamp: new Date()
    };

    // バッチ処理のためペンディングに追加
    this.pendingEvents.push(eventData);

    // 重要なイベントは即座に送信
    if (this.isImportantEvent(event)) {
      await this.flushPendingEvents();
    }
  }

  // テキストハイライト追跡
  async trackHighlight(
    fileId: string,
    startPos: number,
    endPos: number,
    text: string,
    type: string,
    color: string,
    notes?: string
  ): Promise<void> {
    try {
      await supabase
        .from('text_highlights')
        .insert({
          user_id: this.sessionInfo.userId,
          file_id: fileId,
          start_position: startPos,
          end_position: endPos,
          highlighted_text: text,
          highlight_type: type,
          color_code: color,
          notes
        });

      await this.trackEvent(TrackingEvent.TEXT_HIGHLIGHTED, {
        highlightType: type,
        textLength: text.length
      });
    } catch (error) {
      console.error('Failed to track highlight:', error);
    }
  }

  // 音声コメント追跡
  async trackVoiceComment(
    fileId: string,
    position: number,
    audioData: ArrayBuffer,
    transcribedText: string,
    duration: number,
    type: string
  ): Promise<void> {
    try {
      await supabase
        .from('voice_comments')
        .insert({
          user_id: this.sessionInfo.userId,
          file_id: fileId,
          position_in_text: position,
          audio_data: new Uint8Array(audioData),
          transcribed_text: transcribedText,
          duration_seconds: duration,
          comment_type: type
        });

      await this.trackEvent(TrackingEvent.COMMENT_ADDED, {
        commentType: type,
        duration
      });
    } catch (error) {
      console.error('Failed to track voice comment:', error);
    }
  }

  // フィードバック追跡
  async trackFeedback(
    type: string,
    rating: number,
    content: string,
    contextData?: any
  ): Promise<void> {
    try {
      await supabase
        .from('user_feedback')
        .insert({
          user_id: this.sessionInfo.userId,
          feedback_type: type,
          rating,
          content,
          context_data: contextData
        });

      await this.trackEvent(TrackingEvent.FEEDBACK_GIVEN, {
        feedbackType: type,
        rating
      });
    } catch (error) {
      console.error('Failed to track feedback:', error);
    }
  }

  // エラー追跡
  async trackError(errorInfo: ErrorInfo): Promise<void> {
    try {
      await supabase
        .from('error_logs')
        .insert({
          user_id: this.sessionInfo.userId,
          session_id: this.sessionInfo.sessionId,
          error_type: errorInfo.errorType,
          error_code: errorInfo.errorCode,
          error_message: errorInfo.errorMessage,
          stack_trace: errorInfo.stackTrace,
          user_agent: this.sessionInfo.browserInfo?.userAgent,
          url: window.location.href,
          additional_context: errorInfo.context,
          severity: errorInfo.severity
        });
    } catch (error) {
      console.error('Failed to track error:', error);
    }
  }

  // 使用統計の取得
  async getUsageStats(userId: string, dateRange?: { start: Date; end: Date }): Promise<any> {
    try {
      let query = supabase
        .from('usage_statistics')
        .select('*')
        .eq('user_id', userId);

      if (dateRange) {
        query = query
          .gte('date', dateRange.start.toISOString().split('T')[0])
          .lte('date', dateRange.end.toISOString().split('T')[0]);
      } else {
        // デフォルトは過去30日
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        query = query
          .gte('date', startDate.toISOString().split('T')[0])
          .lte('date', endDate.toISOString().split('T')[0]);
      }

      const { data, error } = await query;
      
      if (error) throw error;

      return this.aggregateStats(data || []);
    } catch (error) {
      console.error('Failed to get usage stats:', error);
      return null;
    }
  }

  // リアルタイムアナリティクス取得
  async getRealtimeAnalytics(sessionId?: string): Promise<any> {
    try {
      const baseQuery = {
        user_id: this.sessionInfo.userId,
        ...(sessionId && { session_id: sessionId })
      };

      // 最近のインタラクションを取得
      const { data: interactions } = await supabase
        .from('user_interactions')
        .select('*')
        .match(baseQuery)
        .order('timestamp', { ascending: false })
        .limit(100);

      // アクティブセッション数
      const { count: activeSessions } = await supabase
        .from('voice_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      return {
        recentInteractions: interactions || [],
        activeSessions: activeSessions || 0,
        currentSessionId: this.sessionInfo.sessionId
      };
    } catch (error) {
      console.error('Failed to get realtime analytics:', error);
      return null;
    }
  }

  // プライベートメソッド

  private startFlushInterval(): void {
    // 30秒ごとにペンディングイベントをフラッシュ
    this.flushInterval = setInterval(() => {
      this.flushPendingEvents();
    }, 30000);
  }

  private async flushPendingEvents(): Promise<void> {
    if (this.pendingEvents.length === 0) return;

    const events = [...this.pendingEvents];
    this.pendingEvents = [];

    try {
      const insertData = events.map(event => ({
        user_id: this.sessionInfo.userId,
        session_id: this.sessionInfo.sessionId,
        interaction_type: event.event,
        metadata: event.metadata,
        timestamp: event.timestamp.toISOString()
      }));

      await supabase
        .from('user_interactions')
        .insert(insertData);
    } catch (error) {
      console.error('Failed to flush pending events:', error);
      // 失敗したイベントを戻す
      this.pendingEvents = [...events, ...this.pendingEvents];
    }
  }

  private isImportantEvent(event: TrackingEvent): boolean {
    const importantEvents = [
      TrackingEvent.VOICE_SESSION_START,
      TrackingEvent.VOICE_SESSION_STOP,
      TrackingEvent.MARKDOWN_GENERATED,
      TrackingEvent.SHARE_ACTION
    ];
    
    return importantEvents.includes(event);
  }

  private async updateDailyStats(): Promise<void> {
    if (!this.sessionInfo.userId) return;

    try {
      // Supabaseの関数を呼び出して日次統計を更新
      await supabase.rpc('update_daily_usage_stats', {
        user_uuid: this.sessionInfo.userId,
        stats_date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Failed to update daily stats:', error);
    }
  }

  private aggregateStats(dailyStats: any[]): any {
    const totals = dailyStats.reduce((acc, day) => ({
      totalSessions: acc.totalSessions + day.voice_sessions_count,
      totalRecordingTime: acc.totalRecordingTime + day.total_recording_time_seconds,
      totalWords: acc.totalWords + day.total_transcribed_words,
      totalConversions: acc.totalConversions + day.markdown_conversions_count,
      totalHighlights: acc.totalHighlights + day.highlights_created,
      totalComments: acc.totalComments + day.comments_added,
      totalShares: acc.totalShares + day.shares_count
    }), {
      totalSessions: 0,
      totalRecordingTime: 0,
      totalWords: 0,
      totalConversions: 0,
      totalHighlights: 0,
      totalComments: 0,
      totalShares: 0
    });

    const averages = {
      avgSessionsPerDay: totals.totalSessions / Math.max(dailyStats.length, 1),
      avgRecordingTimePerSession: totals.totalRecordingTime / Math.max(totals.totalSessions, 1),
      avgWordsPerSession: totals.totalWords / Math.max(totals.totalSessions, 1)
    };

    return {
      totals,
      averages,
      dailyStats,
      period: {
        start: dailyStats[0]?.date,
        end: dailyStats[dailyStats.length - 1]?.date,
        days: dailyStats.length
      }
    };
  }

  // クリーンアップ
  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    
    // 残りのイベントをフラッシュ
    this.flushPendingEvents();
  }
}

// シングルトンインスタンス
export const analyticsTracker = new AnalyticsTracker();

// 便利な関数
export function trackVoiceSessionStart(userId: string, fileId?: string): Promise<string> {
  return analyticsTracker.startSession(userId, fileId);
}

export function trackVoiceSessionEnd(): Promise<void> {
  return analyticsTracker.endSession();
}

export function trackEvent(event: TrackingEvent, metadata?: TrackingMetadata): Promise<void> {
  return analyticsTracker.trackEvent(event, metadata);
}

export function trackError(error: Error, severity: ErrorInfo['severity'] = 'medium'): Promise<void> {
  return analyticsTracker.trackError({
    errorType: error.name,
    errorMessage: error.message,
    stackTrace: error.stack,
    severity,
    context: {
      timestamp: new Date().toISOString(),
      url: window.location.href
    }
  });
}

export function getAnalytics(): AnalyticsTracker {
  return analyticsTracker;
}