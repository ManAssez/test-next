import { getAllArticles, getArticleById } from "@/lib/articles";
import { notFound } from "next/navigation";
import ArticleContent from "@/components/article";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export const metadata: Metadata = {
  title: "Article du Blog",
  description: "Découvrez les derniers articles de notre blog.",
};
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleById(params.id);

  if (!article) return notFound();

  return (
    <>
      <ArticleContent article={article} />
    </>
  );
}
