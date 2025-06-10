import React, { useState } from 'react';
import { VideoDetails } from '../types';
import SubtitleDisplay from './SubtitleDisplay';
import CommentDisplay from './CommentDisplay';
import { DownloadIcon, ChevronLeftIcon, PlayIcon, EyeIcon, CalendarDaysIcon, ClockIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from './icons';
import { timeAgo } from '../services/youtubeService';

interface VideoDetailViewProps {
  video: VideoDetails;
  onClose: () => void;
  onDownload: (video: VideoDetails) => void;
}

type ActiveTab = 'subtitles' | 'comments';

const VideoDetailView: React.FC<VideoDetailViewProps> = ({ video, onClose, onDownload }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('subtitles');

  return (
    <div className="bg-gray-850 p-4 sm:p-6 rounded-lg shadow-xl relative mt-6 border border-gray-700">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-100 p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors z-10"
        aria-label="Close video details"
      >
        <ChevronLeftIcon className="w-6 h-6" /> <span className="sr-only sm:not-sr-only sm:ml-1">戻る (Back)</span>
      </button>

      <div className="mb-6 pr-12 sm:pr-16"> {/* Add padding for close button */}
        <h2 className="text-2xl font-bold text-blue-400 mb-2">{video.title}</h2>
        <div className="flex items-center text-sm text-gray-400 mb-1">
          {/* Assuming video.channel might have thumbnailUrl if fetched, otherwise just title */}
          {video.channel?.thumbnailUrl && <img src={video.channel.thumbnailUrl} alt={`${video.channelTitle} thumbnail`} className="w-6 h-6 rounded-full mr-2"/>}
          <span>{video.channelTitle}</span>
        </div>
        <div className="text-xs text-gray-500 grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-1 mb-3">
            <span className="flex items-center"><EyeIcon className="w-4 h-4 mr-1.5"/> {video.viewCount}</span>
            <span className="flex items-center"><CalendarDaysIcon className="w-4 h-4 mr-1.5"/> {timeAgo(video.publishDate)}</span>
            <span className="flex items-center"><ClockIcon className="w-4 h-4 mr-1.5"/> {video.duration}</span>
            {video.likeCount && <span className="flex items-center">👍 {video.likeCount}</span>}
        </div>
        <p className="text-sm text-gray-300 leading-relaxed mb-3 whitespace-pre-wrap">{video.description}</p>
        <a 
            href={video.videoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
        >
            <PlayIcon className="w-5 h-5 mr-2" /> YouTubeで視聴 (Watch on YouTube)
        </a>
      </div>
      
      <div className="aspect-video bg-black rounded-md mb-6">
         <iframe
            className="w-full h-full rounded-md"
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
      </div>


      <div className="flex border-b border-gray-700 video-detail-tabs mb-4">
        <button
          onClick={() => setActiveTab('subtitles')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'subtitles' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}
          aria-selected={activeTab === 'subtitles'}
          role="tab"
        >
          <DocumentTextIcon className="w-5 h-5 inline mr-2"/> 字幕 (Subtitles)
        </button>
        <button
          onClick={() => setActiveTab('comments')}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'comments' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}
          aria-selected={activeTab === 'comments'}
          role="tab"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5 inline mr-2" /> コメント (Comments)
        </button>
      </div>

      <div role="tabpanel" hidden={activeTab !== 'subtitles'}>
        <SubtitleDisplay subtitles={video.subtitles} />
      </div>
      <div role="tabpanel" hidden={activeTab !== 'comments'}>
        <CommentDisplay comments={video.comments} />
      </div>

      <div className="mt-8 text-right">
        <button
          onClick={() => onDownload(video)}
          className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors flex items-center float-right"
        >
          <DownloadIcon className="w-5 h-5 mr-2" />
          情報をダウンロード (Download Info)
        </button>
      </div>
    </div>
  );
};

export default VideoDetailView;