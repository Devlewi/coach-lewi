// pages/ebooks.tsx

import HeaderPageSection from "@/components/HeaderPageSection";
import RchretiennesPagination from "@/components/RchretiennesPagination";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import { Metadata } from "next";


// Metadata pour la page
export const metadata: Metadata = {
  title: "Ressources Chrétiennes en Audio et Vidéo | Bible, Films, Témoignages – Coach-Lewi.com",
  description: "Découvrez et téléchargez des ressources chrétiennes enrichissantes : Bible en audio, films chrétiens, témoignages, dessins animés bibliques et plus encore. Édifiez votre foi avec des contenus inspirants sur Coach-Lewi.com",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
};

// Type de données pour les projets (rchretiennesData)
type RCHRETIENNESData = {
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
  

// Fonction pour récupérer les ebooks depuis l'API

async function getRCHRETIENNES(): Promise<RCHRETIENNESData[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/rchretiennes`;
    
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
export default async function EbooksPage() {
  try {
    // Récupérer les données des ebooks
    const rchretiennesData = await getRCHRETIENNES();

    if (!rchretiennesData || rchretiennesData.length === 0) {
      return <SkeletonHeaderPageSection />;
    }

    return (
      <div>
        <HeaderPageSection title="Chrétiens" />
        <section style={{ padding: "39px 0" }}>
          <div className="container">
            <SectionTitle title={"Ressources chrétiennes"} />
            {/* Passer les ebooks à notre composant Pagination */}
            <RchretiennesPagination RCHRETIENNESData={rchretiennesData} />
            
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur dans la page des ebooks:", error);
    return <SkeletonHeaderPageSection />;
  }
}
