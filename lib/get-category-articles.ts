import { prisma } from "@/lib/prisma";

export async function getCategoryArticles(slug: string) {
  const articles = await prisma.article.findMany({
    where: { category: slug },
    orderBy: { createdAt: "desc" },
  });

  return articles;
}
