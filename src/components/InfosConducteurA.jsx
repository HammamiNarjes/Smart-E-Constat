import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext'; // ← Import du contexte

function InfosConducteurA() {
  const navigate = useNavigate();

  const [societe, setSociete] = useState('');
  const [police, setPolice] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [permis, setPermis] = useState('');
  const [dateDelivrance, setDateDelivrance] = useState('');
  const [declaration, setDeclaration] = useState('');

  const { updateFormData } = useContext(SinistreContext); // ← Utilisation du contexte

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mettre à jour les données dans le contexte
    updateFormData('societe', societe);
    updateFormData('police', police);
    updateFormData('nom', nom);
    updateFormData('prenom', prenom);
    updateFormData('permis', permis);
    updateFormData('dateDelivrance', dateDelivrance);
    updateFormData('declaration', declaration); // Optionnel, si ce champ est utilisé dans le backend

    console.log('✅ Données envoyées au contexte :', {
      societe,
      police,
      nom,
      prenom,
      permis,
      dateDelivrance,
      declaration
    });

    navigate('/vehicule-a');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'blue' }}>Informations du Conducteur A</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Société d'assurance :</label><br />
          <input
            type="text"
            value={societe}
            onChange={(e) => setSociete(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Police d'assurance :</label><br />
          <input
            type="text"
            value={police}
            onChange={(e) => setPolice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nom :</label><br />
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Prénom :</label><br />
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Numéro de permis :</label><br />
          <input
            type="text"
            value={permis}
            onChange={(e) => setPermis(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Délivré le :</label><br />
          <input
            type="date"
            value={dateDelivrance}
            onChange={(e) => setDateDelivrance(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '15px' }}>
          <label>Déclaration du conducteur :</label><br />
          <textarea
            value={declaration}
            onChange={(e) => setDeclaration(e.target.value)}
            rows={4}
            style={{
              width: '60%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              resize: 'vertical',
              fontFamily: 'Arial, sans-serif'
            }}
            placeholder="Décrivez ce qui s'est passé lors de l'accident"
            required
          />
        </div>

        <div style={{ marginTop: '15px' }}>
          <button
            type="button"
            onClick={() => navigate('/circonstances')}
            style={{ marginRight: '10px' }}
          >
            Précédent
          </button>
          <button type="submit">Suivant</button>
        </div>
      </form>
    </div>
  );
}

export default InfosConducteurA;
