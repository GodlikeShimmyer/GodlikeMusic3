import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// You can connect this later to your actual player context or API
export default function PlayerSidebar({ currentTrack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  // Fake playback logic for now
  useEffect(() => {
    if (isPlaying) {
      console.log("▶️ Playing:", currentTrack?.title || "Unknown Track");
    } else {
      console.log("⏸️ Paused");
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const nextTrack = () => console.log("⏭️ Next track");
  const prevTrack = () => console.log("⏮️ Previous track");

  return (
    <motion.div
      className="flex flex-col justify-between bg-gradient-to-b from-cyan-900 to-green-900 text-white w-64 p-4 rounded-2xl shadow-lg"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Current track info */}
      <div className="mb-6">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.thumbnail || "/placeholder.png"}
              alt={currentTrack.title}
              className="rounded-xl mb-3 w-full aspect-square object-cover"
            />
            <h2 className="text-lg font-semibold truncate">
              {currentTrack.title}
            </h2>
            <p className="text-sm opacity-75">{currentTrack.artist}</p>
          </>
        ) : (
          <p className="text-center opacity-70 italic">No track selected</p>
        )}
      </div>

      {/* Player controls */}
      <div className="flex flex-col gap-4 items-center">
        <div className="flex justify-center gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTrack}
            className="hover:text-cyan-400"
          >
            <SkipBack size={22} />
          </Button>

          <Button
            variant="default"
            size="icon"
            onClick={togglePlay}
            className="bg-cyan-500 hover:bg-green-500 rounded-full p-4"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextTrack}
            className="hover:text-cyan-400"
          >
            <SkipForward size={22} />
          </Button>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2 w-full">
          <Volume2 size={18} />
          <input
            type="range"
           
