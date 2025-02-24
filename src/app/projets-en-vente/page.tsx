import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import { Metadata } from "next";
import ProjetsPagination from "@/components/ProjetsPagination";

// Metadata pour la page
export const metadata: Metadata = {
  title: "Projets & Templates Modernes | Next.js, React, Animations – Coach-Lewi.com",
  description: "Découvrez des projets et templates web ultra-modernes conçus avec les dernières technologies comme Next.js et React.js. Profitez d'animations fluides, d'optimisation d'images et de performances maximales. Des solutions sur mesure pour vos besoins digitaux sur Coach-Lewi.com.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
};

// Type de données pour les projets (EBOOKSData)
type EBOOKSData = {
  id: number; // Ajoutez l'id ici, si ce n'est pas déjà présent dans vos données de l'API
  title: string;
  description: string;
  image: string;
  prix: string;
  url: string; // Lien vers le ebook
};

// Type pour la réponse de l'API (si applicable)
type ApiResponse = {
  id: number; // Assurez-vous que l'id existe dans la réponse de l'API
  title: string;
  content: { rendered: string };
  featured_image_url: string | null;
  prix: string | null;
  url: string;
};


// Fonction pour récupérer les projets depuis l'API
// Fonction pour récupérer les projets depuis l'API
async function getPROJETS(): Promise<EBOOKSData[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/projets`;
  
  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Impossible de récupérer les données des ebooks.");
    }

    const data: ApiResponse[] = await res.json();

    return data.map((item) => ({
      id: item.id, // Assurez-vous d'ajouter l'id ici
      title: item.title,
      description: item.content.rendered,
      image: item.featured_image_url || "/images/default.webp", // Image par défaut si manquante
      prix: item.prix ? `${item.prix} FCFA` : "Non spécifié", // Prix formaté
      url: item.url, // Lien vers le ebook
    }));
  } catch (error: unknown) {
    // Gérer l'erreur de manière explicite
    console.error("Erreur lors de la récupération des projets:", error);
    throw error; // Propager l'erreur pour qu'elle soit gérée dans la fonction appelante
  }
}

// Fonction principale SSR
export default async function ProjetsPage() {
  try {
    // Récupérer les données des projets
    const projetsData = await getPROJETS();

    if (!projetsData || projetsData.length === 0) {
      return <SkeletonHeaderPageSection />;
    }

    return (
      <div>
        <HeaderPageSection title="PROJETS" />
        <section style={{ padding: "39px 0" }}>
          <div className="container">
            <SectionTitle title="Projets en vente" />
            {/* Passer les projets à notre composant Pagination */}
            <ProjetsPagination projetsData={projetsData} />
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur dans la page des projets:", error);
    return <SkeletonHeaderPageSection />;
  }
}
