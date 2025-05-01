import type { Article } from "@/types/article";
import articlesData from "@/data/articles.json";
import { sleep } from "./utils";

export async function getAllArticles(): Promise<Article[]> {
  await sleep(300);

  return articlesData;
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  await sleep(300);

  return articlesData.find((article) => article.id === id);
}
