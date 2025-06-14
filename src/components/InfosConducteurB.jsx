import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function InfosConducteurB() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(SinistreContext);

  const [localForm, setLocalForm] = useState({
    nomB: formData.nomB || '',
    prenomB: formData.prenomB || '',
    societeB: formData.societeB || '',
    policeB: formData.policeB || '',
    permisB: formData.permisB || '',
    dateDelivranceB: formData.dateDelivranceB || '',
    declarationB: formData.declarationB || '',
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Validation : tous les champs doivent être remplis (non vides, sans espaces)
    const allFilled = Object.values(localForm).every(val => val.trim() !== '');
    setIsValid(allFilled);
  }, [localForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (typeof updateFormData === 'function') {
      // Si updateFormData attend 2 arguments (clé, valeur)
      if (updateFormData.length === 2) {
        Object.entries(localForm).forEach(([key, value]) => {
          updateFormData(key, value);
        });
      } else {
        // Sinon, on passe tout l'objet d'un coup
        updateFormData(localForm);
      }
    }

    navigate('/vehicule-b');
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '700px', fontFamily: "'Poppins', sans-serif" }}>
      <h2 className="mb-4 text-primary">Informations du Conducteur B</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="nomB" className="form-label">Nom :</label>
          <input
            type="text"
            id="nomB"
            name="nomB"
            value={localForm.nomB}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Nom du conducteur B"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="prenomB" className="form-label">Prénom :</label>
          <input
            type="text"
            id="prenomB"
            name="prenomB"
            value={localForm.prenomB}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Prénom du conducteur B"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="societeB" className="form-label">Société d'assurance :</label>
          <input
            type="text"
            id="societeB"
            name="societeB"
            value={localForm.societeB}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Société d'assurance du conducteur B"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="policeB" className="form-label">Police d'assurance :</label>
          <input
            type="text"
            id="policeB"
            name="policeB"
            value={localForm.policeB}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Numéro de police d'assurance"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="permisB" className="form-label">Numéro de permis :</label>
          <input
            type="text"
            id="permisB"
            name="permisB"
            value={localForm.permisB}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Numéro de permis"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dateDelivranceB" className="form-label">Délivré le :</label>
          <input
            type="date"
            id="dateDelivranceB"
            name="dateDelivranceB"
            value={localForm.dateDelivranceB}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="declarationB" className="form-label">Déclaration du conducteur :</label>
          <textarea
            id="declarationB"
            name="declarationB"
            value={localForm.declarationB}
            onChange={handleChange}
            rows="4"
            required
            className="form-control"
            placeholder="Décrivez ce qui s'est passé lors de l'accident"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={() => navigate('/vehicule-a')}
            className="btn btn-secondary"
          >
            Précédent
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`btn ${isValid ? 'btn-primary' : 'btn-primary disabled'}`}
          >
            Suivant
          </button>
        </div>
      </form>
    </div>
  );
}

export default InfosConducteurB;
