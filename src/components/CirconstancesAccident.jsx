import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSinistre } from '../services/api';
import { SinistreContext } from '../contexts/SinistreContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function CirconstancesAccident() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(SinistreContext);
  
  const [localForm, setLocalForm] = useState({
    date: formData.circonstances?.date || '',
    heure: formData.circonstances?.heure || '',
    lieu: formData.circonstances?.lieu || '',
    degats: formData.circonstances?.degats || 'non',
    blesses: formData.circonstances?.blesses || 'non', // attention au nom ici
  });

  // Validation simple : date, heure, lieu requis
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(
      localForm.date.trim() !== '' &&
      localForm.heure.trim() !== '' &&
      localForm.lieu.trim() !== ''
    );
  }, [localForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert('Date, heure et lieu sont obligatoires');
      return;
    }

    try {
      const newData = {
        ...formData,
        circonstances: {
          ...localForm,
          circonstanceA: formData.circonstances?.circonstanceA || ''
        }
      };

      updateFormData('circonstances', newData.circonstances);

      const result = await saveSinistre(newData);

      navigate(`/confirmation/${result.id}`, {
        state: { sinistreId: result.id }
      });
    } catch (error) {
      console.error('Erreur soumission:', error);
      alert(`Échec de l'enregistrement: ${error.message}`);
    }
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
      }}
    >
      <div
        className="p-5"
        style={{
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
          backdropFilter: 'blur(12px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        <h2 className="text-center mb-2" style={{ color: '#003f7f', fontWeight: '700' }}>
          Circonstances de l'accident
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="date" className="form-label fw-semibold">
              Date de l'accident
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control rounded-pill"
              value={localForm.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="heure" className="form-label fw-semibold">
              Heure
            </label>
            <input
              type="time"
              id="heure"
              name="heure"
              className="form-control rounded-pill"
              value={localForm.heure}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lieu" className="form-label fw-semibold">
              Lieu exact
            </label>
            <input
              type="text"
              id="lieu"
              name="lieu"
              className="form-control rounded-pill"
              placeholder="Adresse, ville..."
              value={localForm.lieu}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="degats" className="form-label fw-semibold">
              Dégâts matériels ?
            </label>
            <select
              id="degats"
              name="degats"
              className="form-select rounded-pill"
              value={localForm.degats}
              onChange={handleChange}
              required
            >
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="blesses" className="form-label fw-semibold">
              Blessés ?
            </label>
            <select
              id="blesses"
              name="blesses"
              className="form-select rounded-pill"
              value={localForm.blesses}
              onChange={handleChange}
              required
            >
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary rounded-pill px-4"
              onClick={() => navigate(-1)}
            >
              Retour
            </button>
            <button
              type="submit"
              className="btn px-4 rounded-pill"
              style={{
                backgroundColor: isValid ? '#003f7f' : '#aaa',
                color: 'white',
                border: 'none',
                fontWeight: 'bold',
                boxShadow: isValid ? '0 4px 10px rgba(0, 63, 127, 0.4)' : 'none',
                cursor: isValid ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease-in-out',
              }}
              disabled={!isValid}
            >
              Enregistrer et continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CirconstancesAccident;
