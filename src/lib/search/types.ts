export type SearchMatch = 'country' | 'capital' | 'altName';

export type SearchResult = {
  id: string;
  country: string;
  capital: string;
  matches: SearchMatch[];
};

export type SearchResponse = {
  results: SearchResult[];
};
