import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import PlayerStore from '../store/PlayerStore';
import { storage } from '../utils/helpers';

export default function Playlist() {
  const { id } = useParams();
  const playlist = (storage.get('playlists') || []).find(p => p.id === id);

  if (!playlist) {
    return <div className="p-8 text-gray-400">Playlist not found.</div>;
  }

  const handlePlayTrack = (track) => {
    PlayerStore.playTrack(track);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 pb-32">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={playlist.thumbnail || '/default_playlist.png'}
          alt={playlist.name}
          className="w-48 h-48 rounded-xl object-cover"
        />
        <div>
          <h1 className="text-5xl font-bold">{playlist.name}</h1>
          <p className="text-gray-400 mt-2">
            {playlist.tracks?.length || 0} tracks
          </p>
        </div>
      </div>

      {playlist.tracks?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlist.tracks.map((track, idx) => (
            <Card
              key={idx}
              className="bg-white/5 border-none hover:bg-white/10 transition-all p-4 group cursor-pointer"
              onClick={() => handlePlayTrack(track)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={track.thumbnail || '/default_album.png'}
                  alt={track.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold truncate">{track.title}</h3>
                  <p className="text-sm text-gray-400 truncate">
                    {track.artist || 'Unknown Artist'}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No songs in this playlist.</p>
      )}
    </div>
  );
}
