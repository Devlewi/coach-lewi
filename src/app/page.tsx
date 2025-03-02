import { Metadata } from "next";
import Head from "next/head";
import "animate.css";

{
  /* import ClientCarousel from "@/components/ClientCarousel"; */
}
{
  /* import BigSlider from "@/components/BigSlider"; */
}
{
  /* import NosActualites from "@/components/NosActualites"; */
}
//import NoServices from "@/components/NoServices";
//import MotPresident from "@/components/MotPresident";
import NosActualites from "@/components/NosActualites";
import BigSlider from "@/components/BigSlider";
//import ClientCarousel from "@/components/ClientCarousel";
//import BigSlider from "@/components/BigSlider";
//import ProjetsPrets from "@/components/ProjetsPrets";
{
  /*
  import MotPresident from "@/components/MotPresident";
import BigSlider from "@/components/BigSlider";
  */
}

export const metadata: Metadata = {
  title: "ACCUEIL | COACH-LEWI.COM",
  description:
    "Je vends des codes sources de projets que j&rsquo;ai moi même developpé, je vends des templates, je vous forme, je developpe votre site, vos projets !",
  icons: {
    icon: "/favicon.ico", // Icône générale pour le site
    apple: "/apple-touch-icon.png", // Icône pour les appareils Apple
    shortcut: "/apple-touch-icon.png", // Icône pour raccourci de navigateur
  },
  /*
  ,
  openGraph: {
    title: "ACCUEIL | COACH-LEWI.COM",
    description: "Je vends des codes sources de projets que j&rsquo;ai moi même developpé, je vends des templates, je vous forme, je developpe votre site, vos projets !",
    url: "https://coachlewi-frontend.vercel.app/", // URL canonique de la page d'accueil
    siteName: "Coach-lewi", // Nom du site
    images: [
      {
        url: "https://coachlewi-frontend.vercel.app/favicon.ico", // Image de prévisualisation pour Open Graph        
      },
    ],
    locale: "fr_FR", // Langue et région
    type: "website", // Type de contenu
  },
  twitter: {
    card: "summary_large_image", // Type de carte Twitter
    title: "ACCUEIL | COACH-LEWI.COM",
    description: "Je vends des codes sources de projets que j&rsquo;ai moi même developpé, je vends des templates, je vous forme, je developpe votre site, vos projets !",
    images: ["https://coachlewi-frontend.vercel.app/favicon.ico"], // Image partagée sur Twitter
  },
  manifest: "/site.webmanifest", // Fichier manifeste pour PWA
*/
};

export default function Home() {
  return (
    <div>
      <Head>
        {/* Meta tags */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <link rel="shortcut icon" href="/favicon.ico" /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>COACH-LEWI.COM</title>
      </Head>

      <BigSlider />
      {/* <MotPresident /> */}
      {/* <NoServices /> */}

      <NosActualites />

      {/**<ProjetsPrets/> */}

      {/* <ClientCarousel /> */}
    </div>
  );
}
