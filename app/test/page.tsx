'use client';

import { useSearch } from '@/hooks/useSearch';

export default function TestSearchPage() {
  const { query, setQuery, clearQuery, results, status, error, activeQuery } = useSearch();

  return (
    <main>
      <h1>Тестовый поиск</h1>

      <div>
        <input
          type="text"
          placeholder="Введите страну или столицу"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="button" onClick={clearQuery}>
          Очистить
        </button>
      </div>

      <div>
        <div>Статус: {status}</div>
        {activeQuery ? <div>Активный запрос: {activeQuery}</div> : null}
        {error ? <div>Ошибка: {error}</div> : null}
        <div>Найдено: {results.length}</div>
      </div>

      <ul>
        {results.map((result) => (
          <li key={result.id}>
            {result.country} — {result.capital} ({result.matches.join(', ')})
          </li>
        ))}
      </ul>
    </main>
  );
}
