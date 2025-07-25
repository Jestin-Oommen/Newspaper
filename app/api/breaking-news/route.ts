import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { headline, duration } = await req.json();
  const expiresAt = new Date(Date.now() + duration * 1000);

  // Delete any existing news
  await prisma.breakingNews.deleteMany();

  // Create new breaking news
  const saved = await prisma.breakingNews.create({
    data: {
      headline,
      expiresAt,
    },
  });

  return NextResponse.json({ success: true, data: saved });
}

export async function GET() {
  const latest = await prisma.breakingNews.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  if (!latest || new Date() > latest.expiresAt) {
    return NextResponse.json({ headline: '' });
  }

  return NextResponse.json(latest);
}
