import { Video, VideoDetails, SubtitleTrack, Comment, SearchFilters, SearchResult, CommentReply } from '../types';
import { VIDEOS_PER_PAGE } from '../constants';

// YouTube Data API v3 base URL
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Get API key from localStorage
const getApiKey = (): string | null => {
  return localStorage.getItem('youtube_api_key');
};

// Helper to parse ISO 8601 duration (e.g., PT1M30S) to a formatted string H:MM:SS or MM:SS
const parseISO8601Duration = (duration: string): string => {
  if (!duration) return '0:00';
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  let formatted = '';
  if (hours > 0) {
    formatted += `${hours}:`;
    formatted += `${String(minutes).padStart(2, '0')}:`;
  } else {
    formatted += `${minutes}:`;
  }
  formatted += String(seconds).padStart(2, '0');
  return formatted;
};

const mapSearchItemToVideo = (item: any): Video => {
  // Mapping YouTube API search response to our Video type
  const videoId = typeof item.id === 'object' ? item.id.videoId : item.id;
  return {
    id: videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url || '',
    thumbnails: item.snippet.thumbnails,
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
    publishDate: item.snippet.publishedAt,
    videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
    viewCount: "N/A", // Will be filled in by video details call
    duration: "N/A", // Will be filled in by video details call
  };
};

const mapVideoItemToVideoDetails = (item: any, captions: SubtitleTrack[], commentsData: Comment[]): VideoDetails => {
  // Mapping YouTube API video response to our VideoDetails type
  const snippet = item.snippet;
  const statistics = item.statistics || {};
  const contentDetails = item.contentDetails || {};
  
  return {
    id: item.id,
    title: snippet.title,
    description: snippet.description,
    thumbnailUrl: snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url || '',
    thumbnails: snippet.thumbnails,
    channelId: snippet.channelId,
    channelTitle: snippet.channelTitle,
    publishDate: snippet.publishedAt,
    viewCount: statistics.viewCount ? formatViewCount(parseInt(statistics.viewCount)) : 'N/A',
    likeCount: statistics.likeCount ? formatViewCount(parseInt(statistics.likeCount)) : 'N/A',
    duration: contentDetails.duration ? parseISO8601Duration(contentDetails.duration) : 'N/A',
    videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
    tags: snippet.tags || [],
    categoryId: snippet.categoryId,
    licensedContent: contentDetails.licensedContent,
    liveBroadcastContent: snippet.liveBroadcastContent,
    subtitles: captions,
    comments: commentsData,
  };
};


// searchVideos now calls YouTube API directly
export const searchVideos = async (
  query: string,
  filters: SearchFilters,
  pageToken?: string
): Promise<SearchResult> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('APIキーが設定されていません。設定画面からYouTube Data API v3キーを入力してください。');
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    maxResults: String(VIDEOS_PER_PAGE),
    key: apiKey,
  });

  if (pageToken) {
    params.append('pageToken', pageToken);
  }
  if (filters.sortBy && filters.sortBy !== 'relevance') {
    params.append('order', filters.sortBy);
  }
  if (filters.videoLength && filters.videoLength !== 'any') {
    params.append('videoDuration', filters.videoLength);
  }
  if (filters.dateRange && filters.dateRange !== 'any') {
    const now = new Date();
    let publishedAfter = '';
    
    switch (filters.dateRange) {
      case 'hour':
        publishedAfter = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
        break;
      case 'today':
        publishedAfter = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        break;
      case 'week':
        publishedAfter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case 'month':
        publishedAfter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case 'year':
        publishedAfter = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
        break;
    }
    
    if (publishedAfter) {
      params.append('publishedAfter', publishedAfter);
    }
  }

  try {
    const response = await fetch(`${YOUTUBE_API_BASE_URL}/search?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      console.error('YouTube API Search Error:', data);
      const errorMessage = data.error?.message || `動画の検索に失敗しました。APIキーを確認してください。ステータス: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    // Get additional video details for view count and duration
    const videoIds = data.items
      .filter((item: any) => item.id.videoId)
      .map((item: any) => item.id.videoId)
      .join(',');
    
    let videoDetailsMap: Record<string, any> = {};
    
    if (videoIds) {
      try {
        const detailsResponse = await fetch(
          `${YOUTUBE_API_BASE_URL}/videos?` + 
          new URLSearchParams({
            part: 'statistics,contentDetails',
            id: videoIds,
            key: apiKey,
          }).toString()
        );
        
        if (detailsResponse.ok) {
          const detailsData = await detailsResponse.json();
          videoDetailsMap = detailsData.items.reduce((acc: any, item: any) => {
            acc[item.id] = item;
            return acc;
          }, {});
        }
      } catch (error) {
        console.warn('Failed to fetch video details:', error);
      }
    }
    
    const videos = data.items.map((item: any) => {
      const video = mapSearchItemToVideo(item);
      const details = videoDetailsMap[video.id];
      
      if (details) {
        video.viewCount = details.statistics?.viewCount ? formatViewCount(parseInt(details.statistics.viewCount)) : 'N/A';
        video.duration = details.contentDetails?.duration ? parseISO8601Duration(details.contentDetails.duration) : 'N/A';
      }
      
      return video;
    });
    
    return {
      videos,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
      totalResults: data.pageInfo?.totalResults || 0,
      resultsPerPage: data.pageInfo?.resultsPerPage || VIDEOS_PER_PAGE,
    };
  } catch (error) {
    console.error('Error in searchVideos:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('動画検索中に不明なエラーが発生しました。');
  }
};

// getVideoDetails now calls YouTube API directly
export const getVideoDetails = async (videoId: string): Promise<VideoDetails | null> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('APIキーが設定されていません。設定画面からYouTube Data API v3キーを入力してください。');
  }

  try {
    // Fetch video details
    const videoResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?` + 
      new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: apiKey,
      }).toString()
    );

    const videoData = await videoResponse.json();

    if (!videoResponse.ok) {
      console.error('YouTube API Video Details Error:', videoData);
      throw new Error(videoData.error?.message || `動画詳細の取得に失敗しました (ID: ${videoId}). APIキーを確認してください。`);
    }

    if (!videoData.items || videoData.items.length === 0) {
      throw new Error(`動画が見つかりませんでした (ID: ${videoId})`);
    }

    const videoItem = videoData.items[0];

    // Fetch captions/subtitles
    let captions: SubtitleTrack[] = [];
    try {
      const captionsResponse = await fetch(
        `${YOUTUBE_API_BASE_URL}/captions?` + 
        new URLSearchParams({
          part: 'snippet',
          videoId: videoId,
          key: apiKey,
        }).toString()
      );

      if (captionsResponse.ok) {
        const captionsData = await captionsResponse.json();
        captions = captionsData.items.map((item: any) => ({
          id: item.id,
          langCode: item.snippet.language,
          langName: item.snippet.name,
          isAutoGenerated: item.snippet.trackKind === 'asr',
          kind: item.snippet.trackKind,
        }));
      }
    } catch (error) {
      console.warn('Failed to fetch captions:', error);
    }

    // Fetch comments
    let comments: Comment[] = [];
    try {
      const commentsResponse = await fetch(
        `${YOUTUBE_API_BASE_URL}/commentThreads?` + 
        new URLSearchParams({
          part: 'snippet,replies',
          videoId: videoId,
          maxResults: '20',
          order: 'relevance',
          key: apiKey,
        }).toString()
      );

      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        comments = commentsData.items.map((thread: any) => {
          const topComment = thread.snippet.topLevelComment.snippet;
          const replies: CommentReply[] = thread.replies?.comments?.slice(0, 3).map((reply: any) => ({
            id: reply.id,
            text: reply.snippet.textDisplay,
            authorName: reply.snippet.authorDisplayName,
            publishedAt: reply.snippet.publishedAt,
            likeCount: reply.snippet.likeCount,
          })) || [];

          return {
            id: thread.snippet.topLevelComment.id,
            text: topComment.textDisplay,
            authorName: topComment.authorDisplayName,
            publishedAt: topComment.publishedAt,
            likeCount: topComment.likeCount,
            replyCount: thread.snippet.totalReplyCount,
            replies,
          };
        });
      }
    } catch (error) {
      console.warn('Failed to fetch comments:', error);
    }

    return mapVideoItemToVideoDetails(videoItem, captions, comments);

  } catch (err) {
    console.error('Error in getVideoDetails:', err);
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('動画詳細の取得中に不明なエラーが発生しました。');
  }
};


// Utility functions (remain unchanged)
export const formatViewCount = (count: number): string => {
  if (isNaN(count)) return "0";
  if (count < 1000) return String(count);
  if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
  if (count < 1000000000) return `${(count / 1000000).toFixed(1)}M`;
  return `${(count / 1000000000).toFixed(1)}B`;
};

export const timeAgo = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  
  if (isNaN(seconds)) return '';

  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(days / 365);

  if (seconds < 10) return `たった今 (just now)`;
  if (seconds < 60) return `${seconds} 秒前 (seconds ago)`;
  if (minutes < 60) return `${minutes} 分前 (minutes ago)`;
  if (hours < 24) return `${hours} 時間前 (hours ago)`;
  if (days < 7) return `${days} 日前 (days ago)`;
  if (weeks < 5) return `${weeks} 週間前 (weeks ago)`;
  if (months < 12) return `${months} ヶ月前 (months ago)`;
  return `${years} 年前 (years ago)`;
};

export const formatDuration = (totalSeconds: number): string => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  
  const parts: string[] = [];
  if (h > 0) {
    parts.push(String(h));
    parts.push(String(m).padStart(2, '0'));
  } else {
    parts.push(String(m));
  }
  parts.push(String(s).padStart(2, '0'));
  
  return parts.join(':');
};