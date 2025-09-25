import { CATALOG, type CatalogEntry } from "./catalog";
import { normalize } from "./normalize";
import type { SearchResult } from "./types";

type IndexedEntry = CatalogEntry & {
  normalizedCountry: string;
  normalizedCapital: string;
  normalizedAltNames: string[];
};

// беру сырой каталог и нормализую все знаичения из него, чтобы проще было искать
const indexedCatalog: IndexedEntry[] = CATALOG.map((entry) => ({
  ...entry,
  normalizedCountry: normalize(entry.country),
  normalizedCapital: normalize(entry.capital),
  normalizedAltNames: entry.altNames?.map(normalize) ?? [],
}));

// перевожу совпадения в цифровой скор, чтобы потом можно было приоритезировать найденные значения
const scoreMatches = (matches: SearchResult["matches"]): number => {
  const countryScore = matches.includes("country") ? 2 : 0;
  const capitalScore = matches.includes("capital") ? 2 : 0;
  const altScore = matches.includes("altName") ? 1 : 0;

  return countryScore + capitalScore + altScore;
};

export const searchCatalog = (rawQuery: string): SearchResult[] => {
  const normalizedQuery = normalize(rawQuery);

  if (!normalizedQuery) {
    return [];
  }

  return indexedCatalog
    .map<(SearchResult & { score: number }) | null>((entry) => {
      const matches: SearchResult["matches"] = [];

      if (entry.normalizedCountry.includes(normalizedQuery)) {
        matches.push("country");
      }

      if (entry.normalizedCapital.includes(normalizedQuery)) {
        matches.push("capital");
      }

      if (
        entry.normalizedAltNames.some((alt) => alt.includes(normalizedQuery))
      ) {
        matches.push("altName");
      }

      if (!matches.length) {
        return null;
      }

      const score = scoreMatches(matches);

      return {
        id: entry.id,
        country: entry.country,
        capital: entry.capital,
        matches,
        score,
      };
    })
    .filter(
      (entry): entry is SearchResult & { score: number } => entry !== null
    )
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.country.localeCompare(b.country);
    })
    .map(({ score, ...result }) => result);
};
