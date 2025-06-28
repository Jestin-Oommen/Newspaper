import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const { id } = context.params;

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


export async function DELETE(_, { params }) {
  try {
    await prisma.article.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();

    const updated = await prisma.article.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update article:', error);
    return NextResponse.json(
      { error: 'Failed to update article' },
      { status: 500 }
    );
  }
}