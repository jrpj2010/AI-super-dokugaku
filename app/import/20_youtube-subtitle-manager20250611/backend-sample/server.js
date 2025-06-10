const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3001;

// Environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  console.error('YOUTUBE_API_KEY environment variable is required');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// YouTube Data API v3 base URL
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Search videos endpoint
app.get('/api/youtube/search', async (req, res) => {
  try {
    const { q, maxResults = 25, pageToken, order, videoDuration, dateRange } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const params = new URLSearchParams({
      part: 'snippet',
      q,
      type: 'video',
      maxResults,
      key: YOUTUBE_API_KEY,
    });

    if (pageToken) params.append('pageToken', pageToken);
    if (order && order !== 'relevance') params.append('order', order);
    if (videoDuration && videoDuration !== 'any') params.append('videoDuration', videoDuration);
    
    if (dateRange && dateRange !== 'any') {
      const now = new Date();
      let publishedAfter = '';
      
      switch (dateRange) {
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

    const response = await fetch(`${YOUTUBE_API_BASE_URL}/search?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      console.error('YouTube API Search Error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'Search failed' });
    }

    // Get additional video details for view count and duration
    const videoIds = data.items
      .filter(item => item.id.videoId)
      .map(item => item.id.videoId)
      .join(',');

    let videoDetailsMap = {};

    if (videoIds) {
      try {
        const detailsResponse = await fetch(
          `${YOUTUBE_API_BASE_URL}/videos?` + 
          new URLSearchParams({
            part: 'statistics,contentDetails',
            id: videoIds,
            key: YOUTUBE_API_KEY,
          }).toString()
        );
        
        if (detailsResponse.ok) {
          const detailsData = await detailsResponse.json();
          videoDetailsMap = detailsData.items.reduce((acc, item) => {
            acc[item.id] = item;
            return acc;
          }, {});
        }
      } catch (error) {
        console.warn('Failed to fetch video details:', error);
      }
    }

    const videos = data.items.map(item => {
      const videoId = item.id.videoId;
      const details = videoDetailsMap[videoId];
      
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
        viewCount: details?.statistics?.viewCount || 'N/A',
        duration: details?.contentDetails?.duration || 'N/A',
      };
    });

    res.json({
      videos,
      nextPageToken: data.nextPageToken,
      prevPageToken: data.prevPageToken,
      totalResults: data.pageInfo?.totalResults || 0,
      resultsPerPage: data.pageInfo?.resultsPerPage || parseInt(maxResults),
    });

  } catch (error) {
    console.error('Error in search endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get video details endpoint
app.get('/api/youtube/videos/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;

    // Fetch video details
    const videoResponse = await fetch(
      `${YOUTUBE_API_BASE_URL}/videos?` + 
      new URLSearchParams({
        part: 'snippet,statistics,contentDetails',
        id: videoId,
        key: YOUTUBE_API_KEY,
      }).toString()
    );

    const videoData = await videoResponse.json();

    if (!videoResponse.ok) {
      console.error('YouTube API Video Details Error:', videoData);
      return res.status(videoResponse.status).json({ error: videoData.error?.message || 'Video details fetch failed' });
    }

    if (!videoData.items || videoData.items.length === 0) {
      return res.status(404).json({ error: `Video not found (ID: ${videoId})` });
    }

    const videoItem = videoData.items[0];

    // Fetch captions/subtitles
    let captions = [];
    try {
      const captionsResponse = await fetch(
        `${YOUTUBE_API_BASE_URL}/captions?` + 
        new URLSearchParams({
          part: 'snippet',
          videoId: videoId,
          key: YOUTUBE_API_KEY,
        }).toString()
      );

      if (captionsResponse.ok) {
        const captionsData = await captionsResponse.json();
        captions = captionsData.items.map(item => ({
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
    let comments = [];
    try {
      const commentsResponse = await fetch(
        `${YOUTUBE_API_BASE_URL}/commentThreads?` + 
        new URLSearchParams({
          part: 'snippet,replies',
          videoId: videoId,
          maxResults: '20',
          order: 'relevance',
          key: YOUTUBE_API_KEY,
        }).toString()
      );

      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json();
        comments = commentsData.items.map(thread => {
          const topComment = thread.snippet.topLevelComment.snippet;
          const replies = thread.replies?.comments?.slice(0, 3).map(reply => ({
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

    const result = {
      videoInfo: {
        id: videoItem.id,
        snippet: videoItem.snippet,
        statistics: videoItem.statistics,
        contentDetails: videoItem.contentDetails,
      },
      captions,
      comments,
    };

    res.json(result);

  } catch (error) {
    console.error('Error in video details endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`YouTube Subtitle Manager Backend running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});