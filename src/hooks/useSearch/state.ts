import type { SearchResult } from '@/lib/search';

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

export type SearchState = {
  status: SearchStatus;
  results: SearchResult[];
  error: string | null;
  lastResolvedQuery: string;
  activeQuery: string;
};

export type SearchAction =
  | { type: 'RESET' }
  | { type: 'REQUEST'; query: string }
  | { type: 'SUCCESS'; query: string; results: SearchResult[] }
  | { type: 'FAILURE'; query: string; error: string };

export const initialState: SearchState = {
  status: 'idle',
  results: [],
  error: null,
  lastResolvedQuery: '',
  activeQuery: ''
};

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'RESET':
      return { ...initialState };
    case 'REQUEST':
      return {
        ...state,
        status: 'loading',
        error: null,
        activeQuery: action.query
      };
    case 'SUCCESS':
      return {
        status: 'success',
        results: action.results,
        error: null,
        lastResolvedQuery: action.query,
        activeQuery: ''
      };
    case 'FAILURE':
      return {
        ...state,
        status: 'error',
        error: action.error,
        lastResolvedQuery: action.query,
        activeQuery: ''
      };
    default:
      return state;
  }
}
