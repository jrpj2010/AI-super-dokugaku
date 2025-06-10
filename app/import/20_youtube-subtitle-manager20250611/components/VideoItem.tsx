import React from 'react';
import { Video } from '../types';
import { PlayIcon, ClockIcon, EyeIcon, CalendarDaysIcon } from './icons';
import { timeAgo } from '../services/youtubeService';

interface VideoItemProps {
  video: Video;
  onSelectVideo: (video: Video) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, onSelectVideo }) => {
  return (
    <article
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col sm:flex-row"
      onClick={() => onSelectVideo(video)}
      onKeyPress={(e) => e.key === 'Enter' && onSelectVideo(video)}
      tabIndex={0}
      aria-label={`Select video: ${video.title}`}
    >
      <div className="sm:w-1/3 md:w-48 flex-shrink-0">
        <img 
          src={video.thumbnailUrl || `https://via.placeholder.com/480x360.png?text=No+Thumbnail`} 
          alt={`Thumbnail for ${video.title}`} 
          className="w-full h-48 sm:h-full object-cover" 
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-blue-400 hover:text-blue-300 mb-1 leading-tight">{video.title}</h3>
          <p className="text-sm text-gray-400 mb-2 flex items-center">
            {/* Channel thumbnail not fetched in search results list to save API calls */}
            {video.channelTitle}
          </p>
          <p className="text-xs text-gray-500 mb-2 line-clamp-2" title={video.description}>{video.description}</p>
        </div>
        <div className="mt-2 text-xs text-gray-400 grid grid-cols-2 gap-x-2 gap-y-1">
          <span className="flex items-center"><EyeIcon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" /> {video.viewCount}</span>
          <span className="flex items-center"><CalendarDaysIcon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" /> {timeAgo(video.publishDate)}</span>
          <span className="flex items-center"><ClockIcon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" /> {video.duration}</span>
        </div>
      </div>
    </article>
  );
};

export default VideoItem;