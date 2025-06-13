import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { category: 'sports' },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching sports articles:', error);
    return NextResponse.json({ message: 'Failed to fetch sports news' }, { status: 500 });
  }
}
