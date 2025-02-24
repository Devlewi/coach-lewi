// pages/videos.tsx

import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import VideosPagination from "@/components/VideosPagination";
import { Metadata } from "next";


// Metadata pour la page
export const metadata: Metadata = {
  title: "Formations Vidéo en Ligne | Apprentissage et Compétences – Coach-Lewi.com",
  description: "Explorez notre collection de formations vidéo sur Coach-Lewi.com. Apprenez de nouvelles compétences avec des cours pratiques sur des sujets variés pour booster votre développement personnel et professionnel.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
};

// Type de données pour les projets (VIDEOSData)
type VIDEOSData = {
    id: number; // Ajoutez l'id ici, si ce n'est pas déjà présent dans vos données de l'API
    title: string;
    description: string;
    image: string;
    prix: string;
    url: string; // Lien vers le FORMATIONS VIDEO
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
  
  

// Fonction pour récupérer les videos depuis l'API

async function getVIDEOS(): Promise<VIDEOSData[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/videos`;
    
    try {
      const res = await fetch(apiUrl, { cache: "no-store" });
  
      if (!res.ok) {
        throw new Error("Impossible de récupérer les données des videos.");
      }
  
      const data: ApiResponse[] = await res.json();
  
      return data.map((item) => ({
        id: item.id, // Assurez-vous d'ajouter l'id ici
        title: item.title, // Extraire le texte du titre
        description: item.content.rendered,
        image: item.featured_image_url || "/images/default.webp", // Image par défaut si manquante
        prix: item.prix ? `${item.prix} FCFA` : "Non spécifié", // Prix formaté
        url: item.url, // Lien vers le FORMATIONS VIDEO
      }));
      //console.log(data);
    } catch (error: unknown) {
      // Gérer l'erreur de manière explicite
      console.error("Erreur lors de la récupération des projets:", error);
      throw error; // Propager l'erreur pour qu'elle soit gérée dans la fonction appelante
    }
  }


// Fonction principale SSR
export default async function VideoPage() {
  try {
    // Récupérer les données des videos
    const videosData = await getVIDEOS();
    console.log("videosData=");
    console.log(videosData);
    if (!videosData || videosData.length === 0) {
      return <SkeletonHeaderPageSection />;
    }

    return (
      <div>
        <HeaderPageSection title="MES FORMATIONS" />
        <section style={{ padding: "39px 0" }}>
          <div className="container">
            <SectionTitle title={"Mes Formations Vidéos"} />
            {/* Passer les videos à notre composant Pagination */}
            <VideosPagination videosData={videosData} />
            
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur dans la page des videos:", error);
    return <SkeletonHeaderPageSection />;
  }
}
