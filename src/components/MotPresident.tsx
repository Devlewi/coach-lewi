import React from 'react';
import Image from 'next/image';
import SkeletonMotPresident from './skeleton/SkeletonMotPresident';


// Définir les types pour les données récupérées
type MissionVision = {
  titre: string;
  description: string;
};

type ContentData = {
    bloc_mot_du_president: {
    titre: string;
    sous_titre: string;
    image: string;
    texte_alternatif_de_limage: string;
    missions_et_visions: MissionVision;
    lien_du_bouton: string;
  };
};

// Fonction pour récupérer les données à partir de l'API
async function getMotPresident(): Promise<ContentData[]> {
  

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/acf-options`;

  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
  }); // Requête vers l'API distante

  if (!res.ok) {
    throw new Error("Failed to fetch mot du pr");
  }

  return res.json();
}



// Fonction pour transformer l'URL de l'image
function transformImageUrl(imageUrl: string): string {
  // Extraire les parties de l'URL : année, mois et nom de l'image
  const parts = imageUrl.split('/');
  const year = parts[parts.length - 3]; // L'année est l'avant-dernier élément
  const month = parts[parts.length - 2]; // Le mois est l'avant-avant-dernier élément
  const imageName = parts.pop(); // Le nom de l'image est le dernier élément
  // Construire l'URL locale pour l'image
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/${year}/${month}/${imageName}`;
}

export default async function MotPresident() {

  
  const dataMotPresident = await getMotPresident();
  //console.log(dataMotPresident);


  if (!dataMotPresident || dataMotPresident.length === 0) {
    return <SkeletonMotPresident />;
  }

  // Accédez à la clé bloc_mot_du_president à l'intérieur des données récupérées
  const contentData = dataMotPresident[0].bloc_mot_du_president;
  // Transformer l'URL de l'image pour charger depuis votre API locale
  const imageUrl = transformImageUrl(contentData.image);




  return (
    <section className="bg-case-h9 py-5">
      <div className="container">
        {/* Titre de la section */}

        <div className="title-block text-center title-pd" style={{ marginTop: "-80px", marginBottom:20 }}>
          <h3 className='diminue' style={{ fontSize: 24, color: "#021039" }}>{contentData.titre}</h3>
          <p className="sub-title" style={{lineHeight: 1.5, fontSize:15 }}>
            {contentData.sous_titre}
          </p>
          <span className="bottom-title" />
        </div>


        {/* Contenu principal */}
        <div className="row align-items-center" style={{marginTop:-25}}>
          {/* Colonne gauche : image */}
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            {/* src={contentData.image} */}
            <Image
              src={imageUrl}              
              alt={contentData.texte_alternatif_de_limage}
              className="img-responsive img-thumbnail"
              style={{ marginBottom: 20, borderColor: "#f8f8f8 !important", borderRadius:20 }}
              width={1024}
              height={683}
            />
          </div>

          {/* Colonne droite : texte */}
          <div className="col-lg-6 col-md-12">
            <div className="content-container">
              <h3 className="text-title" style={{ fontSize: 17, fontWeight: "bold", color: "#333", marginTop:0, lineHeight:1.5, marginLeft:20 }}>
              {contentData.missions_et_visions.titre}
              </h3>
          
              <div
  className="mission-description"
  style={{
    fontSize: 14, 
    color: "#555", 
    lineHeight: 1.8,
  }}
  dangerouslySetInnerHTML={{
    __html: contentData.missions_et_visions.description,
  }}
/>
          </div>


          
              <center>
                <a
                  href={contentData.lien_du_bouton}
                  className="btn btn-primary mt-3 mission-description"
                  target='_blank'
                  style={{
                    padding: "10px 20px",
                    fontSize: 14,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    backgroundColor: "#012538",
                    marginBottom:-130,
                    marginTop:-100,
                    borderRadius:7
                  }}
                >
                  Deviens Mon Elève {" "}<i className="fab fa-whatsapp" aria-hidden="true" style={{fontSize:20,fontWeight:700}}></i>
                </a>
              </center>
            </div>
          </div>
        </div>
      
    </section>
  );
};


