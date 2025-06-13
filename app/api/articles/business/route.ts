import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: { category: 'business' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching business articles:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
