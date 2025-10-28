import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Search, Library, PlusSquare, Heart, Music, ChevronRight, ChevronDown, Folder, Star, Disc, Radio, 
  Headphones, Mic2, Guitar, Piano, Drum, PartyPopper, Zap, Flame, Sparkles, Moon, Sun, Coffee, Dumbbell, Plane, Car
} from 'lucide-react';
import Player from './player/Player';
import { storage } from '../utils/helpers';

const iconMap = {
  Music, Heart, Star, Disc, Radio, Headphones, Mic2, Guitar, 
  Piano, Drum, PartyPopper, Zap, Flame, Sparkles, Moon, 
  Sun, Coffee, Dumbbell, Plane, Car
};

export default function Layout({ children }) {
  const location = useLocation();
  const [playlists, setPlaylists] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});

  useEffect(() => {
    const savedPlaylists = storage.get('playlists') || [];
    setPlaylists(savedPlaylists);
  }, [location]);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Your Library', path: '/library' },
  ];

  const playlistsByFolder = React.useMemo(() => {
    const grouped = { '': [] };
    playlists.forEach(playlist => {
      const folder = playlist.folder || '';
      if (!grouped[folder]) grouped[folder] = [];
      grouped[folder].push(playlist);
    });
    return grouped;
  }, [playlists]);

  const folders = Object.keys(playlistsByFolder).filter(f => f !== '');

  const toggleFolder = (folder) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const getPlaylistIcon = (iconName) => {
    return iconMap[iconName] || Music;
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-black p-6 space-y-6 border-r border-white/10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-godlike-green to-godlike-cyan flex items-center justify-center">
              <Music className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-godlike-green to-godlike-cyan bg-clip-text text-transparent">
              GodlikeMusic
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Library Actions */}
          <div className="space-y-2 pt-4 border-t border-gray-800">
            <Link
              to="/create-playlist"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <PlusSquare className="w-5 h-5" />
              <span className="font-medium">Create Playlist</span>
            </Link>
            <Link
              to="/liked-songs"
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Liked Songs</span>
            </Link>
          </div>

          {/* Playlists & Folders */}
          <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1">
            {folders.map((folder) => {
              const isExpanded = expandedFolders[folder];
              return (
                <div key={folder}>
                  <button
                    onClick={() => toggleFolder(folder)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <Folder className="w-4 h-4" />
                    <span className="flex-1 truncate text-left">{folder}</span>
                  </button>
                  {isExpanded && playlistsByFolder[folder].map((playlist) => {
                    const Icon = getPlaylistIcon(playlist.icon);
                    return (
                      <Link
                        key={playlist.id}
                        to={`/playlist/${playlist.id}`}
                        className="flex items-center gap-2 pl-12 pr-4 py-2 text-sm text-gray-400 hover:text-white truncate transition-colors"
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{playlist.name}</span>
                      </Link>
                    );
                  })}
                </div>
              );
            })}

            {playlistsByFolder[''].map((playlist) => {
              const Icon = getPlaylistIcon(playlist.icon);
              return (
                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white truncate transition-colors"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{playlist.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="pt-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-godlike-blue to-godlike-cyan flex items-center justify-center text-xs font-bold">
                U
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">User</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black pb-24">
          {children}
        </main>
      </div>

      {/* Global Player */}
      <Player />
    </div>
  );
}
