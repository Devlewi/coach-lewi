import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import { Metadata } from "next";
import dynamic from 'next/dynamic';

// Chargement dynamique du composant Articles avec animation skeleton
const Articles = dynamic(() => import("@/components/Articles"), {
  loading: () => <div>Chargement...</div>, // Skeleton loader
});

export const metadata: Metadata = {
  title: "Mes Formations en Ligne | Apprentissage et Développement – Coach-Lewi.com", // Titre de la page affiché dans le navigateur et pour le SEO
  description:
    "Les dernières actualités et événements de COACH-LEWI.COM. Découvrez nos nouvelles informations et mises à jour.",
  icons: {
    icon: ["/favicon.ico"], // Icône générale pour le site
    apple: ["/apple-touch-icon.png"], // Icône pour les appareils Apple
    shortcut: ["/apple-touch-icon.png"], // Icône pour les raccourcis d'écran d'accueil sur mobile
  },
  openGraph: {
    title: "ACTUALITE | COACH-LEWI.COM", // Titre de la page pour Open Graph
    description:
      "Les dernières actualités et événements de COACH-LEWI.COM. Découvrez les mises à jour et nouvelles informations.",
    url: "https://www.coach-lewi.com/formations-video", // URL canonique de la page des actualités
    siteName: "COACH-LEWI.COM", // Nom du site pour Open Graph
    images: [
      {
        url: "https://coach-lewi.com/images/favicon.png", // Image utilisée pour la prévisualisation sur les réseaux sociaux
        width: 120, // Largeur de l'image
        height: 120, // Hauteur de l'image
        alt: "Logo COACH-LEWI.COM", // Texte alternatif pour l'image
      },
    ],
    locale: "fr_FR", // Langue et région pour Open Graph
    type: "website", // Type de contenu
  },
  twitter: {
    card: "summary_large_image", // Type de carte Twitter (avec une grande image)
    title: "ACTUALITE | COACH-LEWI.COM", // Titre sur Twitter
    description:
      "Les dernières actualités et événements de COACH-LEWI.COM. Découvrez nos nouvelles informations.",
    images: ["https://coach-lewi.com/images/favicon.png"], // Image partagée sur Twitter
  },
  manifest: "/site.webmanifest", // Lien vers le manifeste pour la Progressive Web App (PWA)
};

export default function Nosactualites() {
  return (
    <div>
      {/* Header Section */}
      <HeaderPageSection title="Actualité" />

      {/* Main Content Section */}
      <section style={{ padding: "39px 0" }}>
        <div className="container">
          <SectionTitle title="Mes Formations" />
          <Articles />
        </div>
      </section>
    </div>
  );
}
