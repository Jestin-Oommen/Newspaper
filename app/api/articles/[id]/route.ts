import { prisma } from "../../../../lib/prisma"; // adjust path as needed
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID param" }, { status: 400 });
  }

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  const similarNews = await prisma.article.findMany({
    where: {
      category: article.category,
      NOT: { id: article.id },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ article, similarNews });
}
