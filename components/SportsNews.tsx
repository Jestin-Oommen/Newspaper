'use client';

import React, { useEffect, useState } from 'react';

type Article = {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  createdAt:string;
};

const SportsNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchSportsNews() {
      try {
        const res = await fetch('/api/articles/sports');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Failed to load sports news:', err);
      }
    }

    fetchSportsNews();
  }, []);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Sports</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={`/news/${article.id}`}
            className="hover:shadow-md p-3 rounded bg-white border transition"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-32 object-cover rounded mb-2"
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

export default SportsNews;
