import React from 'react';

interface ConversationMetadataProps {
  title: string;
  participants: string[];
  duration: string;
  purpose: string;
  timestamp: string;
}

export const ConversationMetadata: React.FC<ConversationMetadataProps> = React.memo(({
  title,
  participants,
  duration,
  purpose,
  timestamp
}) => {
  return (
    <div className="conversation-metadata">
      <h1 className="metadata-title">{title}</h1>
      <div className="metadata-grid">
        <div className="metadata-item">
          <span className="metadata-label">参加者</span>
          <span className="metadata-value">{participants.join(', ')}</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">時間</span>
          <span className="metadata-value">{duration}</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">目的</span>
          <span className="metadata-value">{purpose}</span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">日時</span>
          <span className="metadata-value">{timestamp}</span>
        </div>
      </div>
    </div>
  );
});

ConversationMetadata.displayName = 'ConversationMetadata';