import Link from 'next/link';

const Copyright = () => {
  const currentYear = new Date().getFullYear(); // Récupère l'année actuelle

  return (
    <>
<div className="copyright-warp cr-1 d-flex flex-wrap justify-content-between align-items-center">
  {/* Section Copyright */}
  
  <div className="copyright-text-left"
    style={{
      color: "white",
      fontWeight: 600,
      marginTop: "0px",
      textAlign: "center",
    }}>
    <p style={{ marginBottom: -20, listStyle: "none", padding: 0 }}>

        <Link
          style={{
            color: "white",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
          }}
          href="/"
        >
          Copyright © 2024 - {currentYear}
          {/*
          {new Date().getFullYear() !== 2024 && ` - ${new Date().getFullYear()}`}{" "}
          */}
          &nbsp;
          coach-lewi.com tous droits réservés
        </Link>

    </p>
  </div>

  {/* Section Développé par */}
  <div
    className="copyright-text"
    style={{
      color: "white",
      fontWeight: 600,
      marginTop: "0px",
      textAlign: "center",
    }}
  >
    <p
      style={{
        color: "white",
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 0,
      }}
    >
    &nbsp;
    &nbsp;

    {/*
      <span style={{ color: "white", fontWeight: 600 }}>
        Développé par &nbsp;
        <a
          target="_blank"
          href="#"
          style={{ textDecoration: "none", color:"#011b39", fontWeight:"bolder" }}
        >
        léwi jean-marc Essoh (Wordpress - Next JS)
        </a>
      </span>
    */}
    </p>
  </div>
</div>


    </>
  );
};

export default Copyright;
