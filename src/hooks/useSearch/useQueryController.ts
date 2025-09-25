"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebouncedValue } from "./useDebouncedValue";

type QueryControllerReturn = {
  query: string;
  setQuery: (value: string) => void;
  clearQuery: () => void;
  debouncedQuery: string;
};

export const useQueryController = (
  paramName: string,
  debounceMs: number
): QueryControllerReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlValue = searchParams.get(paramName) ?? "";
  const searchParamsString = useMemo(
    () => searchParams.toString(),
    [searchParams]
  );

  const [query, setQueryState] = useState(urlValue);

  useEffect(() => {
    setQueryState((current) => (current === urlValue ? current : urlValue));
  }, [urlValue]);

  useEffect(() => {
    if (query === urlValue) {
      return;
    }

    const params = new URLSearchParams(searchParamsString);

    if (query.trim()) {
      params.set(paramName, query);
    } else {
      params.delete(paramName);
    }

    const nextQuery = params.toString();
    const target = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    router.replace(target, { scroll: false });
  }, [query, urlValue, searchParamsString, router, pathname, paramName]);

  const debouncedQuery = useDebouncedValue(query, debounceMs);

  const setQuery = useCallback(
    (value: string) => {
      setQueryState(value);
    },
    [setQueryState]
  );

  const clearQuery = useCallback(() => {
    setQueryState("");
  }, [setQueryState]);

  return { query, setQuery, clearQuery, debouncedQuery };
};
