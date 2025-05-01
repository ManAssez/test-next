import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/article";
import { formatDateTime } from "@/lib/utils";

type Props = {
  article: Article;
};

export default function ArticleCard({ article }: Props) {
  return (
    <Link href={`/article/${article.id}`} className="block">
      <article className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={article.image || "/placeholder.svg?height=400&width=600"}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
          <p className="text-gray-600 mb-2">{article.description}</p>
          <p className="text-sm text-gray-500">
            {formatDateTime(article.createdAt)}
          </p>
        </div>
      </article>
    </Link>
  );
}
