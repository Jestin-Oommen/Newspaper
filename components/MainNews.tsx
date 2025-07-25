'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Skeleton } from '../components/ui/skeleton';

type Article = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  createdAt:string;
};

export default function MainNews() {
  const [articles, setArticles] = useState<Article[] | null>(null); // null = loading

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/articles/latest');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setArticles([]); // fallback to empty state on error
      }
    }

    fetchData();
  }, []);

  const isLoading = articles === null;
  const mainHeadline = articles?.[0];
  const latestNews = articles?.slice(1, 4) || [];

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
      {/* Main Headline */}
      <div className="md:col-span-3 space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-80 rounded" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </>
        ) : mainHeadline ? (
          <>
          <Link
              href={`/news/${mainHeadline.id}`}
              className="inline-block mt-2 ml-2 font-medium hover"
            >
            <img
              src={mainHeadline.imageUrl}
              className="w-full h-80 object-cover rounded"
              alt={mainHeadline.title}
            />
            <h1 className="text-2xl font-bold mt-2">{mainHeadline.title}</h1>
            <p className="text-gray-600">{mainHeadline.description}</p>
            <p className="text-xs text-muted-foreground">
                {new Date(mainHeadline.createdAt).toLocaleDateString()}
              </p>
              </Link>

            <Link
              href={`/news/${mainHeadline.id}`}
              className="inline-block  ml-2 mt-2 text-blue-600 font-medium hover:underline"
            >
              Read More →
            </Link>
          </>
        ) : null}
      </div>

      {/* Sidebar Latest News */}
      <div className="space-y-4">
        <span className="text-2xl font-bold">Latest News</span>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="border-b pb-4 rounded p-2 space-y-2"
              >
                <Skeleton className="w-full h-24 rounded" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))
          : latestNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="block border-b pb-4 hover:bg-gray-50 rounded p-2"
              >
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <h4 className="text-sm font-semibold">{news.title}</h4>
                <p className="text-xs text-muted-foreground">
                {new Date(mainHeadline.createdAt).toLocaleDateString()}
              </p>
              </Link>
            ))}
      </div>
    </section>
  );
}
