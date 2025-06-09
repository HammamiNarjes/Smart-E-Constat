import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function FinalPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const sinistreId = location.state?.sinistreId;

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '50px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ color: '#003f7f' }}>Déclaration enregistrée avec succès</h2>
      
      {sinistreId && (
        <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
          Votre numéro de déclaration: <strong>{sinistreId}</strong>
        </p>
      )}
      
      <p style={{ marginBottom: '30px' }}>
        Vous pouvez suivre l'état de votre dossier sur notre portail client.
      </p>
      
      <button 
        onClick={() => navigate("/")}
        style={{
          padding: '10px 20px',
          backgroundColor: '#003f7f',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Retour à l'accueil
      </button>
    </div>
  );
}

export default FinalPage;