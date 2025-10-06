// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import GalleryPage from './pages/GalleryPage';
import MovieDetailPage from './pages/MovieDetailPage';
import './App.css';

function App() {
  return (
    <Router basename="/cs409-mp2">
      <div className="App" style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0a0a0a',
        color: '#fff'
      }}>
        <nav style={{
          backgroundColor: '#1a1a1a',
          padding: '20px',
          borderBottom: '1px solid #333',
          marginBottom: '20px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            gap: '20px',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, marginRight: 'auto' }}>🎬 TMDB Explorer</h2>
            <Link 
              to="/" 
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                backgroundColor: '#2a2a2a',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0066cc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
            >
              Search
            </Link>
            <Link 
              to="/gallery" 
              style={{
                color: '#fff',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                backgroundColor: '#2a2a2a',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0066cc'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
            >
              Gallery
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="*" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
