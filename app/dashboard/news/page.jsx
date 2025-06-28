// app/dashboard/news/page.jsx
import { Suspense } from 'react';
import NewsClientPage from './news-client';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading news...</div>}>
      <NewsClientPage />
    </Suspense>
  );
}
