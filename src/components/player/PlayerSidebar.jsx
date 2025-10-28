import React from "react";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import Button from "../ui/Button";

export default function PlayerSidebar({ isPlaying, onPlayPause, onSkipNext, onSkipPrev }) {
  return (
    <div className="flex flex-col items-center justify-between h-full p-4 bg-gradient-to-b from-cyan-700 via-blue-700 to-green-700 text-white rounded-2xl shadow-lg">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-xl font-semibold tracking-wide">Now Playing</h2>
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-24 h-24 bg-black/30 rounded-xl flex items-center justify-center">
            <Play className="w-10 h-10 text-white opacity-60" />
          </div>
          <p className="font-medium text-base">Song Title</p>
          <p className="text-sm text-white/70">Artist Name</p>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6">
        <Button variant="ghost" size="icon" onClick={onSkipPrev}>
          <SkipBack className="w-6 h-6" />
        </Button>

        <Button variant="ghost" size="icon" onClick={onPlayPause}>
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
        </Button>

        <Button variant="ghost" size="icon" onClick={onSkipNext}>
          <SkipForward className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
