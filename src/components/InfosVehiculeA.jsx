import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext';

const InfosVehiculeA = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(SinistreContext);

  // Initialiser local state avec valeurs du contexte ou vide
  const [localForm, setLocalForm] = useState({
    type: formData.type || '',
    immatriculation: formData.immatriculation || '',
  });

  // Validation : champs requis
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(localForm.type.trim() !== '' && localForm.immatriculation.trim() !== '');
  }, [localForm]);

  // Mise à jour du formulaire local
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm(prev => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    // Mise à jour individuelle des champs dans le contexte
    updateFormData('type', localForm.type);
    updateFormData('immatriculation', localForm.immatriculation);

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
              name="type"
              className="form-control rounded-pill"
              value={localForm.type}
              onChange={handleChange}
              placeholder="Ex : Voiture, Camion..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Numéro d'immatriculation :</label>
            <input
              type="text"
              name="immatriculation"
              className="form-control rounded-pill"
              value={localForm.immatriculation}
              onChange={handleChange}
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
              disabled={!isValid}
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
