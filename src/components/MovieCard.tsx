// src/components/MovieCard.tsx

import React from 'react';
import { Movie } from '../types/movie.types';
import { tmdbApi } from '../services/tmdbApi';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      className="movie-card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 0.2s',
        backgroundColor: '#1a1a1a'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <img 
        src={tmdbApi.getImageUrl(movie.poster_path)}
        alt={movie.title}
        style={{
          width: '100%',
          height: '300px',
          objectFit: 'cover'
        }}
      />
      <div style={{ padding: '12px' }}>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '16px',
          color: '#fff',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {movie.title}
        </h3>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          fontSize: '14px',
          color: '#999'
        }}>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;