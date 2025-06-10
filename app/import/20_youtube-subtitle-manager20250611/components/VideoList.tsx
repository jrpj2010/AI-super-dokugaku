import React from 'react';
import { Video } from '../types';
import VideoItem from './VideoItem';
import { InformationCircleIcon } from './icons';

interface VideoListProps {
  videos: Video[];
  onSelectVideo: (video: Video) => void;
  isLoading: boolean;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onSelectVideo, isLoading }) => {
  if (isLoading) {
    // Loading spinner is handled by App.tsx main loading state
    return null;
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-800 text-gray-400 rounded-lg p-6 text-center">
        <InformationCircleIcon className="w-12 h-12 mb-4 text-blue-500"/>
        <p className="text-lg">検索結果はありません。(No results found.)</p>
        <p className="text-sm">キーワードやフィルターを変更して再度お試しください。(Try different keywords or filters.)</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map(video => (
        <VideoItem key={video.id} video={video} onSelectVideo={onSelectVideo} />
      ))}
    </div>
  );
};

export default VideoList;
