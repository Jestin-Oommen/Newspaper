'use client';

import React, { useEffect, useState } from 'react';

// type Article = {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   content: string;
//   category: string;
//   author: string;
//   createdAt: string;
//   link?: string; // optional
// };

export default function PoliticsNews() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchPolitics() {
      try {
        const res = await fetch('/api/articles/politics');
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Error loading politics news:', err);
      }
    }

    fetchPolitics();
  }, []);

  const politicsMain = articles[0];
  const sideItems = articles.slice(1);

  if (!politicsMain) return null; // optional: return a skeleton or loader

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold italic mb-2">Politics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main featured article */}
        <a
          href={politicsMain.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="md:col-span-2 block"
        >
          <img
            src={politicsMain.imageUrl}
            alt={politicsMain.title}
            className="w-full h-64 object-cover mb-2 rounded"
          />
          <h3 className="font-bold text-lg">{politicsMain.title}</h3>
          <p className="text-sm text-gray-500">{politicsMain.description}</p>
        </a>

        {/* Side articles */}
        <div className="space-y-4">
          {sideItems.map((item) => (
            <a
              key={item.id}
              href={item.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 hover:bg-gray-100 p-1 rounded transition"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-20 h-16 object-cover rounded"
              />
              <div>
                <h4 className="text-sm font-semibold">{item.title}</h4>
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
