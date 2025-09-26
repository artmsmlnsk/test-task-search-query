import { Suspense } from 'react';

import { SearchExperience } from '@/components/search';

export default function Home() {
  return (
    <Suspense fallback={<Fallback />}>
      <SearchExperience />
    </Suspense>
  );
}

function Fallback() {
  return <div style={{ padding: '2rem' }}>Загрузка поиска…</div>;
}
