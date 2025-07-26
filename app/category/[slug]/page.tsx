import { getCategoryArticles } from "@/lib/get-category-articles";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { slug } = params;
  const articles = await getCategoryArticles(slug);

  if (!articles.length) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-gray-500">
        No articles found in <strong>{slug}</strong> category.
      </div>
    );
  }

  const featured = articles[0];
  const recent = articles.slice(1, 5);
  const grid = articles.slice(5, 9);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Featured Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Recent News */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-bold text-xl border-b pb-2">Recent News</h2>
          {recent.map((article) => (
            <div key={article.id}>
              <Link href={`/news/${article.id}`} className="font-medium block">
                {article.title}
              </Link>
              <p className="text-xs text-muted-foreground">{article.author}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Main Featured */}
        
        <div className="lg:col-span-2 border rounded-lg overflow-hidden shadow-sm">
          {featured.imageUrl && (
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              width={800}
              height={400}
              className="w-full h-64 object-cover"
              unoptimized // optional: remove if you configure domains in next.config.js
            />
          )}
          <div className="p-4">
            <Link href={`/news/${featured.id}`}>
            <h1 className="text-2xl font-bold">{featured.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{featured.description}</p>
            <div className="text-xs mt-2 flex justify-between text-gray-500">
              <span>By {featured.author}</span>
              <span>{new Date(featured.createdAt).toLocaleDateString()}</span>
            </div>
            </Link>
          </div>
        </div>
        

        {/* Side Highlight */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-bold text-xl border-b pb-2 capitalize">{slug} Highlights</h2>
          {articles.slice(1, 3).map((article) => (
            <div key={article.id}>
              <Link href={`/news/${article.id}`}>
                <div className="font-semibold leading-tight">{article.title}</div>
                <p className="text-xs text-muted-foreground">{article.description?.slice(0, 60)}...</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Category Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4 uppercase">{slug}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {grid.map((article) => (
            <Link key={article.id} href={`/news/${article.id}`} className="border rounded-lg overflow-hidden">
              {article.imageUrl && (
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                  unoptimized // optional
                />
              )}
              <div className="p-3">
                <h3 className="font-medium">{article.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
