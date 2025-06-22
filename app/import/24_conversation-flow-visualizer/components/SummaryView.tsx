import React from 'react';

interface ConversationSummary {
  totalDuration: string;
  speakerDistribution: { speaker: string; percentage: number; utterances: number }[];
  mainTopics: { name: string; importance: number; keywords: string[] }[];
  keyInsights: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface SummaryViewProps {
  summary: ConversationSummary;
}

export const SummaryView: React.FC<SummaryViewProps> = React.memo(({ summary }) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#10b981';
      case 'negative': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="summary-view">
      {/* 話者分布 */}
      <div className="summary-section">
        <h3 className="section-title">話者分布</h3>
        <div className="speaker-distribution">
          {summary.speakerDistribution.map((speaker, idx) => (
            <div key={idx} className="speaker-stat">
              <div className="speaker-info">
                <span className="speaker-name">{speaker.speaker}</span>
                <span className="speaker-utterances">{speaker.utterances}発言</span>
              </div>
              <div className="speaker-bar-container">
                <div 
                  className="speaker-bar" 
                  style={{ width: `${speaker.percentage}%` }}
                />
                <span className="speaker-percentage">{speaker.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 主要トピック */}
      <div className="summary-section">
        <h3 className="section-title">主要トピック</h3>
        <div className="topics-grid">
          {summary.mainTopics.map((topic, idx) => (
            <div key={idx} className="topic-card">
              <div className="topic-header">
                <h4 className="topic-name">{topic.name}</h4>
                <div className="topic-importance">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`importance-dot ${i < topic.importance ? 'active' : ''}`} 
                    />
                  ))}
                </div>
              </div>
              <div className="topic-keywords">
                {topic.keywords.map((keyword, kidx) => (
                  <span key={kidx} className="keyword-tag">{keyword}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 重要な洞察 */}
      <div className="summary-section">
        <h3 className="section-title">重要な洞察</h3>
        <ul className="insights-list">
          {summary.keyInsights.map((insight, idx) => (
            <li key={idx} className="insight-item">{insight}</li>
          ))}
        </ul>
      </div>

      {/* 会話の雰囲気 */}
      <div className="summary-section">
        <h3 className="section-title">会話の雰囲気</h3>
        <div className="sentiment-indicator">
          <div 
            className="sentiment-dot" 
            style={{ backgroundColor: getSentimentColor(summary.sentiment) }}
          />
          <span className="sentiment-label">
            {summary.sentiment === 'positive' ? 'ポジティブ' : 
             summary.sentiment === 'negative' ? 'ネガティブ' : 'ニュートラル'}
          </span>
        </div>
      </div>

    </div>
  );
});

SummaryView.displayName = 'SummaryView';