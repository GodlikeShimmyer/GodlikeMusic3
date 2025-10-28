# 🎵 GodlikeMusic

Full-featured music streaming web app inspired by Spotify, built with React + Vite + Tailwind CSS.

## ⚠️ Legal Notice

This is an **educational project** for learning React and web development.

**IMPORTANT:**
- This app uses YouTube Data API v3 for music search and playback
- You MUST obtain your own API key from Google Cloud Console
- Follow YouTube Terms of Service: https://developers.google.com/youtube/terms
- Free tier: 10,000 units/day (100 searches)
- Never share or commit your API key publicly
- This is NOT affiliated with Spotify or YouTube

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- YouTube Data API v3 key (optional - app works with localStorage)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/godlikemusic.git
cd godlikemusic

    Install dependencies:

npm install

    Set up environment variables (optional):

cp .env.example .env
# Edit .env and add your YouTube API key

    Run development server:

npm run dev

    Open browser: Navigate to http://localhost:5173

📦 Build for Production

npm run build
npm run preview

🎨 Features

    ✅ Beautiful Spotify-inspired UI
    ✅ YouTube music search
    ✅ Create and manage playlists
    ✅ Playlist icons (20 options)
    ✅ Playlist folders with expand/collapse
    ✅ Cover image upload
    ✅ Playback controls (play/pause/skip/volume)
    ✅ Queue management
    ✅ Like/unlike songs
    ✅ Liked songs library
    ✅ Recently played history
    ✅ Responsive design
    ✅ YouTube embed player with sidebar
    ✅ LocalStorage persistence (no backend needed)

🛠️ Tech Stack

    React 18 - UI framework
    Vite - Build tool
    Tailwind CSS - Styling
    React Router - Navigation
    Lucide React - Icons
    YouTube IFrame API - Video playback
    LocalStorage - Data persistence

📁 Project Structure

src/
├── api/          # API integrations
├── components/   # Reusable components
├── pages/        # Page components
├── store/        # State management
└── utils/        # Helper functions

📚 Learning Resources

    React Documentation
    Tailwind CSS
    YouTube Data API

📝 License

MIT License - Feel free to use for learning purposes.
🤝 Contributing

This is an educational project. Feel free to fork and modify!


---

## 📄 **src/main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
