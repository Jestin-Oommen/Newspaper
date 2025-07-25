'use client';

import React, { useEffect, useState } from 'react';
import { Skeleton } from "../components/ui/skeleton";
import Image from 'next/image';

type Article = {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  createdAt:string;
  
};

const BusinessNews = () => {
  const [articles, setArticles] = useState<Article[] | null>(null); // null = loading

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles/business');
        const data = await res.json();
        setArticles(data);
        
      } catch (err) {
        console.error('Failed to load articles:', err);
        setArticles([]);
      }
    }

    fetchArticles();
  }, []);

  const isLoading = articles === null;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Business</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 p-3 bg-white border rounded">
                <Skeleton className="w-full h-32 rounded" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))
          : articles.map((article) => (
              <a
                key={article.id}
                href={`/news/${article.id}`}
                className="hover:shadow-md p-3 rounded bg-white border transition space-y-2"
              >
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h4 className="text-sm font-semibold">{article.title}</h4>
                <p className="text-xs text-muted-foreground">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
                
              </a>
            ))}
      </div>
    </section>
  );
};

export default BusinessNews;
