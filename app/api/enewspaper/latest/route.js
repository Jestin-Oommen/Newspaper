import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const latest = await prisma.enews.findFirst({
    orderBy: { uploadedAt: 'desc' },
  });

  return NextResponse.json({ url: latest?.url || null });
}
