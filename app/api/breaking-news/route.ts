import { NextResponse } from 'next/server';

let breakingNews = {
  headline: '',
  expiresAt: 0,
};

export async function POST(req: Request) {
  const { headline, duration } = await req.json();
  const expiresAt = Date.now() + duration * 1000;

  breakingNews = { headline, expiresAt };

  return NextResponse.json({ success: true });
}

export async function GET() {
  if (Date.now() > breakingNews.expiresAt) {
    return NextResponse.json({ headline: '' });
  }

  return NextResponse.json(breakingNews);
}
