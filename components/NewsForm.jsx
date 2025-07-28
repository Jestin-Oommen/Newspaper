'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewsForm() {
  
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    image: null, // File object
    author: '',
    category: 'politics',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 1. Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append('file', formData.image);
      imageData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
      imageData.append('folder', 'articles'); // optional folder

      const uploadRes = await fetch(
  `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
  {
    method: 'POST',
    body: imageData,
  }
);

const uploadResult = await uploadRes.json();
console.log('Cloudinary upload result:', uploadResult);



if (!uploadResult.secure_url) {
  throw new Error('Image upload failed');
}


      const imageUrl = uploadResult.secure_url;

      // 2. Send article data to backend
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          imageUrl,
          author: formData.author,
          category: formData.category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit article');
      }

      // 3. Reset form and notify user
      setFormData({
        title: '',
        description: '',
        content: '',
        image: null,
        author: '',
        category: 'politics',
      });

      router.refresh();
      alert('Article submitted successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Link className="underline" href="/">
          <p className="text-l text-muted-foreground">⬅️Back to Home Page</p>
        </Link>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Article</h1>

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

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full"
        />

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
          {isSubmitting ? 'Submitting...' : 'Submit Article'}
        </button>
      </form>
    </div>
  );
}
