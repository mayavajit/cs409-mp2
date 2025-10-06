// src/pages/SearchPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie, SortBy, SortOrder } from '../types/movie.types';
import { tmdbApi } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';
import { SORT_OPTIONS, ORDER_OPTIONS } from '../utils/constants';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('popularity');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await tmdbApi.searchMovies({
        query: searchQuery,
        sortBy,
        sortOrder
      });
      setMovies(response.results);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search effect - searches as user types
  React.useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch(query);
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delaySearch);
    // eslint-disable-next-line
  }, [query]);

  const handleSort = async () => {
    if (movies.length > 0) {
      const sortedMovies = [...movies].sort((a, b) => {
        const aValue = sortBy === 'release_date' ? a.release_date : a.popularity;
        const bValue = sortBy === 'release_date' ? b.release_date : b.popularity;
        
        if (sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
      setMovies(sortedMovies);
    }
  };

  React.useEffect(() => {
    handleSort();
    // eslint-disable-next-line
  }, [sortBy, sortOrder]);

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#fff', marginBottom: '30px' }}>Search Movies</h1>
      
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '12px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #333',
            backgroundColor: '#2a2a2a',
            color: '#fff'
          }}
        />
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ color: '#999', marginRight: '8px' }}>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #333',
              backgroundColor: '#2a2a2a',
              color: '#fff'
            }}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ color: '#999', marginRight: '8px' }}>Order:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #333',
              backgroundColor: '#2a2a2a',
              color: '#fff'
            }}
          >
            {ORDER_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
            onClick={() => navigate(`/movie/${movie.id}`, {
              state: { movie, movies, currentIndex: index, returnPath: '/' }
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;