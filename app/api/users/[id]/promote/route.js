import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(_, { params }) {
  const user = await prisma.user.update({
    where: { id: params.id },
    data: { role: 'admin' },
  });
  return NextResponse.json(user);
}
