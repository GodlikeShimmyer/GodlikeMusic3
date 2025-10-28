import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { storage } from '../utils/helpers';

export default function Library() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setPlaylists(storage.get('playlists') || []);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8 pb-32">
      <h1 className="text-4xl font-bold mb-8">Your Library</h1>
      {playlists.length === 0 ? (
        <p className="text-gray-400">No playlists yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {playlists.map((playlist, idx) => (
            <Link to={`/playlist/${playlist.id}`} key={idx}>
              <Card className="bg-white/5 border-none hover:bg-white/10 transition-all p-4">
                <img
                  src={playlist.thumbnail || '/default_playlist.png'}
                  alt={playlist.name}
                  className="rounded-xl mb-4 w-full h-40 object-cover"
                />
                <h3 className="font-semibold truncate">{playlist.name}</h3>
                <p className="text-sm text-gray-400">
                  {playlist.tracks?.length || 0} tracks
                </p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
