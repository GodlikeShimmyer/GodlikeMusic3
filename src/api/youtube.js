const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Search YouTube for music videos
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum number of results
 * @returns {Promise<Array>} Array of track objects
 */
export async function searchMusic(query, maxResults = 12) {
  if (!API_KEY) {
    console.warn('YouTube API key not configured. Using mock data.');
    return getMockResults(query);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoCategoryId=10&maxResults=${maxResults}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();

    return data.items.map(item => ({
      video_id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url,
      duration: 'Unknown',
    }));
  } catch (error) {
    console.error('YouTube API error:', error);
    return getMockResults(query);
  }
}

/**
 * Get video details by ID
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<Object>} Video details
 */
export async function getVideoDetails(videoId) {
  if (!API_KEY) {
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('YouTube API request failed');
    }

    const data = await response.json();
    const item = data.items[0];

    if (!item) return null;

    return {
      video_id: item.id,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high?.url,
      duration: item.contentDetails.duration,
    };
  } catch (error) {
    console.error('YouTube API error:', error);
    return null;
  }
}

/**
 * Mock results for when API key is not available
 */
function getMockResults(query) {
  const mockTracks = [
    {
      video_id: 'dQw4w9WgXcQ',
      title: `${query} - Official Music Video`,
      artist: 'Artist Name',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=480',
      duration: '3:45',
    },
    {
      video_id: 'jfKfPfyJRdk',
      title: `${query} Remix`,
      artist: 'DJ Artist',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=480',
      duration: '4:20',
    },
    {
      video_id: '9bZkp7q19f0',
      title: `Best of ${query}`,
      artist: 'Various Artists',
      thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=480',
      duration: '5:12',
    },
  ];

  return mockTracks;
}
