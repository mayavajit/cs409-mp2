// src/pages/MovieDetailPage.tsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Movie } from '../types/movie.types';
import { tmdbApi } from '../services/tmdbApi';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get the list of movies and current index from location state if available
  const movies = location.state?.movies as Movie[] | undefined;
  const currentIndex = location.state?.currentIndex as number | undefined;
  const returnPath = location.state?.returnPath as string | undefined;

  useEffect(() => {
    // Reset state and fetch new movie data whenever the ID changes
    setLoading(true);
    setError('');
    
    // Check if we have the movie in our state first
    const movieFromState = location.state?.movie as Movie | undefined;
    if (movieFromState && movieFromState.id.toString() === id) {
      setMovie(movieFromState);
      setLoading(false);
    } else {
      // Otherwise fetch it
      fetchMovieDetails(id!);
    }
  }, [id, location.state]);

  const fetchMovieDetails = async (movieId: string) => {
    setLoading(true);
    setError('');
    
    try {
      // Note: You would need to add a getMovieDetails method to tmdbApi
      // For now, we'll use the discover endpoint as a workaround
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
            'accept': 'application/json'
          }
        }
      );
      const data = await response.json();
      setMovie(data);
    } catch (err) {
      setError('Failed to fetch movie details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (movies && currentIndex !== undefined && currentIndex > 0) {
      const prevMovie = movies[currentIndex - 1];
      navigate(`/movie/${prevMovie.id}`, {
        state: { 
          movie: prevMovie, 
          movies, 
          currentIndex: currentIndex - 1,
          returnPath: returnPath || location.pathname 
        },
        replace: false
      });
    }
  };

  const handleNext = () => {
    if (movies && currentIndex !== undefined && currentIndex < movies.length - 1) {
      const nextMovie = movies[currentIndex + 1];
      navigate(`/movie/${nextMovie.id}`, {
        state: { 
          movie: nextMovie, 
          movies, 
          currentIndex: currentIndex + 1,
          returnPath: returnPath || location.pathname 
        },
        replace: false
      });
    }
  };

  const handleClose = () => {
    // Go back to the page we came from (search or gallery)
    console.log('Return path:', returnPath);
    if (returnPath) {
      navigate(returnPath);
    } else {
      navigate('/'); // Default to search page
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', color: '#fff', textAlign: 'center' }}>
        Loading...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div style={{ padding: '20px', color: '#ff4444', textAlign: 'center' }}>
        {error || 'Movie not found'}
      </div>
    );
  }

  const hasPrevious = movies && currentIndex !== undefined && currentIndex > 0;
  const hasNext = movies && currentIndex !== undefined && currentIndex < movies.length - 1;

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      color: '#fff' 
    }}>
      <button
        onClick={handleClose}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#2a2a2a',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ← Back
      </button>

      <div style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <img 
          src={tmdbApi.getImageUrl(movie.backdrop_path || movie.poster_path, 'w1280')}
          alt={movie.title}
          style={{
            width: '100%',
            height: '500px',
            objectFit: 'cover'
          }}
        />

        <div style={{ padding: '32px' }}>
          <h1 style={{ marginTop: 0, marginBottom: '24px' }}>{movie.title}</h1>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
            fontSize: '16px'
          }}>
            <div>
              <strong>Release Date:</strong>
              <br />
              {movie.release_date || 'N/A'}
            </div>
            <div>
              <strong>Rating:</strong>
              <br />
              ⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
            </div>
            <div>
              <strong>Language:</strong>
              <br />
              {movie.original_language.toUpperCase()}
            </div>
            <div>
              <strong>Popularity:</strong>
              <br />
              {movie.popularity.toFixed(0)}
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3>Overview</h3>
            <p style={{ lineHeight: '1.8', color: '#ccc', fontSize: '16px' }}>
              {movie.overview || 'No overview available.'}
            </p>
          </div>

          {(hasPrevious || hasNext) && (
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              justifyContent: 'center',
              paddingTop: '20px',
              borderTop: '1px solid #333'
            }}>
              <button
                onClick={handlePrevious}
                disabled={!hasPrevious}
                style={{
                  padding: '12px 24px',
                  backgroundColor: hasPrevious ? '#0066cc' : '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: hasPrevious ? 'pointer' : 'not-allowed',
                  fontSize: '16px'
                }}
              >
                ← Previous Movie
              </button>
              <button
                onClick={handleNext}
                disabled={!hasNext}
                style={{
                  padding: '12px 24px',
                  backgroundColor: hasNext ? '#0066cc' : '#333',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: hasNext ? 'pointer' : 'not-allowed',
                  fontSize: '16px'
                }}
              >
                Next Movie →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;