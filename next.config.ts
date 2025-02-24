/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Active le mode strict de React pour la détection de bugs en développement
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
        pathname: '/wp-content/uploads/**', // Autorise les images depuis localhost
      },
      {
        protocol: 'https',
        hostname: 'admin.coach-lewi.com', // Ajoute ce domaine
        pathname: '/wp-content/uploads/**', // Autorise les images depuis ce chemin spécifique
      },
    ],
    domains: ['admin.coach-lewi.com', 'localhost', 'www.coach-lewi.com'], // Ajoutez localhost ici
    // 'coachlewi-frontend.vercel.app'
    //domains: ['admin.coach-lewi.com', 'localhost','coachlewi-frontend.vercel.app','coach-lewi.com','www.coach-lewi.com'], // Ajoutez localhost ici
  },
  // D'autres configurations possibles si nécessaire
  async rewrites() {
    return [
      {
        source: '/api/images/:path*', // Toutes les requêtes qui commencent par '/api/images/'
        destination: 'https://admin.coach-lewi.com/wp-content/uploads/:path*', // Destination vers le serveur WordPress
      },
    ];
  },
};

module.exports = nextConfig;
