import React, { useContext, useState, useEffect } from 'react'; // J'ai ajouté useState et useEffect ici
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function IdentificationConducteur() {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(SinistreContext);
  
  const [nom, setNom] = useState(formData.conducteurA.nom || '');
  const [prenom, setPrenom] = useState(formData.conducteurA.prenom || '');
  const [cin, setCIN] = useState(formData.conducteurA.permis || '');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(nom.trim() && prenom.trim() && cin.trim());
  }, [nom, prenom, cin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mise à jour du contexte
    updateFormData('conducteurA', {
      nom,
      prenom,
      permis: cin,
      // Ajoutez d'autres champs si nécessaire
    });

    navigate('/circonstances');
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
          Bienvenue dans E-Constat
        </h2>
        <h5 className="text-center mb-4" style={{ color: '#2471a3', fontWeight: '500' }}>
          Identification du conducteur
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label fw-semibold">
              Nom
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="nom"
              placeholder="Entrez votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="prenom" className="form-label fw-semibold">
              Prénom
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="prenom"
              placeholder="Entrez votre prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cin" className="form-label fw-semibold">
              Numéro de permis
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="cin"
              placeholder="Entrez votre numéro de permis"
              value={cin}
              onChange={(e) => setCIN(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 py-2"
            style={{
              backgroundColor: isValid ? '#003f7f' : '#aaa',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              transition: 'all 0.3s ease-in-out',
              fontWeight: 'bold',
              boxShadow: isValid ? '0 4px 10px rgba(0, 63, 127, 0.4)' : 'none',
              cursor: isValid ? 'pointer' : 'not-allowed',
            }}
            disabled={!isValid}
          >
            Suivant
          </button>
        </form>
      </div>
    </div>
  );
}

export default IdentificationConducteur;