// src/components/MovieDetailModal.tsx

import React from 'react';
import { Movie } from '../types/movie.types';
import { tmdbApi } from '../services/tmdbApi';

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            zIndex: 10
          }}
        >
          ×
        </button>

        <img 
          src={tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w780')}
          alt={movie.title}
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            borderRadius: '12px 12px 0 0'
          }}
        />

        <div style={{ padding: '24px', color: '#fff' }}>
          <h2 style={{ marginTop: 0 }}>{movie.title}</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            <div>
              <strong>Release Date:</strong> {movie.release_date || 'N/A'}
            </div>
            <div>
              <strong>Rating:</strong> ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
            </div>
            <div>
              <strong>Language:</strong> {movie.original_language.toUpperCase()}
            </div>
            <div>
              <strong>Popularity:</strong> {movie.popularity.toFixed(0)}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong>Overview:</strong>
            <p style={{ lineHeight: '1.6', color: '#ccc' }}>
              {movie.overview || 'No overview available.'}
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center',
            marginTop: '24px'
          }}>
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              style={{
                padding: '10px 20px',
                backgroundColor: hasPrevious ? '#0066cc' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: hasPrevious ? 'pointer' : 'not-allowed',
                fontSize: '16px'
              }}
            >
              ← Previous
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              style={{
                padding: '10px 20px',
                backgroundColor: hasNext ? '#0066cc' : '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: hasNext ? 'pointer' : 'not-allowed',
                fontSize: '16px'
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;