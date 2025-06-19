import { NextResponse } from 'next/server';

import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get('title');
    const description = formData.get('description');
    const content = formData.get('content');
    const author = formData.get('author');
    const category = formData.get('category');
    const imageFile = formData.get('image');

    // Validate image file
    if (!imageFile || typeof imageFile.name !== 'string') {
      return NextResponse.json({ error: 'Image file is required' }, { status: 400 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Ensure the uploads directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${imageFile.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Write the file to disk
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${fileName}`; // This is the public URL path

    // Store article in DB
    const article = await prisma.article.create({
      data: {
        title,
        description,
        content,
        imageUrl,
        author,
        category,
      },
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
