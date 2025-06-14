import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext';

const InfosVehiculeB = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(SinistreContext);

  // État local initialisé depuis le contexte
  const [localForm, setLocalForm] = useState({
    typeB: formData.typeB || '',
    immatriculationB: formData.immatriculationB || '',
  });

  // Validation simple : champs non vides
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(
      localForm.typeB.trim() !== '' && localForm.immatriculationB.trim() !== ''
    );
  }, [localForm]);

  // Gestion changement input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    // Mise à jour individuelle des champs dans le contexte
    updateFormData('typeB', localForm.typeB);
    updateFormData('immatriculationB', localForm.immatriculationB);

    navigate('/circonstance-b');
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

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="typeB"
            style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}
          >
            Type de véhicule :
          </label>
          <input
            id="typeB"
            name="typeB"
            type="text"
            value={localForm.typeB}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '16px',
              fontSize: '1rem',
            }}
            placeholder="Ex : Voiture, Camion..."
            required
          />

          <label
            htmlFor="immatriculationB"
            style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}
          >
            Numéro d'immatriculation :
          </label>
          <input
            id="immatriculationB"
            name="immatriculationB"
            type="text"
            value={localForm.immatriculationB}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '24px',
              fontSize: '1rem',
            }}
            placeholder="Ex : 123 TU 456"
            required
          />

          <div
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <button
              type="button"
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
              type="submit"
              disabled={!isValid}
              style={{
                backgroundColor: isValid ? '#003f7f' : '#7a8ba6',
                color: 'white',
                borderRadius: '30px',
                padding: '8px 20px',
                fontWeight: 'bold',
                border: 'none',
                cursor: isValid ? 'pointer' : 'default',
              }}
            >
              Suivant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfosVehiculeB;
