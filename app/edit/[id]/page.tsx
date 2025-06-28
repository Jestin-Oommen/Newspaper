'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

type FormData = {
  title: string;
  description: string;
  content: string;
  image: File | null;
  imageUrl?: string;
  author: string;
  category: string;
};

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    content: '',
    image: null,
    author: '',
    category: 'politics',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing article
  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error('Article not found');
        const { article } = await res.json();
        setFormData({
          title: article.title,
          description: article.description,
          content: article.content,
          image: null,
          imageUrl: article.imageUrl,
          author: article.author,
          category: article.category,
        });
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      }
    }
    fetchArticle();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let imageUrl = formData.imageUrl;

      // If new image uploaded, upload it first
      if (formData.image) {
        const body = new FormData();
        body.append('file', formData.image);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body,
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // Send updated data
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          imageUrl,
          author: formData.author,
          category: formData.category,
        }),
      });

      if (!res.ok) throw new Error('Failed to update article');
      router.push('/dashboard/news');
    } catch (err: any) {
      setError(err.message || 'Error updating article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Article</h1>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="w-full border rounded px-3 py-2"
        />

        <div>
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Current"
              className="w-full h-40 object-cover rounded mb-2"
            />
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="politics">Politics</option>
          <option value="business">Business</option>
          <option value="sports">Sports</option>
          <option value="travel">Travel</option>
        </select>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Updating...' : 'Update Article'}
        </button>
      </form>
    </div>
  );
}
