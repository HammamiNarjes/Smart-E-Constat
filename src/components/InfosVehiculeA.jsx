import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InfosVehiculeA = () => {
  const [type, setType] = useState('');
  const [immatriculation, setImmatriculation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type || !immatriculation) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    navigate('/choix-circonstance');
  };

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
        className="p-4"
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
          borderRadius: '16px',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#003f7f', fontWeight: '700' }}>
          Véhicule - Conducteur A
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Type de véhicule :</label>
            <input
              type="text"
              className="form-control rounded-pill"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Ex : Voiture, Camion..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Numéro d'immatriculation :</label>
            <input
              type="text"
              className="form-control rounded-pill"
              value={immatriculation}
              onChange={(e) => setImmatriculation(e.target.value)}
              placeholder="Ex : 123 TU 456"
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary rounded-pill px-4"
              onClick={() => navigate('/circonstances-accident')}
            >
              Précédent
            </button>
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4"
              style={{ backgroundColor: '#003f7f', borderColor: '#003f7f' }}
            >
              Suivant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfosVehiculeA;