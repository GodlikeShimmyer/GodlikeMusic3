import React, { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function CreatePlaylist() {
  const [name, setName] = useState("");

  const handleCreate = () => {
    alert(`Playlist "${name}" created!`);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-white">Create New Playlist</h1>
      <Card className="max-w-md">
        <Input
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleCreate} className="mt-4 w-full">
          Create Playlist
        </Button>
      </Card>
    </div>
  );
}
