// components/EbooksPagination.tsx
"use client"
import React, { useState } from "react";
import { EBOOKSData } from "../types"; // ou ../src/types si le fichier est dans un sous-dossier
import { FaWhatsapp } from "react-icons/fa";
import he from "he";

type EbooksPaginationProps = {
  ebooksData: EBOOKSData[];
};

const EbooksPagination: React.FC<EbooksPaginationProps> = ({ ebooksData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ebooksPerPage = 6;

  // Calculer l'index des ebooks à afficher en fonction de la page courante
  const indexOfLastEbook = currentPage * ebooksPerPage;
  const indexOfFirstEbook = indexOfLastEbook - ebooksPerPage;
  const currentEbooks = ebooksData.slice(indexOfFirstEbook, indexOfLastEbook);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(ebooksData.length / ebooksPerPage);

  // Gérer le changement de page
  const handlePageChange = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="row">
      
      <div className="warp-full-width services-h1-warp offer-h10-warp">
        
      {currentEbooks.map((ebook, index) => (                 
              <div key={index} className="col-md-4 mb-4">
                  <div className="main-page"style={{boxShadow:"0 4px 15px rgba(0, 0, 0, 0.15)", margin:10, marginBottom:25, borderRadius:10,backgroundColor:'white'}}>
                      <div className="item-offer-h10">
                          <div className="iconbox-type-xs text-center">
                          <center>
                          
                          <div
                  style={{
                    marginBottom: "0px", 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    color: "#333"
                  }}
                >
                  {he.decode(ebook.title)}
                </div>
                <br/>
                <img
                  src={ebook.image}
                  alt="ebook en vente"
                  className="img-responsive"
                  style={{
                    borderRadius: "8px",
                  }}
                  width={325}
                  height={398}
                />
                
                <div
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                    Prix : {parseFloat(ebook.prix).toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
                </div>
                <div
  className="boutique-description"
  style={{
    fontSize: 10, 
    color: "#555", 
    lineHeight: 1.8,
  }}
  dangerouslySetInnerHTML={{
    __html: ebook.description,
  }}
/>
                <div style={{ marginTop: "10px" }}>
                <a
  href={`https://api.whatsapp.com/send?phone=2250565110441&text=${encodeURIComponent(
    `Bonjour, je suis intéressé par cet article : ${he.decode(ebook.title)}.
    Prix : ${parseFloat(ebook.prix).toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
    Image : ${ebook.image}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
  style={{ marginBottom: 30, backgroundColor: "#45a756", fontWeight: 700, width: "70%" }}
>
  Acheter <FaWhatsapp style={{ marginBottom: -3 }} />
</a>
                </div>
              </center>
                          </div>
                      </div>              
                  </div>
              </div>
        ))}    
      </div>
        
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

export default EbooksPagination;
