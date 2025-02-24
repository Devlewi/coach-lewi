// pages/ebooks.tsx

import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import { Metadata } from "next";
import EbooksPagination from "@/components/EbooksPagination";  // Importer le composant Pagination

// Metadata pour la page
export const metadata: Metadata = {
  title: "eBooks Informatique | Tutoriels, Travaux Pratiques & Partage d'Expériences – Coach-Lewi.com",
  description: "Découvrez mes eBooks sur Coach-Lewi.com, où je partage des tutoriels écrits, des travaux pratiques et mes expériences en informatique. Apprenez les meilleures techniques en développement web, programmation, et bien plus grâce à des ressources détaillées et accessibles.",
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
  

// Fonction pour récupérer les ebooks depuis l'API

async function getEBOOKS(): Promise<EBOOKSData[]> {
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/ebooks`;
    
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
    const ebooksData = await getEBOOKS();

    if (!ebooksData || ebooksData.length === 0) {
      return <SkeletonHeaderPageSection />;
    }

    return (
      <div>
        <HeaderPageSection title="MES EBOOKS" />
        <section style={{ padding: "39px 0" }}>
          <div className="container">
            <SectionTitle title={"Partage d'expérience"} />
            {/* Passer les ebooks à notre composant Pagination */}
            <EbooksPagination ebooksData={ebooksData} />
            
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur dans la page des ebooks:", error);
    return <SkeletonHeaderPageSection />;
  }
}
