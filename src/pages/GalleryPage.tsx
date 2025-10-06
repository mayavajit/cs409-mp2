// src/pages/GalleryPage.tsx

import React, { useState, useEffect } from 'react';
import { Movie } from '../types/movie.types';
import { tmdbApi } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import MovieDetailModal from '../components/MovieDetailModal';
import { DECADES } from '../utils/constants';

const GalleryPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState<number | null>(null);

  const fetchMovies = async (startYear?: number, endYear?: number) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await tmdbApi.discoverMovies({
        sortBy: 'popularity.desc',
        primaryReleaseDateGte: startYear ? `${startYear}-01-01` : undefined,
        primaryReleaseDateLte: endYear ? `${endYear}-12-31` : undefined
      });
      setMovies(response.results);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDecadeFilter = (decade: typeof DECADES[0] | null) => {
    if (decade) {
      setSelectedDecade(decade.label);
      fetchMovies(decade.startYear, decade.endYear);
    } else {
      setSelectedDecade(null);
      fetchMovies();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#fff', marginBottom: '30px' }}>Movie Gallery</h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => handleDecadeFilter(null)}
          style={{
            padding: '10px 20px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: selectedDecade === null ? '#0066cc' : '#2a2a2a',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          All
        </button>
        {DECADES.map(decade => (
          <button
            key={decade.label}
            onClick={() => handleDecadeFilter(decade)}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: selectedDecade === decade.label ? '#0066cc' : '#2a2a2a',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {decade.label}
          </button>
        ))}
      </div>

      {loading && <p style={{ color: '#999' }}>Loading...</p>}
      {error && <p style={{ color: '#ff4444' }}>{error}</p>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => setSelectedMovieIndex(index)}
          />
        ))}
      </div>

      {selectedMovieIndex !== null && (
        <MovieDetailModal
          movie={movies[selectedMovieIndex]}
          onClose={() => setSelectedMovieIndex(null)}
          onPrevious={() => setSelectedMovieIndex(Math.max(0, selectedMovieIndex - 1))}
          onNext={() => setSelectedMovieIndex(Math.min(movies.length - 1, selectedMovieIndex + 1))}
          hasPrevious={selectedMovieIndex > 0}
          hasNext={selectedMovieIndex < movies.length - 1}
        />
      )}
    </div>
  );
};

export default GalleryPage;