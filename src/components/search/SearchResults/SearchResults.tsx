'use client';

import type { SearchStatus } from '@/hooks/useSearch';
import type { SearchResult } from '@/lib/search';

import styles from './SearchResults.module.scss';

type SearchResultsProps = {
  results: SearchResult[];
  status: SearchStatus;
  error: string | null;
  query: string;
  activeQuery: string;
};

const MATCH_LABEL: Record<SearchResult['matches'][number], string> = {
  country: 'Страна',
  capital: 'Столица',
  altName: 'Доп. название'
};

const renderPlaceholder = (params: { title: string; text: string }) => (
  <div className={styles.placeholder}>
    <div className={styles.placeholderTitle}>{params.title}</div>
    <div className={styles.placeholderText}>{params.text}</div>
  </div>
);

const Skeleton = () => (
  <div className={styles.skeletonList} aria-hidden>
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className={styles.skeletonItem} />
    ))}
  </div>
);

export function SearchResults({ results, status, error, query, activeQuery }: SearchResultsProps) {
  return (
    <section className={styles.root} aria-live="polite">
      <header className={styles.header}>
        <h2 className={styles.title}>Результаты</h2>
        <span className={styles.meta}>
          {status === 'loading' && activeQuery
            ? `Ищем: “${activeQuery}”`
            : `Найдено: ${results.length}`}
        </span>
      </header>

      {status === 'loading' && <Skeleton />}

      {status === 'error' && error
        ? renderPlaceholder({
            title: 'Что-то пошло не так',
            text: error
          })
        : null}

      {status === 'idle' && !query
        ? renderPlaceholder({
            title: 'Начните с запроса',
            text: 'Введите название страны или столицы, чтобы увидеть совпадения.'
          })
        : null}

      {status === 'success' && !results.length
        ? renderPlaceholder({
            title: 'Совпадений нет',
            text: `Не удалось найти результаты по запросу “${query}”. Попробуйте изменить формулировку.`
          })
        : null}

      {results.length > 0 && status !== 'loading' ? (
        <ul className={styles.list}>
          {results.map((result) => (
            <li key={result.id} className={styles.item}>
              <span className={styles.country}>{result.country}</span>
              <span className={styles.capital}>{result.capital}</span>
              <span className={styles.badges}>
                {result.matches.map((match) => (
                  <span key={match} className={styles.badge}>
                    {MATCH_LABEL[match]}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
