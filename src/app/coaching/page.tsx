import CoachingPagination from "@/components/CoachingPagination";
import HeaderPageSection from "@/components/HeaderPageSection";
import SectionTitle from "@/components/SectionTitle";
import SkeletonHeaderPageSection from "@/components/skeleton/SkeletonHeaderPageSection";
import { Metadata } from "next";


// Metadata pour la page
export const metadata: Metadata = {
  title: "Coaching Personnalisé | Développement Web – Coach-Lewi.com",
  description: "Inscrivez-vous dès maintenant à notre programme de coaching sur Coach-Lewi.com. Bénéficiez de conseils personnalisés pour booster votre développement personnel et professionnel et atteindre vos objectifs.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/apple-touch-icon.png",
  },
};

// Type de données pour les coaching (EBOOKSData)
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


// Fonction pour récupérer les coaching depuis l'API
// Fonction pour récupérer les coaching depuis l'API
async function getCOACHING(): Promise<EBOOKSData[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wp-json/wp/v2/coaching`;
  
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
    console.error("Erreur lors de la récupération des coaching:", error);
    throw error; // Propager l'erreur pour qu'elle soit gérée dans la fonction appelante
  }
}

// Fonction principale SSR
export default async function CoachingPage() {
  try {
    // Récupérer les données des coaching
    const coachingData = await getCOACHING();

    if (!coachingData || coachingData.length === 0) {
      return <SkeletonHeaderPageSection />;
    }

    return (
      <div>
        <HeaderPageSection title="Coaching" />
        <section style={{ padding: "39px 0" }}>
          <div className="container">
            <SectionTitle title="Coaching Projets" />
            {/* Passer les coaching à notre composant Pagination */}
            <CoachingPagination coachingData={coachingData} />
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erreur dans la page des coaching:", error);
    return <SkeletonHeaderPageSection />;
  }
}
