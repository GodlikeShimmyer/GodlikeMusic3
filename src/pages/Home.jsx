import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus } from 'lucide-react';
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import { storage, getGreeting } from '../utils/helpers';
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
          <h1 className="text-6xl font-bold mb-4">{getGreeting()}</h1>
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
                  className="bg-white/5 hover:bg-white/10 p-4 group cursor-pointer"
                  onClick={() => handlePlayTrack(track)}
                >
                  <div className="relative mb-4">
                    <img
                      src={track.thumbnail}
                      alt={track.title}
                      className="w-full aspect-square object-cover rounded-md"
                    />
                    <button className="absolute bottom-2 right-2 w-12 h-12 bg-godlike-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl">
                      <Play className="w-5 h-5 text-black fill-black ml-1" />
                    </button>
                  </div>
                  <h3 className="font-semibold truncate">{track.title}</h3>
                  <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Featured Playlists */}
        {playlists.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Your Playlists</h2>
              <Link to="/library">
                <Button variant="link" className="text-gray-400 hover:text-white">
                  Show all
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {playlists.map((playlist) => (
                <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                  <Card className="bg-white/5 hover:bg-white/10 p-4 group cursor-pointer">
                    <div className="relative mb-4">
                      <img
                        src={playlist.cover_url}
                        alt={playlist.name}
                        className="w-full aspect-square object-cover rounded-md"
                      />
                      <button className="absolute bottom-2 right-2 w-12 h-12 bg-godlike-green rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl">
                        <Play className="w-5 h-5 text-black fill-black ml-1" />
                      </button>
                    </div>
                    <h3 className="font-semibold truncate">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {playlist.tracks?.length || 0} songs
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/create-playlist">
            <Card className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border-purple-500/30 p-8 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Plus className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Create Playlist</h3>
                  <p className="text-gray-300">Start building your perfect mix</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/search">
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border-blue-500/30 p-8 hover:scale-105 transition-transform cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-godlike-blue rounded-xl flex items-center justify-center">
                  <Play className="w-8 h-8 fill-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Discover Music</h3>
                  <p className="text-gray-300">Find your next favorite song</p>
                </div>
              </div>
            </Card>
          </Link>
        </section>
      </div>
    </div>
  );
}
