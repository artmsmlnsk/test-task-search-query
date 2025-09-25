'use client';

import { useEffect, useRef, type Dispatch } from 'react';

import type { SearchAction } from './state';
import type { SearchResponse } from '@/lib/search';

type UseSearchRequestArgs = {
  query: string;
  dispatch: Dispatch<SearchAction>;
};

export const useSearchRequest = ({ query, dispatch }: UseSearchRequestArgs) => {
  const requestIdRef = useRef(0);

  useEffect(() => {
    const searchable = query.trim();

    if (!searchable) {
      requestIdRef.current += 1;
      dispatch({ type: 'RESET' });
      return;
    }

    const requestId = ++requestIdRef.current;
    dispatch({ type: 'REQUEST', query: searchable });

    const controller = new AbortController();

    const run = async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(searchable)}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Не удалось загрузить результаты поиска');
        }

        const payload: SearchResponse = await response.json();

        if (requestIdRef.current !== requestId) {
          return;
        }

        dispatch({ type: 'SUCCESS', query: searchable, results: payload.results });
      } catch (error) {
        if (requestIdRef.current !== requestId) {
          return;
        }

        if ((error as Error).name === 'AbortError') {
          return;
        }

        dispatch({
          type: 'FAILURE',
          query: searchable,
          error: (error as Error).message || 'Неизвестная ошибка'
        });
      }
    };

    void run();

    return () => {
      controller.abort();
    };
  }, [dispatch, query]);
};
