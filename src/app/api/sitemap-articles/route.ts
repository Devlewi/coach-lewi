// src/app/api/sitemap-articles/route.ts

import { NextResponse } from 'next/server';

type Post = {
    slug: string;
    modified: string;
  };
  
// L'URL de l'API WordPress pour récupérer les articles
const POSTS_API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/posts`;

export async function GET() {
  try {
    // Construire l'URL de l'API WordPress
    const apiUrl = `${POSTS_API_URL}?per_page=100`; // Limite de 100 articles, ajustable si besoin

    // Faire la requête vers l'API WordPress
    const response = await fetch(apiUrl);

    // Vérifier si la réponse est OK
    if (!response.ok) {
      throw new Error("Failed to fetch posts from API");
    }

    // Récupérer les articles au format JSON
    const posts = await response.json();

    // Créer les URLs pour chaque article
    const urls = posts.map((article: Post) => `
      <url>
        <loc>https://www.coach-lewi.com/articles/${article.slug}</loc>
        <lastmod>${new Date(article.modified).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `).join("");

    // Retourner le fichier XML avec toutes les URLs
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse(
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`,  // Sitemap vide en cas d'erreur
      { status: 500, headers: { "Content-Type": "application/xml" } }
    );
  }
}
