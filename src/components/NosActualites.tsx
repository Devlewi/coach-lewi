import React from "react";
import Image from "next/image"; // Importation de Image si vous utilisez Next.js
import Link from "next/link";
import SkeletonLastestArticles from "./skeleton/SkeletonLastestArticles";
import { FaLaptopCode } from "react-icons/fa";
import he from "he";

// Définir les types pour les articles
type Post = {
  id: number;
  date: string; // Date de publication
  title: {
    rendered: string; // Titre de l'article
  };
  categories: number[]; // Liste des IDs de catégories
  excerpt: {
    rendered: string; // Extrait de l'article
  };
  slug: string;
  content: {
    rendered: string; // Contenu complet de l'article (description)
  };
  link: string; // Lien vers l'article complet
  featured_media: number; // ID de l'image vedette
  featured_image_url: string | null; // URL de l'image vedette
  _embedded?: {
    // Déclare _embedded comme optionnel
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

// Fonction pour récupérer les derniers articles
async function getLastPosts(): Promise<Post[]> {
  //const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/acf-options`;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/latest-posts`;

  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();

  // Créer un dictionnaire des catégories si nécessaire
  // Ici, les catégories sont déjà incluses dans la réponse, donc ce traitement est facultatif

  // Extraire les catégories et l'image vedette pour chaque article
  const postsWithCategoriesAndImages = posts.map((post: Post) => {
    const featuredImage = post.featured_image_url || null;

    return {
      id: post.id,
      date: post.date,
      title: { rendered: post.title },
      categories: post.categories, // Les catégories sont directement incluses dans l'API
      excerpt: { rendered: post.excerpt },
      content: { rendered: post.content },
      slug: post.slug,
      link: post.link,
      featured_media: post.featured_media,
      featured_image_url: featuredImage,
    };
  });

  return postsWithCategoriesAndImages;
}

function transformImageUrl(imageUrl: string | null): string {
  if (!imageUrl) {
    return "/images/default.jpg"; // Image par défaut
  }
  
  // Extraire les parties de l'URL : année, mois et nom de l'image
  const parts = imageUrl.split("/");
  const year = parts[parts.length - 3]; // L'année est l'avant-dernier élément
  const month = parts[parts.length - 2]; // Le mois est l'avant-avant-dernier élément
  const imageName = parts.pop(); // Le nom de l'image est le dernier élément
  
  // Construire l'URL locale pour l'image
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/${year}/${month}/${imageName}`;
}


export default async function NosActualites() {
  const posts = await getLastPosts();

  //console.log("posts");
  //console.log(posts);

  // Données dynamiques pour la section "Notre actualité"
  const contentData = {
    title: "Projets en Vente",
    description: "personnalisation - déploiement - maintenance",
    subtitleStyle: { fontSize: 12, lineHeight: 2 },
    titleStyle: { fontSize: 28, color: "#021039" },
    marginTop: "-150px",
  };

  return (
    <section
      className="bg-case-h9 warp-full-width services-h1-warp offer-h10-warp py-5"
      
    >
      <div className="container">
        {/* Titre de la section */}
        <br />
        <br />
        <br />
        <div
          className="title-block text-center title-pd"
          style={{ marginTop: contentData.marginTop }}
        >
          <h3 style={contentData.titleStyle}>
            <FaLaptopCode style={{ marginBottom: -5 }} /> {contentData.title}
          </h3>
          <p className="sub-title" style={contentData.subtitleStyle}>
            {he.decode(contentData.description)}
          </p>
          <span className="bottom-title" />
        </div>

        {/* Liste des cartes d'actualités */}
        {posts && posts.length > 0 ? (
          <>
            <div className="row" style={{ marginBottom: 20 }}>
              {posts.map((post, index) => (
                <div key={index}>
                  {/* style={{ backgroundColor: service.backgroundcolor }} , backgroundColor:'#021039'*/}
                  <div
  className="col-md-6 col-sm-6"
  style={{ minHeight: "500px", display: "flex" }}
>
  <div
    style={{
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
      margin: 0,
      marginBottom: 25,
      borderRadius: 10,
      backgroundColor: "white",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div className="item-offer-h10" style={{ flexGrow: 1 }}>
      <div className="iconbox-type-xs text-center">
        <Link
          href={`/articles/${post.slug}`}
          className="text-decoration-none"
          style={{ color: "#021039", fontWeight: 600 }}
        >
          <h4 className="news-title" style={{ marginTop: 20, marginBottom:10 }}>
    <Link
      href={`/articles/${post.slug}`}
      className="text-decoration-none"
      style={{ color: "#021039", fontWeight: 600 }}
    >
      {he.decode(post.title.rendered)}
    </Link>
  </h4>
 
          {/*
          <div className="news-tag">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="category-tag"
                style={{ fontWeight: 700 }}
              >
                {category}
                {index < post.categories.length - 1 && " - "}
              </span>
            ))}
          </div>
          */}

          {/* Image avec uniformisation */}
          <div
            style={{
              width: "100%",
              height: "1000px",
              overflow: "hidden",
              borderRadius: "10px 10px 0 0",
            }}
          >
           <Image
  src={transformImageUrl(post.featured_image_url)}
  className="img-fluid news-image"
  alt={post.title.rendered}
  width={570}
  height={1000}
  style={{ objectFit: "cover", objectPosition: "top", height: "1000px", width: "100%" }}
/>

          </div>
        </Link>

        <div className="news-content p-3" style={{ flexGrow: 1 }}>
   <br/>
  <p className="news-date text-muted mt-0">
    le{" "}
    {new Date(post.date).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </p>
</div>

      </div>
    </div>
  </div>
</div>

                </div>
              ))}
            </div>
          </>
        ) : (
          <SkeletonLastestArticles />
        )}

        {/* Bouton Voir Plus */}
        <div className="text-center mt-4">
          <Link
            href="/mes-publications"
            className="btn btn-primary mt-3"
            style={{
              padding: "10px 20px",
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "uppercase",
              backgroundColor: "#00a0e2",
            }}
          >
            Tout voir
          </Link>
        </div>
      </div>
    </section>
  );
}
