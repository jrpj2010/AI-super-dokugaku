import React from 'react';
import { Comment, CommentReply } from '../types';
import { ChatBubbleLeftRightIcon } from './icons'; // Using existing icon
import { timeAgo } from '../services/youtubeService';


const ReplyItem: React.FC<{ reply: CommentReply }> = ({ reply }) => (
  <div className="ml-8 mt-2 p-3 bg-gray-750 rounded-md">
    <div className="flex items-start space-x-2">
      <img src={reply.authorThumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.authorName)}&background=random&size=32`} alt={`${reply.authorName} thumbnail`} className="w-8 h-8 rounded-full" />
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-300">{reply.authorName}</span>
          <span className="text-xs text-gray-500">{timeAgo(reply.publishedAt)}</span>
        </div>
        <p className="text-sm text-gray-200 mt-1">{reply.text}</p>
        <div className="text-xs text-gray-400 mt-1">
          いいね: {reply.likeCount} (Likes: {reply.likeCount})
        </div>
      </div>
    </div>
  </div>
);


const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [showReplies, setShowReplies] = React.useState(false);
  return (
  <div className="comment-item p-3 bg-gray-800 rounded-lg">
    <div className="flex items-start space-x-3">
      <img src={comment.authorThumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.authorName)}&background=random&size=40`} alt={`${comment.authorName} thumbnail`} className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-md font-semibold text-gray-200">{comment.authorName}</span>
          <span className="text-xs text-gray-500">{timeAgo(comment.publishedAt)}</span>
        </div>
        <p className="text-sm text-gray-100 mt-1">{comment.text}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-400 mt-2">
          <span>いいね: {comment.likeCount} (Likes: {comment.likeCount})</span>
          {comment.replyCount > 0 && (
            <button onClick={() => setShowReplies(!showReplies)} className="hover:text-blue-400">
              {showReplies ? '返信を隠す' : `${comment.replyCount} 件の返信を表示`} ( {showReplies ? 'Hide replies' : `Show ${comment.replyCount} replies`})
            </button>
          )}
        </div>
      </div>
    </div>
    {showReplies && comment.replies && comment.replies.length > 0 && (
      <div className="mt-2 space-y-2">
        {comment.replies.map(reply => <ReplyItem key={reply.id} reply={reply} />)}
      </div>
    )}
  </div>
)};

interface CommentDisplayProps {
  comments: Comment[];
}

const CommentDisplay: React.FC<CommentDisplayProps> = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <ChatBubbleLeftRightIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
        利用可能なコメントはありません。(No comments available.)
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4 max-h-[500px] overflow-y-auto p-1">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentDisplay;
