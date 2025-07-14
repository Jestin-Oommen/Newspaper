import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma=new PrismaClient();

export async function GET() {
  const epaper = await prisma.ePaper.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(epaper);
}
