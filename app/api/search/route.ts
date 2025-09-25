import { NextResponse } from 'next/server';

import { searchCatalog, type SearchResponse } from '@/lib/search';

const MIN_DELAY_MS = 200;
const MAX_DELAY_MS = 900;

const delay = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const randomDelay = () =>
  Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;

const normalizeQuery = (params: URLSearchParams, key: string): string =>
  params.get(key) ?? '';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = normalizeQuery(url.searchParams, 'q');

  await delay(randomDelay());

  if (!query.trim()) {
    return NextResponse.json<SearchResponse>({ results: [] });
  }

  const results = searchCatalog(query);

  return NextResponse.json<SearchResponse>({ results });
}

const methodNotAllowed = () =>
  NextResponse.json({ message: 'Method Not Allowed' }, {
    status: 405,
    headers: { Allow: 'GET' }
  });

export { methodNotAllowed as POST, methodNotAllowed as PUT, methodNotAllowed as PATCH, methodNotAllowed as DELETE };
