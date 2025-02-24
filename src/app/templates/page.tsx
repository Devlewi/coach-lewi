// pages/psd.tsx

import HeaderPageSection from "@/components/HeaderPageSection";
import PsdPagination from "@/components/PsdPagination";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import { Metadata } from "next";


// Metadata pour la page
export const metadata: Metadata = {
  title: "Mes Templates | Made By – Coach-Lewi.com",
  description: "Templates performants , de qualité NEXT JS , TAILWIND CSS, BOOTSTRAP etc etc.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
};

// Type de données pour les projets (PSDData)
type PSDData = {
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
  

// Fonction pour récupérer les psd depuis l'API

async function getPSD(): Promise<PSDData[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/psd`;
    
    try {
      const res = await fetch(apiUrl, { cache: "no-store" });
  
      if (!res.ok) {
        throw new Error("Impossible de récupérer les données des psd.");
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
export default async function PsdPage() {
  try {
    // Récupérer les données des psd
    const psdData = await getPSD();

    if (!psdData || psdData.length === 0) {
      return <SkeletonHeaderPageSection />;
    }

    return (
      <div>
        <HeaderPageSection title="Mes Templates (Responsive)" />
        <section style={{ padding: "39px 0" }}>
          <div className="container">
            <SectionTitle title={"Templates en vente"} />
            {/* Passer les psd à notre composant Pagination */}
            <PsdPagination psdData={psdData} />
            
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur dans la page des psd:", error);
    return <SkeletonHeaderPageSection />;
  }
}
