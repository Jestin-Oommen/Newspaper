import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma=new PrismaClient();

export async function GET() {
  const papers = await prisma.ePaper.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(papers);
}
