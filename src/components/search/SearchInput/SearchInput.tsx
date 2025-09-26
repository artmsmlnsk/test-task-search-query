'use client';

import { ChangeEvent } from 'react';

import styles from './SearchInput.module.scss';

type SearchInputProps = {
  value: string;
  placeholder?: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function SearchInput({
  value,
  placeholder = 'Введите страну или столицу',
  isLoading = false,
  onChange,
  onClear
}: SearchInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} />
      <input
        className={styles.field}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        type="search"
      />
      {value ? (
        <button type="button" className={styles.clearButton} onClick={onClear} aria-label="Очистить запрос">
          <ClearIcon />
        </button>
      ) : null}
      {isLoading ? <span className={styles.spinner} aria-hidden /> : null}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden
      viewBox="0 0 24 24"
      width="20"
      height="20"
      focusable="false"
    >
      <path
        d="M15.5 14h-.79l-.28-.27a6 6 0 1 0-.71.71l.27.28v.79l4.5 4.5 1.5-1.5-4.5-4.5zm-5.5 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" focusable="false">
      <path
        d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4l-6.3 6.3-1.41-1.42L9.17 12 2.88 5.71l1.41-1.42L10.59 10.6l6.29-6.31z"
        fill="currentColor"
      />
    </svg>
  );
}
