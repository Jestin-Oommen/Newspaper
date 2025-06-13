import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, content, imageUrl, author, category } = body;

    if (!title || !description || !content || !imageUrl || !author || !category) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

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

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
