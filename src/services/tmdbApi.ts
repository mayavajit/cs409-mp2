// src/services/tmdbApi.ts

import axios from 'axios';
import { MovieDetailsResponse, SearchParams, DiscoverParams } from '../types/movie.types';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'accept': 'application/json'
  }
});

export const tmdbApi = {
  searchMovies: async (params: SearchParams): Promise<MovieDetailsResponse> => {
    const response = await tmdbClient.get('/search/movie', {
      params: {
        query: params.query,
        include_adult: false,
        language: 'en-US',
        page: params.page || 1
      }
    });
    
    // Sort results client-side since TMDB search doesn't support sorting
    let results = response.data.results;
    if (params.sortBy) {
      results = [...results].sort((a, b) => {
        const aValue = a[params.sortBy === 'release_date' ? 'release_date' : 'popularity'];
        const bValue = b[params.sortBy === 'release_date' ? 'release_date' : 'popularity'];
        
        if (params.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }
    
    return { ...response.data, results };
  },

  discoverMovies: async (params: DiscoverParams): Promise<MovieDetailsResponse> => {
    const sortParam = params.sortBy 
      ? `${params.sortBy}.${params.sortBy.includes('.') ? '' : 'desc'}`
      : 'popularity.desc';

    const response = await tmdbClient.get('/discover/movie', {
      params: {
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page: params.page || 1,
        sort_by: sortParam,
        'primary_release_date.gte': params.primaryReleaseDateGte,
        'primary_release_date.lte': params.primaryReleaseDateLte
      }
    });
    
    return response.data;
  },

  getImageUrl: (path: string | null, size: string = 'w500'): string => {
    if (!path) return '/placeholder-movie.png';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
};

export default tmdbApi;