import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InfosConducteurB = () => {
  const [societe, setSociete] = useState('');
  const [police, setPolice] = useState('');
  const [nomPrenom, setNomPrenom] = useState('');
  const [permis, setPermis] = useState('');
  const [dateDelivrance, setDateDelivrance] = useState('');
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
          className="text-center mb-3"
          style={{ color: '#003f7f', fontWeight: '700', fontSize: '1.6rem', marginBottom: '1rem' }}
        >
          Informations du conducteur B
        </h2>

        <label className="fw-semibold" style={{ display: 'block', marginBottom: '6px' }}>
          Nom et prénom :
        </label>
        <input
          type="text"
          value={nomPrenom}
          onChange={(e) => setNomPrenom(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '16px',
            fontSize: '1rem',
          }}
        />

        <label className="fw-semibold" style={{ display: 'block', marginBottom: '6px' }}>
          Société d'assurance :
        </label>
        <input
          type="text"
          value={societe}
          onChange={(e) => setSociete(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '16px',
            fontSize: '1rem',
          }}
        />

        <label className="fw-semibold" style={{ display: 'block', marginBottom: '6px' }}>
          Police d'assurance :
        </label>
        <input
          type="text"
          value={police}
          onChange={(e) => setPolice(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '16px',
            fontSize: '1rem',
          }}
        />

        <label className="fw-semibold" style={{ display: 'block', marginBottom: '6px' }}>
          Numéro de permis :
        </label>
        <input
          type="text"
          value={permis}
          onChange={(e) => setPermis(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '16px',
            fontSize: '1rem',
          }}
        />

        <label className="fw-semibold" style={{ display: 'block', marginBottom: '6px' }}>
          Délivré le :
        </label>
        <input
          type="date"
          value={dateDelivrance}
          onChange={(e) => setDateDelivrance(e.target.value)}
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
            onClick={() => navigate('/vehicule-a')}
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
            onClick={() => navigate('/vehicule-b')}
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

export default InfosConducteurB;