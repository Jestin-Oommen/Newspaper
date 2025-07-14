'use client';

import { useState } from 'react';
import { UploadButton } from "./../../../src/utils/uploadthing";
import { CheckCircle, XCircle, UploadCloud } from 'lucide-react'; // Optional icons

export default function UploadEpaperPage() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

  const handleUploadSuccess = async (url) => {
    const res = await fetch('/api/epaper', {
      method: 'POST',
      body: JSON.stringify({ pdfUrl: url }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setMessage('E-paper uploaded successfully!');
      setStatus('success');
    } else {
      setMessage('Failed to save e-paper.');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <div className="flex flex-col items-center gap-2 mb-6">
          <UploadCloud className="w-10 h-10 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Upload E-Newspaper</h1>
          <p className="text-sm text-gray-500">Only PDF files are accepted (max 16MB)</p>
        </div>

        <UploadButton
          endpoint="epaperUploader"
          className="uploadthing-button w-full bg-blue-600"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            if (res && res[0]?.ufsUrl) {
              handleUploadSuccess(res[0].ufsUrl);
            }
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
            setMessage('Upload failed. Try again.');
            setStatus('error');
          }}
        />

        
      </div>
    </main>
  );
}
