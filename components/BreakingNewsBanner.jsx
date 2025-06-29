'use client';

import { useEffect, useState } from 'react';

export default function BreakingNewsBanner() {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    async function fetchHeadline() {
      const res = await fetch('/api/breaking-news');
      const data = await res.json();
      setHeadline(data.headline);
    }

    fetchHeadline();
    const interval = setInterval(fetchHeadline, 10000); // refresh every 10s

    return () => clearInterval(interval);
  }, []);

  if (!headline) return null;

  return (
    <div className="fixed bottom-0 w-full bg-red-600 text-white py-2 text-center z-50 font-semibold animate-pulse">
      <marquee scrollamount="5">{headline}</marquee>
    </div>
  );
}
