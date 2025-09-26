'use client';

import { useSearch } from '@/hooks/useSearch';
import { SearchInput } from '../SearchInput/SearchInput';
import { SearchResults } from '../SearchResults/SearchResults';
import styles from './SearchExperience.module.scss';

export function SearchExperience() {
  const { query, setQuery, clearQuery, results, status, error, activeQuery, isLoading } = useSearch();

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Поиск столиц стран</h1>
          <p className={styles.description}>
            Введите название страны или города, чтобы найти соответствующую столицу. Мы поддерживаем варианты
            написаний и альтернативные названия.
          </p>
          <p className={styles.note}>🌍 Пожалуйста, вводите названия стран и столиц пока что только на английском.</p>
        </section>

        <section className={styles.card}>
          <SearchInput value={query} onChange={setQuery} onClear={clearQuery} isLoading={isLoading} />

          <SearchResults
            results={results}
            status={status}
            error={error}
            query={query}
            activeQuery={activeQuery}
          />
        </section>
      </div>
    </div>
  );
}
