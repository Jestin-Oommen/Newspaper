'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import GoogleAd from '../../../components/GoogleAd';
import { Skeleton } from '../../../components/ui/skeleton';

type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  category: string;
  author: string;
  createdAt:string;
};

export default function NewsPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [similarNews, setSimilarNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) {
          setNotFoundError(true);
          return;
        }

        const data = await res.json();
        setArticle(data.article);
        setSimilarNews(data.similarNews);
      } catch (err) {
        console.error('Error fetching article:', err);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (notFoundError) return <p className="text-center mt-10 text-red-600">Article not found.</p>;

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-64 rounded" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <div>
        <Link className='underline' href={"/"}>
          <p className="text-l text-muted-foreground">
                ⬅️Back to Home Page
              </p>
        </Link>
        <h1 className="text-3xl font-bold">{article?.title}</h1>
        <p className="text-gray-500 text-sm">
          By {article?.author || 'Unknown'} in {article?.category}  
        </p>
        <p className="text-xs text-muted-foreground">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
        {article?.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover rounded my-4"
          />
        )}
        <p className="text-lg">{article?.description}</p>
        <div className="prose max-w-none mt-4">{article?.content}</div>
      </div>

      {/* 🔗 Similar Articles Section */}
      {similarNews.length > 0 && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">
            More in {article?.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {similarNews.map((news) => (
              <Link
                href={`/news/${news.id}`}
                key={news.id}
                className="border rounded p-3 hover:shadow transition"
              >
                {news.imageUrl && (
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h4 className="font-medium">{news.title}</h4>
                <p className="text-xs text-muted-foreground">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
