// アナリティクスダッシュボードコンポーネント

import React, { useState, useEffect } from 'react';
import { analyticsTracker } from '../services/analytics/tracker';
import { useRealtimeSessionStats, useRealtimeInteractions } from '../hooks/useSupabaseRealtime';

// 統計カード
const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: string;
  color: string;
  trend?: number;
}> = ({ title, value, icon, color, trend }) => (
  <div style={{
    backgroundColor: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'all 0.3s',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{title}</p>
        <h3 style={{ margin: '8px 0 0 0', fontSize: '28px', fontWeight: 'bold' }}>{value}</h3>
        {trend !== undefined && (
          <p style={{ 
            margin: '8px 0 0 0', 
            fontSize: '13px', 
            color: trend >= 0 ? '#4caf50' : '#f44336',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>{trend >= 0 ? '↑' : '↓'}</span>
            <span>{Math.abs(trend)}%</span>
          </p>
        )}
      </div>
      <div style={{
        width: '48px',
        height: '48px',
        backgroundColor: color + '20',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        {icon}
      </div>
    </div>
  </div>
);

// 時系列グラフ（簡易版）
const TimeSeriesChart: React.FC<{
  data: Array<{ date: string; value: number }>;
  title: string;
  color: string;
}> = ({ data, title, color }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px'
    }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
        {title}
      </h4>
      <div style={{ height: '200px', position: 'relative' }}>
        {/* Y軸ラベル */}
        <div style={{
          position: 'absolute',
          left: '-40px',
          top: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#666'
        }}>
          <span>{maxValue}</span>
          <span>{Math.floor(maxValue / 2)}</span>
          <span>0</span>
        </div>
        
        {/* グラフエリア */}
        <div style={{
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '4px',
          borderBottom: '1px solid #e0e0e0',
          borderLeft: '1px solid #e0e0e0',
          paddingLeft: '8px'
        }}>
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                backgroundColor: color,
                height: `${(item.value / maxValue) * 100}%`,
                minHeight: '2px',
                borderRadius: '4px 4px 0 0',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              title={`${item.date}: ${item.value}`}
            >
              {index === data.length - 1 && (
                <span style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-10px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color
                }}>
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* X軸ラベル */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
          fontSize: '11px',
          color: '#666'
        }}>
          <span>{data[0]?.date}</span>
          <span>{data[data.length - 1]?.date}</span>
        </div>
      </div>
    </div>
  );
};

// アクティビティリスト
const ActivityList: React.FC<{
  activities: Array<{
    id: string;
    type: string;
    timestamp: string;
    metadata?: any;
  }>;
}> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      voice_start: '🎤',
      voice_stop: '⏹️',
      transcription_view: '📝',
      markdown_generated: '📄',
      text_highlighted: '🖍️',
      comment_added: '💬',
      feedback_given: '👍',
      share_action: '🔗',
      download_action: '⬇️'
    };
    return icons[type] || '📌';
  };

  const getActivityLabel = (type: string) => {
    const labels: Record<string, string> = {
      voice_start: '録音開始',
      voice_stop: '録音停止',
      transcription_view: '転写完了',
      markdown_generated: 'Markdown生成',
      text_highlighted: 'テキストハイライト',
      comment_added: 'コメント追加',
      feedback_given: 'フィードバック',
      share_action: '共有',
      download_action: 'ダウンロード'
    };
    return labels[type] || type;
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '20px'
    }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
        最近のアクティビティ
      </h4>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {activities.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
            アクティビティはまだありません
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activities.map((activity) => (
              <div
                key={activity.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#eeeeee';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
              >
                <span style={{ fontSize: '20px' }}>
                  {getActivityIcon(activity.type)}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>
                    {getActivityLabel(activity.type)}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>
                    {new Date(activity.timestamp).toLocaleString('ja-JP')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// プロパティ
interface AnalyticsDashboardProps {
  userId: string;
  sessionId?: string;
  dateRange?: { start: Date; end: Date };
  className?: string;
}

// メインコンポーネント
export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  userId,
  sessionId,
  dateRange,
  className = ''
}) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  
  // リアルタイム統計
  const realtimeStats = useRealtimeSessionStats(sessionId || '');
  const { interactions } = useRealtimeInteractions(userId, 20);

  // 統計データ取得
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await analyticsTracker.getUsageStats(userId, dateRange);
        setStats(data);
        
        // 時系列データの整形
        if (data?.dailyStats) {
          const tsData = data.dailyStats.map((day: any) => ({
            date: new Date(day.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' }),
            sessions: day.voice_sessions_count,
            words: day.total_transcribed_words,
            conversions: day.markdown_conversions_count
          }));
          setTimeSeriesData(tsData);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId, dateRange]);

  if (loading) {
    return (
      <div className={`analytics-dashboard ${className}`} style={{ textAlign: 'center', padding: '40px' }}>
        <div className="loading-spinner" style={{ fontSize: '24px' }}>⏳</div>
        <p style={{ marginTop: '16px', color: '#666' }}>分析データを読み込んでいます...</p>
      </div>
    );
  }

  return (
    <div className={`analytics-dashboard ${className}`}>
      {/* ヘッダー */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          アナリティクスダッシュボード
        </h2>
        <p style={{ margin: '8px 0 0 0', color: '#666' }}>
          音声入力の使用状況とパフォーマンス
        </p>
      </div>

      {/* 統計カード */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <StatCard
          title="総セッション数"
          value={stats?.totals?.totalSessions || 0}
          icon="🎙️"
          color="#2196f3"
          trend={12}
        />
        <StatCard
          title="総録音時間"
          value={`${Math.round((stats?.totals?.totalRecordingTime || 0) / 60)}分`}
          icon="⏱️"
          color="#4caf50"
          trend={8}
        />
        <StatCard
          title="総転写単語数"
          value={(stats?.totals?.totalWords || 0).toLocaleString()}
          icon="📝"
          color="#ff9800"
          trend={-3}
        />
        <StatCard
          title="Markdown変換数"
          value={stats?.totals?.totalConversions || 0}
          icon="📄"
          color="#9c27b0"
          trend={15}
        />
      </div>

      {/* グラフとアクティビティ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        marginBottom: '24px'
      }}>
        {/* セッション数の推移 */}
        <TimeSeriesChart
          data={timeSeriesData.map(d => ({ date: d.date, value: d.sessions }))}
          title="日別セッション数"
          color="#2196f3"
        />

        {/* 転写単語数の推移 */}
        <TimeSeriesChart
          data={timeSeriesData.map(d => ({ date: d.date, value: Math.round(d.words / 100) }))}
          title="日別転写単語数（百単位）"
          color="#ff9800"
        />
      </div>

      {/* アクティビティリスト */}
      <div style={{ marginBottom: '24px' }}>
        <ActivityList activities={interactions} />
      </div>

      {/* 平均値統計 */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold' }}>
          平均パフォーマンス
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              1日あたりのセッション
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold' }}>
              {stats?.averages?.avgSessionsPerDay?.toFixed(1) || '0'}
            </p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              セッションあたりの録音時間
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold' }}>
              {Math.round((stats?.averages?.avgRecordingTimePerSession || 0) / 60)}分
            </p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              セッションあたりの単語数
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold' }}>
              {Math.round(stats?.averages?.avgWordsPerSession || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* リアルタイム統計（セッションIDがある場合） */}
      {sessionId && (
        <div style={{
          marginTop: '24px',
          backgroundColor: '#e3f2fd',
          border: '1px solid #2196f3',
          borderRadius: '12px',
          padding: '20px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold', color: '#1976d2' }}>
            リアルタイムセッション統計
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px'
          }}>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                アクティブセッション
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#1976d2' }}>
                {realtimeStats.activeSessions}
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                録音数
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#1976d2' }}>
                {realtimeStats.totalRecordings}
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                転写数
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#1976d2' }}>
                {realtimeStats.totalTranscriptions}
              </p>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
                変換数
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#1976d2' }}>
                {realtimeStats.totalConversions}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};