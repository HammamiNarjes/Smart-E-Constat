import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function CirconstancesAccident() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(SinistreContext);

  // État local initialisé avec les valeurs du contexte
  const [localForm, setLocalForm] = useState({
    date: formData.date || '',
    heure: formData.heure || '',
    lieu: formData.lieu || '',
    degats: formData.degats || false,
    blesses: formData.blesses || false,
  });

  // Validation
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(
      localForm.date !== '' &&
      localForm.heure !== '' &&
      localForm.lieu.trim() !== ''
    );
  }, [localForm]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setLocalForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setLocalForm(prev => ({
      ...prev,
      [name]: value === 'true'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert('Date, heure et lieu sont obligatoires');
      return;
    }

    try {
      // Mise à jour synchrone du contexte
      updateFormData('date', localForm.date);
      updateFormData('heure', localForm.heure);
      updateFormData('lieu', localForm.lieu);
      updateFormData('degats', localForm.degats);
      updateFormData('blesses', localForm.blesses);

      // Vérification visuelle avant navigation
      console.log('Données avant navigation:', {
        date: localForm.date,
        heure: localForm.heure,
        lieu: localForm.lieu,
        degats: localForm.degats,
        blesses: localForm.blesses
      });

      navigate('/conducteur-a');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contexte:', error);
      alert('Une erreur est survenue lors de l\'enregistrement des données');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e3f2fd, #ffffff)' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 text-primary">Circonstances de l'accident</h2>
                
                <form onSubmit={handleSubmit}>
                  {/* Champ Date */}
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label fw-semibold">
                      Date de l'accident
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      value={localForm.date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Champ Heure */}
                  <div className="mb-3">
                    <label htmlFor="heure" className="form-label fw-semibold">
                      Heure
                    </label>
                    <input
                      type="time"
                      id="heure"
                      name="heure"
                      className="form-control"
                      value={localForm.heure}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Champ Lieu */}
                  <div className="mb-3">
                    <label htmlFor="lieu" className="form-label fw-semibold">
                      Lieu exact
                    </label>
                    <input
                      type="text"
                      id="lieu"
                      name="lieu"
                      className="form-control"
                      placeholder="Adresse, ville..."
                      value={localForm.lieu}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Champ Dégâts matériels */}
                  <div className="mb-3">
                    <label htmlFor="degats" className="form-label fw-semibold">
                      Dégâts matériels ?
                    </label>
                    <select
                      id="degats"
                      name="degats"
                      className="form-select"
                      value={localForm.degats.toString()}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>

                  {/* Champ Blessés */}
                  <div className="mb-4">
                    <label htmlFor="blesses" className="form-label fw-semibold">
                      Blessés ?
                    </label>
                    <select
                      id="blesses"
                      name="blesses"
                      className="form-select"
                      value={localForm.blesses.toString()}
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>

                  {/* Boutons */}
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate(-1)}
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!isValid}
                    >
                      Suivant
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CirconstancesAccident;