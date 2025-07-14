import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { prisma } from '@/lib/prisma'; // make sure this is correct

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadResult = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        public_id: 'enewspaper/today-paper',
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    Readable.from(buffer).pipe(uploadStream);
  });

  // Clear old entries
  await prisma.enews.deleteMany({});

  // Save the latest PDF URL
  const saved = await prisma.enews.create({
    data: {
      url: uploadResult.secure_url,
    },
  });

  return NextResponse.json({ success: true, url: saved.url });
}
