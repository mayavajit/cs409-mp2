// src/utils/constants.ts

import { Decade } from '../types/movie.types';

export const DECADES: Decade[] = [
  { label: '1950s', startYear: 1950, endYear: 1959 },
  { label: '1960s', startYear: 1960, endYear: 1969 },
  { label: '1970s', startYear: 1970, endYear: 1979 },
  { label: '1980s', startYear: 1980, endYear: 1989 },
  { label: '1990s', startYear: 1990, endYear: 1999 },
  { label: '2000s', startYear: 2000, endYear: 2009 },
  { label: '2010s', startYear: 2010, endYear: 2019 },
  { label: '2020s', startYear: 2020, endYear: 2029 }
];

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'release_date', label: 'Release Date' }
];

export const ORDER_OPTIONS = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' }
];