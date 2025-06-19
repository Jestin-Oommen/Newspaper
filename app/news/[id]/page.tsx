import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import GoogleAd from "../../../components/GoogleAd";

// ✅ Fix: properly define the function with 'params' from Next.js
interface PageProps {
  params: {
    id: string;
  };
}

export default async function NewsPage({ params }: PageProps) {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
  });

  if (!article) return notFound();

  const similarNews = await prisma.article.findMany({
    where: {
      category: article.category,
      NOT: { id: article.id },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <p className="text-gray-500 text-sm">
          By {article.author || "Unknown"} in {article.category}
        </p>
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover rounded my-4"
          />
        )}
        <p className="text-lg">{article.description}</p>
        <div className="prose max-w-none mt-4">{article.content}</div>
      </div>

      {/* 🔗 Similar Articles Section */}
      {similarNews.length > 0 && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">
            More in {article.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {similarNews.map((news) => (
              <Link
                href={`/news/${news.id}`}
                key={news.id}
                className="border rounded p-3 hover:shadow transition"
              >
                {news.imageUrl && (
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h4 className="font-medium">{news.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
