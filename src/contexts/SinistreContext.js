import React, { createContext, useState } from 'react';

export const SinistreContext = createContext();

export const SinistreProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    conducteurA: { /* vos champs */ },
    vehiculeA: { /* vos champs */ },
    // ... autres sections
  });

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  return (
    <SinistreContext.Provider value={{ formData, updateFormData }}>
      {children}
    </SinistreContext.Provider>
  );
};