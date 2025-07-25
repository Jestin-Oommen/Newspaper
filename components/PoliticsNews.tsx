'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton } from '../components/ui/skeleton';
import Image from 'next/image';

type Article = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  link?: string;
};

export default function PoliticsNews() {
  const [articles, setArticles] = useState<Article[] | null>(null); // null = loading

  useEffect(() => {
    async function fetchPolitics() {
      try {
        const res = await fetch('/api/articles/politics');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Error loading politics news:', err);
        setArticles([]); // fallback to empty array on error
      }
    }

    fetchPolitics();
  }, []);

  const isLoading = articles === null;
  const politicsMain = articles?.[0];
  const sideItems = articles?.slice(1) || [];

  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold italic mb-2">Politics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main featured article or skeleton */}
        {isLoading ? (
          <div className="md:col-span-2 space-y-2">
            <Skeleton className="w-full h-64 rounded" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          politicsMain && (
            <a
              href={`/news/${politicsMain.id}`}
              rel="noopener noreferrer"
              className="md:col-span-2 block"
            >
              <Image
                src={politicsMain.imageUrl}
                alt={politicsMain.title}
                className="w-full h-64 object-cover mb-2 rounded"
              />
              <h3 className="font-bold text-lg">{politicsMain.title}</h3>
              <p className="text-sm text-gray-500">{politicsMain.description}</p>
            </a>
          )
        )}

        {/* Side articles or skeleton list */}
        <div className="space-y-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton className="w-20 h-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-3 w-3/5" />
                  </div>
                </div>
              ))
            : sideItems.map((item) => (
                <a
                  key={item.id}
                  href={`/news/${item.id}`}
                  rel="noopener noreferrer"
                  className="flex gap-2 hover:bg-gray-100 p-1 rounded transition"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="text-xs text-muted-foreground ">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
                    <p className="text-xs text-gray-500">
                      Click to read the full article.
                    </p>
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  );
}
