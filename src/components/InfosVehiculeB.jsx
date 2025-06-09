import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InfosVehiculeB = () => {
  const [type, setType] = useState('');
  const [immatriculation, setImmatriculation] = useState('');
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Poppins', sans-serif",
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
          backdropFilter: 'blur(8px)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          padding: '30px',
        }}
      >
        <h2
          style={{
            color: '#003f7f',
            fontWeight: '700',
            fontSize: '1.6rem',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Informations du véhicule - Conducteur B
        </h2>

        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
          Type de véhicule :
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '16px',
            fontSize: '1rem',
          }}
        />

        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
          Numéro d'immatriculation :
        </label>
        <input
          type="text"
          value={immatriculation}
          onChange={(e) => setImmatriculation(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '24px',
            fontSize: '1rem',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/conducteur-b')}
            style={{
              backgroundColor: '#aaa',
              color: 'white',
              borderRadius: '30px',
              padding: '8px 20px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Précédent
          </button>
          <button
            onClick={() => navigate('/circonstance-b')}
            style={{
              backgroundColor: '#003f7f',
              color: 'white',
              borderRadius: '30px',
              padding: '8px 20px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfosVehiculeB;