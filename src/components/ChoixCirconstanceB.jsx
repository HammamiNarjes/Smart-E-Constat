import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChoixCirconstanceB = () => {
  const [circSelected, setCircSelected] = useState('');
  const navigate = useNavigate();

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
    if (circSelected) {
      alert(`Circonstance B choisie : ${circSelected}`);
      navigate('/croquis');
    } else {
      alert("Veuillez choisir une circonstance.");
    }
  };

  const handlePrevious = () => {
    navigate('/vehicule-b');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2
        style={{
          color: '#003f7f',
          fontWeight: '700',
          fontSize: '1.8rem',
          textAlign: 'left',
          marginBottom: '1.5rem',
          paddingLeft: '12px',
          borderLeft: '6px solid #007BFF',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontFamily: "'Poppins', sans-serif",
          transition: 'color 0.3s ease',
          cursor: 'default',
          userSelect: 'none',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#0056b3')}
        onMouseLeave={e => (e.currentTarget.style.color = '#003f7f')}
      >
        Circonstances de l'accident - Conducteur B
      </h2>

      {circonstances.map((phrase, index) => (
        <div key={index} style={{ marginBottom: '8px' }}>
          <input
            type="radio"
            id={`circB-${index}`}
            name="circonstanceB"
            value={phrase}
            checked={circSelected === phrase}
            onChange={() => setCircSelected(phrase)}
          />
          <label htmlFor={`circB-${index}`} style={{ marginLeft: '8px', cursor: 'pointer' }}>
            {phrase}
          </label>
        </div>
      ))}

      <br />
      <div>
        <button onClick={handlePrevious} style={{ marginRight: '10px' }}>
          Précédent
        </button>
        <button onClick={handleNext}>Suivant</button>
      </div>
    </div>
  );
};

export default ChoixCirconstanceB;