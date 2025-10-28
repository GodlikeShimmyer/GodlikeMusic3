import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/helpers';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { nanoid } from 'nanoid';

export default function CreatePlaylist() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name.trim()) return;
    const playlists = storage.get('playlists') || [];
    const newPlaylist = { id: nanoid(), name, tracks: [] };
    storage.set('playlists', [...playlists, newPlaylist]);
    navigate(`/playlist/${newPlaylist.id}`);
  };

  return (
    <div className="max-w-md mx-auto p-8 pb-32">
      <h1 className="text-4xl font-bold mb-6">New Playlist</h1>
      <Input
        placeholder="Playlist name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleCreate} className="w-full">
        Create
      </Button>
    </div>
  );
}
