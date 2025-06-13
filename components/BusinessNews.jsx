'use client';
import React, { useEffect, useState } from 'react';

// type Article = {
//   id: string;
//   title: string;
//   imageUrl: string;
//   content: string;
//   link?: string; // optional: fallback if linking to a full article page later
// };

const BusinessNews = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles/business');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Failed to load articles:', err);
      }
    }

    fetchArticles();
  }, []);

  return (
    <section className="py-10">
      <h2 className="text-xl font-bold mb-4">Business</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {articles.map((item) => (
          <a
            href={item.link || '#'}
            key={item.id}
            className="space-y-2 hover:shadow-md p-2 rounded transition"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-32 object-cover rounded"
            />
            <h4 className="text-sm font-semibold">{item.title}</h4>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BusinessNews;
