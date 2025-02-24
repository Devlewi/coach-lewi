"use client";
import React, { useEffect, useState } from "react";
import {FaStore } from "react-icons/fa";
import he from "he";

// Définir les types pour les données de projet
type ProjetsPrets = {
  titre: string;
  image: string;  // L'image est maintenant une chaîne de caractères (URL)
  description: string;
  lien: string;
  backgroundcolor: string;
};

type BlocProjetsPrets = {
  projets_prets_a_lemploi: {
    titre: string;
    description: string;
    projets: ProjetsPrets[];
  };
};


const ProjetsPrets = () => {
  // Définir le contenu dynamique avec les couleurs de fond et autres détails

  // Déclarez les états
  const [blocprojetData, setBlocprojetData] = useState<BlocProjetsPrets[]>([]); // Stocke les projets
  const [loading, setLoading] = useState<boolean>(true); // Indique si les données sont en cours de chargement

  function transformImageUrl(imageUrl: string): string {
    // Extraire les parties de l'URL : année, mois et nom de l'image
    const parts = imageUrl.split("/");
    const year = parts[parts.length - 3]; // L'année est l'avant-dernier élément
    const month = parts[parts.length - 2]; // Le mois est l'avant-avant-dernier élément
    const imageName = parts.pop(); // Le nom de l'image est le dernier élément
    // Construire l'URL locale pour l'image
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/images/${year}/${month}/${imageName}`;
  }

  const fetchBlocProjetData = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/acf-options`;

      // Construire l'URL complète pour les slides
      const res = await fetch(apiUrl, {
        next: { revalidate: 60 },
      }); // Requête vers l'API distante

      if (!res.ok) {
        throw new Error(`Failed to fetch projet, status: ${res.status}`);
      }

      const data = await res.json();
      setBlocprojetData(data); // Mettre à jour l'état avec les données récupérées
      setLoading(false); // Fin du chargement
      //console.log(blocprojetData);
      //console.log(projetData[0].projets_prets_a_lemploi);
      console.log("projetData[0].projets_prets_a_lemploi.image");
      //console.log(data[0].projets_prets_a_lemploi.projets);
      //console.log("projetData[0].projets_prets_a_lemploi.projets");
      //console.log(projetData[0].projets_prets_a_lemploi.projets);
      //
    } catch (error) {
      console.error(error); // Ou un log utile
    }
  };

  useEffect(() => {
    fetchBlocProjetData();
  }, []);

  return (
    <>
      {loading ? (
        <p></p>
      ) : (
        <section className="no-padding" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">

                <div
                  className="title-block text-center"
                  style={{ marginTop: 0, marginBottom: 20 }}
                >
                  <h3 style={{ fontSize: 28, color: "#021039" }}>
                    <FaStore style={{marginBottom:-5}}/> {blocprojetData[0]?.projets_prets_a_lemploi?.titre}
                  </h3>
                  <p
                    className="sub-title"
                    style={{ fontSize: 12, lineHeight: 2 }}
                  >
                    {blocprojetData[0]?.projets_prets_a_lemploi?.description}
                  </p>
                  <span className="bottom-title" />
                </div>


{/*
<div
                  className="title-block text-center"
                  style={{ marginTop: 0, marginBottom: 20 }}
                >
                  <h3 style={{ fontSize: 28, color: "#021039" }}>
                    <Faprojetstack style={{marginBottom:-5}}/> {blocprojetData[0]?.projets_prets_a_lemploi?.titre}
                  </h3>                  
                  <span className="bottom-title" />
                </div>
*/}


<br/>
                <div className="warp-full-width projets-h1-warp offer-h10-warp">
                  {/* Itérer sur contentData pour afficher chaque projet */}
                  {/* data[0].projets_prets_a_lemploi.projets */}
                  {/* 0 4px 15px rgba(0, 0, 0, 0.15) */}
                  {blocprojetData[0]?.projets_prets_a_lemploi?.projets.map(
                    (projet, index) => (
                      <div key={index}>                                                
{/* style={{ backgroundColor: projet.backgroundcolor }} , backgroundColor:'#021039'*/}
                        <div
                          className="col-md-6 col-sm-6"                                                    
                        >
                        <div style={{margin:0, marginBottom:25, borderRadius:10,backgroundColor:'white',boxShadow:"0 4px 15px rgba(0, 0, 0, 0.15)"}}>
                          <div className="item-offer-h10">
                            <div className="iconbox-type-xs text-center">
                            <h4
                                style={{
                                  fontSize: 17,
                                  marginBottom: "-1px",
                                  color: "#021039",
                                  paddingLeft:20,
                                  paddingRight:20
                                }}
                              >
                                {he.decode(projet.titre)}
                              </h4>
                              <br/>
                              {/* Vérifier s'il y a une image ou une icône rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px*/}
                              {projet.image ? (
                                <center>
                                  <img
                                    src={transformImageUrl(projet.image)} // Utilisez une image par défaut si projet.image est vide
                                    className="img img-responsive img-rounded"
                                    style={{width:"100%"}}
                                    alt={projet.titre || "ProjetsPrets image"}
                                  />
                                </center>
                              ) : (
                                <i
                                  className="fas fa-camera" // Utilisation d'une icône fixe Font Awesome
                                  style={{ fontSize: 60, color: "white" }}
                                />
                              )}

                         
          <center>

          <h4
                                style={{
                                  fontSize: 17,
                                  marginBottom: "10px",
                                  color: "#021039",
                                  paddingLeft:20,
                                  paddingRight:20
                                }}
                              >
                                {he.decode(projet.description)}
                              </h4>
          
          </center>
          <br/>          
          <a
                                  href={projet.lien}
                                  target="_blank"
            className="btn btn-primary mt-3"
            style={{
              padding: "10px 10px",
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "uppercase",
              backgroundColor: "#00a0e2",
              marginTop:-20
            }}
          >
             Voir plus
          </a> 
          <br/><br/>
                            </div>                            
                          </div>
                        </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default ProjetsPrets;