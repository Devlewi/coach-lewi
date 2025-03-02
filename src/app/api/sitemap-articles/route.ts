import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Post = {
  slug: string;
  modified: string;
};

// Définition de l'URL correcte de l'API WordPress
const POSTS_API_URL = "https://admin.coach-lewi.com/wp-json/wp/v2/posts";

export async function GET() {
  try {
    // Vérification de l'URL
    if (!POSTS_API_URL) {
      throw new Error("L'URL de l'API WordPress est introuvable.");
    }

    // Récupération des articles via l'API WordPress
    const response = await fetch(`${POSTS_API_URL}?per_page=100`, {
      next: { revalidate: 3600 }, // Cache pendant 1 heure
    });

    // Vérification de la réponse API
    if (!response.ok) {
      throw new Error(`Erreur API WordPress: ${response.statusText}`);
    }

    // Récupération des données JSON
    const posts = await response.json();

    // Vérification du format des articles
    if (!Array.isArray(posts) || posts.length === 0) {
      throw new Error("Aucun article trouvé.");
    }

    // Génération des URLs pour le sitemap
    const sitemapEntries = posts
      .map((article) => {
        if (!article.slug || !article.modified) return "";
        return `
        <url>
          <loc>https://www.coach-lewi.com/articles/${article.slug}</loc>
          <lastmod>${new Date(article.modified).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>`;
      })
      .join("");

    // Création du fichier XML du sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapEntries}
      </urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du sitemap:", error);
    return new NextResponse(
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`, // Sitemap vide en cas d'erreur
      { status: 500, headers: { "Content-Type": "application/xml" } }
    );
  }
}
