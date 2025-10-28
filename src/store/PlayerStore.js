/**
 * Simple state management for music player
 * No external dependencies - pure JavaScript class
 */
class PlayerStore {
  constructor() {
    this.listeners = [];
    this.state = {
      currentTrack: null,
      isPlaying: false,
      queue: [],
      volume: 70,
      isShuffled: false,
      repeatMode: 'off', // 'off', 'all', 'one'
    };
  }

  /**
   * Subscribe to state changes
   * @param {Function} listener - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notify all listeners of state change
   */
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Play a specific track
   * @param {Object} track - Track object with video_id, title, artist, etc.
   */
  playTrack(track) {
    this.state = {
      ...this.state,
      currentTrack: track,
      isPlaying: true,
    };
    this.notify();
  }

  /**
   * Toggle play/pause
   */
  togglePlay() {
    this.state = {
      ...this.state,
      isPlaying: !this.state.isPlaying,
    };
    this.notify();
  }

  /**
   * Set playing state
   * @param {Boolean} isPlaying
   */
  setPlaying(isPlaying) {
    this.state = {
      ...this.state,
      isPlaying,
    };
    this.notify();
  }

  /**
   * Set playback queue
   * @param {Array} tracks - Array of track objects
   */
  setQueue(tracks) {
    this.state = {
      ...this.state,
      queue: tracks,
    };
    this.notify();
  }

  /**
   * Skip to next track
   */
  next() {
    const currentIndex = this.state.queue.findIndex(
      t => t.video_id === this.state.currentTrack?.video_id
    );
    if (currentIndex < this.state.queue.length - 1) {
      this.playTrack(this.state.queue[currentIndex + 1]);
    } else if (this.state.repeatMode === 'all') {
      this.playTrack(this.state.queue[0]);
    }
  }

  /**
   * Skip to previous track
   */
  previous() {
    const currentIndex = this.state.queue.findIndex(
      t => t.video_id === this.state.currentTrack?.video_id
    );
    if (currentIndex > 0) {
      this.playTrack(this.state.queue[currentIndex - 1]);
    }
  }

  /**
   * Set volume
   * @param {Number} volume - Volume level (0-100)
   */
  setVolume(volume) {
    this.state = {
      ...this.state,
      volume,
    };
    this.notify();
  }

  /**
   * Toggle shuffle mode
   */
  toggleShuffle() {
    this.state = {
      ...this.state,
      isShuffled: !this.state.isShuffled,
    };
    this.notify();
  }

  /**
   * Cycle through repeat modes: off -> all -> one -> off
   */
  cycleRepeat() {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(this.state.repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.state = {
      ...this.state,
      repeatMode: modes[nextIndex],
    };
    this.notify();
  }

  /**
   * Get current state
   * @returns {Object} Current state
   */
  getState() {
    return this.state;
  }
}

// Export singleton instance
export default new PlayerStore();

📄 src/api/youtube.js

/**
 * YouTube Data API v3 Integration
 * 
 * IMPORTANT: Get your free API key at https://console.cloud.google.com/
 * Free tier includes 10,000 units/day (about 100 searches)
 * 
 * Follow YouTube Terms of Service:
 * https://developers.google.com/youtube/terms/api-services-terms-of-service
 */

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Search for music videos
 * @param {string} query - Search query
 * @param {number} maxResults - Max results (default: 12)
 * @returns {Promise<Array>} Array of video objects
 */
export async function searchMusic(query, maxResults = 12) {
  if (!API_KEY) {
    console.error('YouTube API key not found. Add VITE_YOUTUBE_API_KEY to .env file');
    return getMockResults(query);
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&type=video&videoCategoryId=10&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map(item => ({
      video_id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
      duration: 'Unknown', // Would need additional API call to get duration
    }));
  } catch (error) {
    console.error('YouTube API search failed:', error);
    return getMockResults(query);
  }
}

/**
 * Get video details
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

    const data = await response.json();
    return data.items[0];
  } catch (error) {
    console.error('Failed to get video details:', error);
    return null;
  }
}

/**
 * Mock results for demo/development
 * @param {string} query - Search query
 * @returns {Array} Mock video results
 */
function getMockResults(query) {
  console.warn('Using mock data. Add YouTube API key for real results.');
  
  return [
    {
      video_id: 'jfKfPfyJRdk',
      title: 'lofi hip hop radio 📚 - beats to relax/study to',
      artist: 'Lofi Girl',
      thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
      duration: 'LIVE',
    },
    {
      video_id: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up',
      artist: 'Rick Astley',
      thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      duration: '3:33',
    },
    {
      video_id: '9bZkp7q19f0',
      title: 'PSY - GANGNAM STYLE',
      artist: 'officialpsy',
      thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/hqdefault.jpg',
      duration: '4:13',
    },
    {
      video_id: 'kJQP7kiw5Fk',
      title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
      artist: 'Luis Fonsi',
      thumbnail: 'https://i.ytimg.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
      duration: '4:42',
    },
    {
      video_id: 'OPf0YbXqDm0',
      title: 'Mark Ronson - Uptown Funk ft. Bruno Mars',
      artist: 'Mark Ronson',
      thumbnail: 'https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg',
      duration: '4:30',
    },
    {
      video_id: 'fRh_vgS2dFE',
      title: 'Justin Bieber - Sorry',
      artist: 'Justin Bieber',
      thumbnail: 'https://i.ytimg.com/vi/fRh_vgS2dFE/hqdefault.jpg',
      duration: '3:20',
    },
  ];
}

/**
 * Get trending music
 * @returns {Promise<Array>} Trending videos
 */
export async function getTrendingMusic() {
  return searchMusic('top songs 2024', 24);
}

/**
 * Get related videos
 * @param {string} videoId - Base video ID
 * @returns {Promise<Array>} Related videos
 */
export async function getRelatedVideos(videoId) {
  if (!API_KEY) {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=10&key=${API_KEY}`
    );

    const data = await response.json();
    return data.items.map(item => ({
      video_id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.high.url,
    }));
  } catch (error) {
    console.error('Failed to get related videos:', error);
    return [];
  }
}
