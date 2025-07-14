'use client';
import { useState } from 'react';

export default function UploadENewspaperPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/enewspaper/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (result.success) {
      setMessage('E-Newspaper uploaded!');
      setUrl(result.url);
    } else {
      setMessage('Upload failed.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Today's E-Newspaper</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="bg-blue-600 text-white mt-2 px-4 py-2 rounded">
          Upload
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
      {url && (
        <p className="mt-2 text-blue-600 underline">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Download PDF
          </a>
        </p>
      )}
    </div>
  );
}
