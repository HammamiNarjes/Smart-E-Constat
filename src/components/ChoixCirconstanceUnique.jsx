import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext';

const ChoixCirconstanceUnique = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useContext(SinistreContext);

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

  const handleNext = () => {
    if (formData.circSelected) {
      alert(`Circonstance choisie : ${formData.circSelected}`);
      navigate('/conducteur-b');
    } else {
      alert("Veuillez choisir une circonstance.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: 'blue' }}>Circonstances de l'accident - Conducteur A</h2>
      {circonstances.map((phrase, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`circ-${index}`}
            name="circonstance"
            value={phrase}
            checked={formData.circSelected === phrase}
            onChange={() => updateFormData('circSelected', phrase)}
          />
          <label htmlFor={`circ-${index}`}>{phrase}</label>
        </div>
      ))}
      <br />
      <div>
        <button onClick={() => navigate('/vehicule-a')} style={{ marginRight: '10px' }}>
          Précédent
        </button>
        <button onClick={handleNext}>Suivant</button>
      </div>
    </div>
  );
};

export default ChoixCirconstanceUnique;
