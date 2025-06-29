'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BreakingNewsForm() {
  const [headline, setHeadline] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [days, setDays] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert days and minutes to total duration in seconds
    const duration = (parseInt(days) * 24 * 60 + parseInt(minutes)) * 60;

    const res = await fetch('/api/breaking-news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ headline, duration }),
    });

    if (res.ok) {
      setMessage('Breaking news saved!');
      setHeadline('');
      setMinutes(0);
      setDays(0);
    } else {
      setMessage('Failed to save.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">Set Breaking News</h2>

      {message && <p className="text-sm text-green-600">{message}</p>}

      <input
        type="text"
        placeholder="Enter headline"
        className="w-full border px-3 py-2 rounded"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        required
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Duration (Days)</label>
          <input
            type="number"
            min="0"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Duration (Minutes)</label>
          <input
            type="number"
            min="0"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Save
      </button>
      <Link href={"/"} className='pl-2 text-xl text-muted-foreground underline'>Back to Home Page</Link>
    </form>
  );
}
