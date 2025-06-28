'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsManagementPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'politics';
  const [category, setCategory] = useState(initialCategory);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/articles?category=${category}`);
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error('Failed to fetch articles', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    router.push(`/dashboard/news?category=${value}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setArticles(prev => prev.filter(article => article.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete article', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        Manage Articles - {category}
      </h1>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
        <Input
          placeholder="Filter by category"
          value={category}
          onChange={handleCategoryChange}
          className="w-full md:max-w-sm"
        />
        <div className="flex flex-col sm:flex-row gap-2 md:ml-auto">
          <Link href="/create">
            <Button className="w-full sm:w-auto">Create New</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="w-1/4 h-6" />
              <Skeleton className="w-1/4 h-6" />
              <Skeleton className="w-1/4 h-6" />
              <Skeleton className="w-1/4 h-8" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">No articles found for "{category}".</p>
      ) : (
        <div className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="max-w-[200px] truncate">
                    {article.title}
                  </TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-y-2 md:space-y-0 md:space-x-2">
                    <Link href={`/edit/${article.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
