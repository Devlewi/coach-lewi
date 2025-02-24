// components/ProjetsPagination.tsx
"use client"
import React, { useState } from "react";
import { PROJETSData } from "../types"; // ou ../src/types si le fichier est dans un sous-dossier
import { FaWhatsapp } from "react-icons/fa";
import he from "he";
import Link from "next/link";

type CoachingPaginationProps = {
  coachingData: PROJETSData[];
};

const CoachingPagination: React.FC<CoachingPaginationProps> = ({ coachingData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const coachingPerPage = 10;

  // Calculer l'index des projets à afficher en fonction de la page courante
  const indexOfLastProjet = currentPage * coachingPerPage;
  const indexOfFirstProjet = indexOfLastProjet - coachingPerPage;
  const currentProjets = coachingData.slice(indexOfFirstProjet, indexOfLastProjet);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(coachingData.length / coachingPerPage);

  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="row g-0"> {/* Utilise g-0 pour supprimer complètement */}
  {currentProjets.map((projet, index) => (
    <div key={index} className="col-md-6" style={{marginBottom:10}}>
      <div
        className="main-page"
        style={{
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
          borderRadius: 10,
          backgroundColor: "white",
        }}
      >
        <div className="item-offer-h10">
          <div className="iconbox-type-xs text-center">
          <center>
          <h4
                                style={{
                                  fontSize: 17,
                                  marginBottom: "-1px",
                                  color: "#021039",
                                  paddingLeft:20,
                                  paddingRight:20
                                }}
                              >
                                {he.decode(projet.title)}
                              </h4>
                <br/>
                <img
                  src={projet.image}
                  alt="projet en vente"
                  className="img-responsive"
                  style={{
                    borderRadius: "8px",
                  }}
                  width={"100%"}
                  height={"100%"}
                />

<div
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                    Prix : {parseFloat(projet.prix).toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}

                </div>

                <div                
  style={{
    fontSize: 27,
    marginBottom: "10px",
    color: "#021039",
    paddingLeft: 20,
    paddingRight: 20,
  }}
  dangerouslySetInnerHTML={{ __html: he.decode(projet.description) }}
/>




<div style={{marginTop:-5, fontWeight:800}}>
Durée : {projet.url && <Link target="_blank" href={projet.url} style={{color:"blue", marginBottom:10,fontWeight:800}}>{projet.url}</Link>}
</div>

                
                <div style={{ marginTop: 15 }}>
                <a
  href={`https://api.whatsapp.com/send?phone=2250565110441&text=${encodeURIComponent(
    `Bonjour, je suis intéressé par cette formation : **${he.decode(projet.title)}**.
Prix : ${parseFloat(projet.prix).toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}, trouvée sur https://coach-lewi.com/coaching`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
  style={{ marginBottom: 30, backgroundColor: "#45a756", fontWeight: 700, width: "70%" }}
>
  S&apos;inscrire <FaWhatsapp style={{ marginBottom: -3 }} />
</a>

                </div>
              </center>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


            {/* Pagination */}
            <div
        className="pagination-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
      <button
  className="previous"
  onClick={() => handlePageChange(currentPage - 1)}
  disabled={currentPage <= 1}
  style={{
    padding: "10px 20px",
    borderRadius: "15px",
    backgroundColor: currentPage <= 1 ? "#ddd" : "#049fe2", // Couleur de fond bleu clair ou gris
    color: currentPage <= 1 ? "#000" : "white", // Couleur du texte en fonction de l'état
    cursor: currentPage <= 1 ? "not-allowed" : "pointer", // Curseur désactivé pour la page précédente
    border:"0px solid gray",
    boxShadow:"0 4px 15px rgba(0, 0, 0, 0.15)",
    fontWeight:700
  }}
>
  Préc
</button>

{[...Array(totalPages)].map((_, index) => (
  <button
    key={index}
    className="page"
    onClick={() => handlePageChange(index + 1)}
    style={{
      padding: "10px 20px",
      borderRadius: "15px",
      backgroundColor: currentPage === index + 1 ? "#049fe2" : "#f1f1f1", // Bleu clair pour la page active, gris pour les autres
      color: currentPage === index + 1 ? "white" : "#049fe2", // Texte bleu pour les pages non actives
      fontWeight: currentPage === index + 1 ? "bold" : "normal",
      border:"0px solid gray",
      boxShadow:"1px 0px 0px 1px rgba(0, 0, 0, 0.15)",
    }}
  >
    {index + 1}
  </button>
))}

        <button
          className="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{
            padding: "10px 20px",
            borderRadius: "15px",
            backgroundColor: currentPage >= totalPages ? "#ddd" : "#049fe2", // Bleu clair quand actif, gris quand désactivé
            color: currentPage >= totalPages ? "#888" : "white", // Couleur du texte en fonction de l'état
            border:"0px solid gray",
            boxShadow:"1px 0px 0px 1px rgba(0, 0, 0, 0.15)",
          }}
        >
          Suiv
        </button>
      </div>
    </div>
  );
};

export default CoachingPagination;
