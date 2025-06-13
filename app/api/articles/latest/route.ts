import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4, // 1 main + 3 latest
    });

    return NextResponse.json(articles);
  } catch (err) {
    console.error('Error fetching latest news:', err);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
