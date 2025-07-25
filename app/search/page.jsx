import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { parse, isValid, startOfDay, endOfDay } from 'date-fns';
export const dynamic = "force-dynamic";

// 🧠 Helper function to fetch articles by search query
async function getSearchResults(query) {
  if (!query) return [];

  const lowerQuery = query.toLowerCase();

  // Attempt to parse input like "21 June 2025" or "21 June"
  let parsedDate = parse(lowerQuery, 'dd MMMM yyyy', new Date());

  if (!isValid(parsedDate)) {
    parsedDate = parse(lowerQuery, 'dd MMMM', new Date());
  }

  const isDateQuery = isValid(parsedDate);

  return prisma.article.findMany({
    where: isDateQuery
      ? {
          createdAt: {
            gte: startOfDay(parsedDate),
            lte: endOfDay(parsedDate),
          },
        }
      : {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ],
        },
    orderBy: {
      createdAt: 'desc',
    },
  });
}


// 🔍 Search page component
export default async function SearchPage({ searchParams }) {
  const query = searchParams?.query || "";
  const articles = await getSearchResults(query);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">
        Search results for: <span className="text-primary">{query}</span>
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <Link
              key={article.id}
              href={`/news/${article.id}`}
              className="border rounded overflow-hidden hover:shadow-sm"
            >
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-3">
                <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {article.author} • {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
