import React, { createContext, useState, useCallback } from 'react';

export const SinistreContext = createContext();

export const SinistreProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Conducteur A
    nom: '',
    prenom: '',
    permis: '',
    dateDelivrance: '',
    // Véhicule A
    type: '',
    immatriculation: '',
    // Accident
    date: '',
    heure: '',
    lieu: '',
    degats: false,
    blesses: false,
    circSelected: '',
    // Assurance A
    societe: '',
    police: '',
    // Conducteur B
    nomB: '',
    prenomB: '',
    permisB: '',
    dateDelivranceB: '',
    // Véhicule B
    typeB: '',
    immatriculationB: '',
    // Assurance B
    societeB: '',
    policeB: '',
    circSelectedB: '',
  });

  // Version memoized pour éviter des recréations inutiles
  const updateFormData = useCallback((field, value) => {
    console.log(`Mise à jour du champ ${field} avec:`, value); // Log de débogage
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      console.log('Nouvel état:', newData); // Voir l'état complet après mise à jour
      return newData;
    });
  }, []);

  return (
    <SinistreContext.Provider value={{ formData, updateFormData }}>
      {children}
    </SinistreContext.Provider>
  );
};