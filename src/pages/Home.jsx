import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { storage } from '../utils/helpers';
import PlayerStore from '../store/PlayerStore';

export default function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const savedPlaylists = storage.get('playlists') || [];
    setPlaylists(savedPlaylists.slice(0, 6));

    const history = storage.get('playback_history') || [];
    setRecentlyPlayed(history.slice(0, 6));
  }, []);

  const handlePlayTrack = (track) => {
    PlayerStore.playTrack(track);
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <div className="relative h-80 bg-gradient-to-b from-godlike-green/20 to-transparent p-8 flex items-end">
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-6xl font-bold mb-4">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}
          </h1>
          <p className="text-xl text-gray-300">What do you want to listen to today?</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 space-y-12">
        {/* Recently Played */}
        {recentlyPlayed.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6">Recently Played</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyPlayed.map((track, idx) => (
                <Card
                  key={idx}
                  className="bg-white/5 border-none hover:bg-white/10 transition-all p-4 group cursor-pointer"
                  onClick={() => handlePlayTrack(track)}
                >
                  <div className="relative mb-4">
# end of file marker
