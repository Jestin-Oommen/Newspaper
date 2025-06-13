'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Article = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
};

export default function MainNews() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/articles/latest');
      const data = await res.json();
      setArticles(data);
    }

    fetchData();
  }, []);

  const mainHeadline = articles[0];
  const latestNews = articles.slice(1, 4);

  if (!mainHeadline) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
      {/* Main Headline */}
      <div className="md:col-span-3 space-y-4">
        <img
          src={mainHeadline.imageUrl}
          className="w-full h-80 object-cover rounded"
          alt={mainHeadline.title}
        />
        <h1 className="text-2xl font-bold">{mainHeadline.title}</h1>
        <p className="text-gray-600">{mainHeadline.description}</p>
        <Link
          href={mainHeadline.link || '#'}
          className="inline-block mt-2 text-blue-600 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>

      {/* Sidebar Latest News */}
      <div className="space-y-4">
        {latestNews.map((news) => (
          <Link
            key={news.id}
            href={news.link || '#'}
            className="block border-b pb-4 hover:bg-gray-50 rounded p-2"
          >
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-24 object-cover rounded mb-2"
            />
            <h4 className="text-sm font-semibold">{news.title}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
