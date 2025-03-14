"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Bars } from "react-loader-spinner";


interface SubscriptionFormProps {
  souscriptionimage: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({  }) => {
  interface FormData {
    //person: string;
    offer: string;
    last_name: string;    
    //birth_place: string;
    //birth_date: string;
    //gender: string;
    //identity_type: string;
    //identity_number: string;
    //issued_date: string;
    //issued_by: string;
    //postal_address: string;    
    phone_number: string;
    //fax:string;
    email: string;
    locality: string;
    first_name: string;
    // Ajoutez d'autres champs si nécessaire
  }

  const [formData, setFormData] = useState<FormData>({
    //person: "",
    last_name: "",    
    //birth_place: "",
    //birth_date: "",
    //gender: "",
    //identity_type: "",
    //identity_number: "",
    //issued_date: "",
    //issued_by: "",
    //postal_address: "",
    phone_number: "",
    //fax: "",
    email: "",
    offer: "",
    locality: "",
    first_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const fieldLabels: { [key: string]: string } = {
    //person: "Type de client",
    last_name: "Nom et Prénoms",
    //birth_place: "Lieu de naissance",
    //birth_date: "Date de naissance",
    //gender: "Genre",
    //identity_type: "Type de pièce d'identité",
    //identity_number: "Numéro de pièce d'identité",
    //issued_date: "Délivré le",
    //issued_by: "par",
    //postal_address: "Votre adresse postale",
    phone_number: "Votre numéro whatsapp",
    //fax: "Fax",
    email: "Votre E-mail",
    offer: "Votre profession",
    locality: "Votre localité",
    first_name: "Expliquez vos attentes",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation des champs obligatoires
    const requiredFields: (keyof typeof formData)[] = [
      //"person",
      "last_name",
      "first_name",
      //"birth_place",
      //"birth_date",
      //"gender",
      //"identity_type",
      //"identity_number",
      //"issued_date",
      //"issued_by",
      //"postal_address",
      "phone_number",
      "locality",
      "offer",
      "email",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Tous les champs obligatoires doivent être remplis.",
      });
      return;
    }

    if (!validateFields()) return;

    setLoading(true);
    setFormDisabled(true);

    try {
      // Enregistrement dans la base
      //const apiUrl = "https://sgimali-frontend.vercel.app/api/add-subscriber";
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add-subscriber`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement.");
      }

      // Envoi de la notification par e-mail
      //const emailApiUrl = "https://sgimali-frontend.vercel.app/api/send-notif";
      const emailApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-notif`;

      const emailResponse = await fetch(emailApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          email: formData.email,
          subject: "Nouvel inscrit",
          message: "Nouvel inscrit", //Bonjour ${formData.first_name},\n\nVotre inscription a été enregistrée avec succès.\n\nCordialement.
        }),
      });

      if (!emailResponse.ok) {
        throw new Error("Erreur lors de l'envoi de l'email.");
      }

      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Enregistrement effectué avec succès !",
      });

      setFormData({
        offer: "",
        //person: "",
        last_name: "",
        first_name: "",
        //birth_place: "",
        //birth_date: "",
        //gender: "",
        //identity_type: "",
        //identity_number: "",
        //issued_date: "",
        //issued_by: "",
        //postal_address: "",
        phone_number: "",
        //fax: "",
        locality: "",
        email: "",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur inconnue est survenue.",
        });
      }
    } finally {
      setLoading(false);
      setFormDisabled(false);
    }
  };

  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{8,15}$/;

    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez entrer une adresse e-mail valide.",
      });
      return false;
    }

    if (!phoneRegex.test(formData.phone_number)) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez entrer un numéro de téléphone valide (8 à 15 chiffres).",
      });
      return false;
    }

    return true;
  };

  /*
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  

  // Fonction pour capitaliser la première lettre en minuscule sauf pour la première
  
  return (
    <div className="col-md-6" style={{ marginTop: -5 }}>


      <div className="main-page">
      <h4 style={{fontSize:20}}>Formulaire à remplir</h4>
{/*
      <Image
        src={souscriptionimage}
        alt="Faq COACH-LEWI.COM"
        width={500}
        height={300}
        style={{
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop:25,
          marginBottom:35
        }}
        priority // Optimisation du chargement
        className="img img-responsive"
      />
*/}
        <form onSubmit={handleSubmit}>
          {loading && (
            <div style={{ textAlign: "center" }}>
              <Bars
                height={50}
                width={50}
                color="#4CAF50"
                visible={true}
                ariaLabel="Loading..."
              />
            </div>
          )}

{Object.keys(formData).map((field) => (
  <div className="form-group" key={field}>
    <label htmlFor={field}>
      {fieldLabels[field]} <span className="text-danger">*</span>
    </label>
    {

        field === "offer" ? (
      <input
      type="text"
      className="form-control"
      id={field}
      name={field}
      value={formData[field as keyof FormData]}
      onChange={handleChange}
      disabled={formDisabled}
      placeholder="Saisissez ce que vous voulez"
    />  ):    
    
       field === "first_name" ? ( // Remplacement par une zone de texte
      <textarea
        className="form-control"
        id={field}
        name={field}
        value={formData[field as keyof FormData]}
        disabled={formDisabled}
        onChange={handleChange}
        placeholder="ecrire ici ..."
      />
    ) : (
      <input
        type={
          field === "phone_number"
            ? "tel"
            : field.includes("date")
            ? "date"
            : "text"
        }
        className="form-control"
        id={field}
        name={field}
        value={formData[field as keyof FormData]}
        onChange={handleChange}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          if (field === "phone_number") {
            target.value = target.value.replace(/[^0-9]/g, "");
          }
        }}
        disabled={formDisabled}
        placeholder={field === "phone_number" ? "Ex: 0123456789" : ""}
        pattern={field === "phone_number" ? "[0-9]{8,14}" : undefined}
        inputMode={field === "phone_number" ? "numeric" : undefined}
      />
    )}
  </div>
))}


          <button
            type="submit"
            className="btn-main-color"
            style={{
              borderRadius: 4,
              fontWeight: 400,
              fontSize: 15,
              padding: "7px 25px",
              float: "right",
            }}
            disabled={formDisabled}
          >
            Envoyer
          </button>
        </form>

 
      </div>
    </div>
  );
};

export default SubscriptionForm;
