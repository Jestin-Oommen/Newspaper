import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { category: 'politics' },
      orderBy: { createdAt: 'desc' },
      take: 6, // 1 main + 5 sides
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching politics articles:', error);
    return NextResponse.json({ message: 'Failed to fetch politics news' }, { status: 500 });
  }
}
