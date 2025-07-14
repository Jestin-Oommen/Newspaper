'use client';
import { useState } from 'react';

import { UploadButton } from "./../../../src/utils/uploadthing";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UploadEpaperPage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleUploadSuccess = async (url) => {
    const res = await fetch('/api/epaper', {
      method: 'POST',
      body: JSON.stringify({ pdfUrl: url }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setMessage('E-paper uploaded successfully!');
      router.push('/');
    } else {
      setMessage('Failed to save e-paper.');
    }
  };

  return (
    <div>
      
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
     <UploadButton
  endpoint="epaperUploader" // change this!
  onClientUploadComplete={(res) => {
    console.log("Files: ", res);
    if (res && res[0]?.url) {
      handleUploadSuccess(res[0].url);
    }
    alert("Upload Completed");
  }}
  onUploadError={(error) => {
    alert(`ERROR! ${error.message}`);
  }}
/>

    </main>
    </div>
  );
}
