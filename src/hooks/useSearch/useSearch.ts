'use client';

import { useReducer } from 'react';

import { DEBOUNCE_MS, SEARCH_PARAM } from './constants';
import { useQueryController } from './useQueryController';
import { useSearchRequest } from './useSearchRequest';
import { initialState, searchReducer } from './state';

export const useSearch = () => {
  const { query, setQuery, clearQuery, debouncedQuery } = useQueryController(SEARCH_PARAM, DEBOUNCE_MS);
  const [state, dispatch] = useReducer(searchReducer, initialState);

  useSearchRequest({ query: debouncedQuery, dispatch });

  return {
    query,
    setQuery,
    clearQuery,
    results: state.results,
    status: state.status,
    error: state.error,
    lastResolvedQuery: state.lastResolvedQuery,
    isLoading: state.status === 'loading',
    activeQuery: state.activeQuery
  };
};
