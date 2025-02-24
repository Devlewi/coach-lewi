/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.coach-lewi.com',  // Ton domaine principal
  generateRobotsTxt: true,  // Génère un fichier robots.txt
  sitemapSize: 5000,        // Nombre max d'URLs par sitemap (optionnel)
  changefreq: 'daily',      // Fréquence d'update
  priority: 0.7,            // Priorité des pages
  additionalSitemaps: [
    'https://www.coach-lewi.com/api/sitemap-articles',  // URL de l'API qui génère le sitemap des articles
  ],
};
