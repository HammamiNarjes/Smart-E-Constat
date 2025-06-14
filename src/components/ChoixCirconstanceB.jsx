import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext';

const ChoixCirconstanceB = () => {
  const [circSelectedB, setCircSelectedB] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(SinistreContext);

  useEffect(() => {
    console.log('Données du contexte:', formData);
  }, [formData]);

  const circonstances = [
    '1- En stationnement',
    '2- Quittait un stationnement',
    '3- Prenait un stationnement',
    "4- Sortait d'un parking, d'un lieu privé, d'un chemin de terre",
    "5- S'engageait dans un parking, un lieu privé, un chemin de terre",
    '6- Arrêt de circulation',
    '7- Frottement sans changement de file',
    "8- Heurtait de l'arrière, en roulant dans le même sens et sur une même file",
    '9- Roulait dans le même sens et sur une file différente',
    '10- Changeait de file',
    '11- Doublait',
    '12- Virait à droite',
    '13- Virait à gauche',
    '14- Reculait',
    '15- Empruntait la voie en sens inverse',
    '16- Venait de droite (dans un carrefour)',
    "17- N'a pas respecté la priorité"
  ];

  const handleSubmit = async () => {
    if (!circSelectedB) {
      setError("Veuillez choisir une circonstance.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        // Conducteur A
        nom: formData.nom || '',
        prenom: formData.prenom || '',
        permis: formData.permis || '',
        dateDelivrance: formData.dateDelivrance || '',
        type: formData.type || '',
        immatriculation: formData.immatriculation || '',
        societe: formData.societe || '',
        police: formData.police || '',
        circSelected: formData.circSelected || '',

        // Conducteur B
        nomB: formData.nomB || '',
        prenomB: formData.prenomB || '',
        permisB: formData.permisB || '',
        dateDelivranceB: formData.dateDelivranceB || '',
        typeB: formData.typeB || '',
        immatriculationB: formData.immatriculationB || '',
        societeB: formData.societeB || '',
        policeB: formData.policeB || '',
        circSelectedB: circSelectedB, 
        // Accident
        date: formData.date || '',
        heure: formData.heure || '',
        lieu: formData.lieu || '',
        degats: formData.degats || false,
        blesses: formData.blesses || false
      };

      console.log('Envoi des données:', payload);

      const response = await fetch('http://localhost:3001/api/sinistres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur lors de l\'enregistrement');
      }

      const result = await response.json();
      updateFormData({ circSelectedB });

      navigate('/croquis', {
        state: { sinistreId: result.sinistreId }
      });

    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    navigate('/vehicule-b');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{
        color: '#003f7f',
        fontWeight: '700',
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        paddingLeft: '12px',
        borderLeft: '6px solid #007BFF',
        fontFamily: "'Poppins', sans-serif",
      }}>
        Circonstances de l'accident - Conducteur B
      </h2>

      {error && (
        <div style={{
          color: 'red',
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid red',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        {circonstances.map((phrase, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="radio"
              id={`circB-${index}`}
              name="circonstanceB"
              value={phrase}
              checked={circSelectedB === phrase}
              onChange={() => setCircSelectedB(phrase)}
              disabled={isSubmitting}
              style={{ marginRight: '8px' }}
            />
            <label htmlFor={`circB-${index}`} style={{ cursor: 'pointer' }}>
              {phrase}
            </label>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button
          onClick={handlePrevious}
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Précédent
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            padding: '10px 20px',
            backgroundColor: isSubmitting ? '#cccccc' : '#003f7f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Suivant'}
        </button>
      </div>
    </div>
  );
};

export default ChoixCirconstanceB;
