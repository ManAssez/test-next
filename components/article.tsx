"use client";

import { useAuth } from "@/context/auth-context";
import { ChevronLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/types/article";
import { formatDateTime } from "@/lib/utils";

export default function ArticleContent({ article }: { article: Article }) {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{article.title} | Blog Next.js</title>
        <meta name="description" content={article.description} />
      </Head>

      <main className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Retour aux articles
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-500 mb-6">
          Publié le {formatDateTime(article.createdAt)}
        </p>

        <div className="relative h-80 w-full mb-8">
          <Image
            src={article.image || "/placeholder.svg?height=400&width=600"}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1024px"
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6">{article.description}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Commentaires</h3>
          <p className="text-gray-600">
            Connecté en tant que {user?.name}. Vous pouvez laisser un
            commentaire.
          </p>
        </div>
      </main>
    </div>
  );
}
