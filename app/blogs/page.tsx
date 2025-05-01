import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/card";
import Header from "@/components/header";
import type { Article } from "@/types/article";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Articles du Blog",
  description: "Découvrez les derniers articles de notre blog.",
};

export default async function HomePage() {
  const articles: Article[] = await getAllArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      <main>
        <h2 className="text-4xl font-bold mb-8 text-center">
          Articles du Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
}
