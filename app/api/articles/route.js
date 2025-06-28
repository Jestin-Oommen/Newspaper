import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, content, imageUrl, author, category } = body;

    // Validate required fields
    if (!title || !description || !content || !imageUrl || !author || !category) {
      return NextResponse.json(
        { error: 'All fields including imageUrl are required.' },
        { status: 400 }
      );
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

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    console.error('❌ Error creating article:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || '';

  const articles = await prisma.article.findMany({
    where: {
      category: {
        contains: category,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(articles);
}

