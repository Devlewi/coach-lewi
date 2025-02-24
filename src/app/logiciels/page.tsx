// pages/logiciels.tsx

import HeaderPageSection from "@/components/HeaderPageSection";
import LogicielsPagination from "@/components/LogicielsPagination";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import { Metadata } from "next";


// Metadata pour la page
export const metadata: Metadata = {
  title: "Logiciels Professionnels | Packs et Solutions – Coach-Lewi.com",
  description: "Découvrez nos packs de logiciels innovants sur Coach-Lewi.com : des solutions sur mesure pour améliorer votre productivité et répondre à vos besoins professionnels",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
};

// Type de données pour les projets (LOGICIELSData)
type LOGICIELSData = {
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
  

// Fonction pour récupérer les logiciels depuis l'API

async function getLOGICIELS(): Promise<LOGICIELSData[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/logiciels`;
    
    try {
      const res = await fetch(apiUrl, { cache: "no-store" });
  
      if (!res.ok) {
        throw new Error("Impossible de récupérer les données des logiciels.");
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
export default async function LogicielsPage() {
  try {
    // Récupérer les données des logiciels
    const logicielsData = await getLOGICIELS();

    if (!logicielsData || logicielsData.length === 0) {
      return <SkeletonHeaderPageSection />;
    }

    return (
      <div>
        <HeaderPageSection title="PACK LOGICIELS" />
        <section style={{ padding: "39px 0" }}>
          <div className="container">
            <SectionTitle title={"Pack Logiciels"} />
            {/* Passer les logiciels à notre composant Pagination */}
            <LogicielsPagination logicielsData={logicielsData} />
            
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur dans la page des logiciels:", error);
    return <SkeletonHeaderPageSection />;
  }
}
