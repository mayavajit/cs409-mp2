// src/types/movie.types.ts

export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    original_language: string;
    genre_ids: number[];
    adult: boolean;
  }
  
  export interface MovieDetailsResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  export type SortBy = 'popularity' | 'release_date';
  export type SortOrder = 'asc' | 'desc';
  
  export interface SearchParams {
    query: string;
    page?: number;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
  }
  
  export interface DiscoverParams {
    page?: number;
    sortBy?: string;
    primaryReleaseDateGte?: string;
    primaryReleaseDateLte?: string;
  }
  
  export interface Decade {
    label: string;
    startYear: number;
    endYear: number;
  }