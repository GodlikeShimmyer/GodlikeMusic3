class PlayerStore {
  constructor() {
    this.listeners = [];
    this.state = {
      currentTrack: null,
      isPlaying: false,
      queue: [],
      currentIndex: 0,
      volume: 70,
      isShuffled: false,
      repeatMode: 'off', // 'off', 'all', 'one'
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  playTrack(track) {
    this.state = {
      ...this.state,
      currentTrack: track,
      isPlaying: true,
    };
    this.notify();

    // Save to playback history
    this.saveToHistory(track);
  }

  setQueue(tracks) {
    this.state = {
      ...this.state,
      queue: tracks,
      currentIndex: 0,
    };
    this.notify();
  }

  togglePlay() {
    this.state = {
      ...this.state,
      isPlaying: !this.state.isPlaying,
    };
    this.notify();
  }

  setPlaying(isPlaying) {
    this.state = {
      ...this.state,
      isPlaying,
    };
    this.notify();
  }

  next() {
    const { queue, currentIndex, repeatMode } = this.state;

    if (repeatMode === 'one') {
      // Replay current track
      this.notify();
      return;
    }

    if (currentIndex < queue.length - 1) {
      const nextTrack = queue[currentIndex + 1];
      this.state = {
        ...this.state,
        currentTrack: nextTrack,
        currentIndex: currentIndex + 1,
        isPlaying: true,
      };
      this.notify();
      this.saveToHistory(nextTrack);
    } else if (repeatMode === 'all') {
      // Loop back to first track
      const firstTrack = queue[0];
      this.state = {
        ...this.state,
        currentTrack: firstTrack,
        currentIndex: 0,
        isPlaying: true,
      };
      this.notify();
      this.saveToHistory(firstTrack);
    }
  }

  previous() {
    const { queue, currentIndex } = this.state;

    if (currentIndex > 0) {
      const prevTrack = queue[currentIndex - 1];
      this.state = {
        ...this.state,
        currentTrack: prevTrack,
        currentIndex: currentIndex - 1,
        isPlaying: true,
      };
      this.notify();
      this.saveToHistory(prevTrack);
    }
  }

  setVolume(volume) {
    this.state = {
      ...this.state,
      volume,
    };
    this.notify();
  }

  toggleShuffle() {
    this.state = {
      ...this.state,
      isShuffled: !this.state.isShuffled,
    };
    this.notify();
  }

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

  saveToHistory(track) {
    const history = JSON.parse(localStorage.getItem('playback_history') || '[]');
    const newHistory = [
      track,
      ...history.filter(t => t.video_id !== track.video_id)
    ].slice(0, 50);
    localStorage.setItem('playback_history', JSON.stringify(newHistory));
  }

  getState() {
    return this.state;
  }
}

export default new PlayerStore();
