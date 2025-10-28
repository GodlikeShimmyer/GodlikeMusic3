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
            Good{' '}
            {new Date().getHours() < 12
              ? 'morning'
              : new Date().getHours() < 18
              ? 'afternoon'
              : 'evening'}
          </h1>
          <p className="text-xl text-gray-300">
            What do you want to listen to today?
          </p>
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
                    <img
                      src={track.thumbnail || '/default_album.png'}
                      alt={track.title}
                      className="rounded-xl w-full h-40 object-cover"
                    />
                    <button
                      className="absolute bottom-2 right-2 bg-godlike-green text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Play size={20} />
                    </button>
                  </div>
                  <h3 className="font-semibold truncate">{track.title}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {track.artist || 'Unknown Artist'}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Your Playlists */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex justify-between items-center">
            Your Playlists
            <Link to="/create-playlist">
              <Button variant="outline" size="sm">
                <Plus size={16} className="mr-2" /> New Playlist
              </Button>
            </Link>
          </h2>

          {playlists.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {playlists.map((playlist, idx) => (
                <Link to={`/playlist/${playlist.id}`} key={idx}>
                  <Card className="bg-white/5 border-none hover:bg-white/10 transition-all p-4">
                    <div className="relative mb-4">
                      <img
                        src={playlist.thumbnail || '/default_playlist.png'}
                        alt={playlist.name}
                        className="rounded-xl w-full h-40 object-cover"
                      />
                    </div>
                    <h3 className="font-semibold truncate">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {playlist.tracks?.length || 0} tracks
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              You don’t have any playlists yet. Create one to get started!
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
