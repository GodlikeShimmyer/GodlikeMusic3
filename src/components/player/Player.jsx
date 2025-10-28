import React, { useState, useEffect } from 'react';
import PlayerStore from '../../store/PlayerStore';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Maximize2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Slider } from '../ui/Slider';
import PlayerSidebar from './PlayerSidebar';

export default function Player() {
  const [playerState, setPlayerState] = useState(PlayerStore.getState());
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const unsubscribe = PlayerStore.subscribe(setPlayerState);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (playerState.currentTrack) {
      setShowSidebar(true);
    }
  }, [playerState.currentTrack]);

  if (!playerState.currentTrack) return null;

  const { currentTrack, isPlaying, volume, isShuffled, repeatMode } = playerState;

  return (
    <>
      {/* Bottom Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-black border-t border-gray-800 px-4 flex items-center justify-between z-40">
        {/* Track Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img
            src={currentTrack.thumbnail || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100'}
            alt={currentTrack.title}
            className="w-14 h-14 rounded"
          />
          <div className="min-w-0">
            <h4 className="font-semibold truncate">{currentTrack.title}</h4>
            <p className="text-sm text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => PlayerStore.toggleShuffle()}
              className={isShuffled ? 'text-godlike-green' : 'text-gray-400'}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => PlayerStore.previous()}
              className="text-gray-400 hover:text-white"
            >
              <SkipBack className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              onClick={() => PlayerStore.togglePlay()}
              className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 text-black"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-black" />
              ) : (
                <Play className="w-5 h-5 fill-black ml-0.5" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => PlayerStore.next()}
              className="text-gray-400 hover:text-white"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => PlayerStore.cycleRepeat()}
              className={repeatMode !== 'off' ? 'text-godlike-green' : 'text-gray-400'}
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex items-center gap-2 w-32">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <Slider
              value={[volume]}
              onValueChange={([v]) => PlayerStore.setVolume(v)}
              max={100}
              className="w-20"
            />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-gray-400 hover:text-white"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Player Sidebar */}
      <PlayerSidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </>
  );
}
