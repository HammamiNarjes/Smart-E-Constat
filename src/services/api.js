export const saveSinistre = async (formData) => {
  try {
    // Convertir les booléens
    const degats = formData.degats === true || formData.degats === 'true';
    const blesses = formData.blesses === true || formData.blesses === 'true';

    // 1. Construction MANUELLE du payload
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
      declaration: formData.declaration || '',

      // Conducteur B - Champs SÉPARÉS
      nomB: formData.nomB || '',  // Champ individuel
      prenomB: formData.prenomB || '',  // Champ individuel
      permisB: formData.permisB || '',
      dateDelivranceB: formData.dateDelivranceB || '',
      typeB: formData.typeB || '',
      immatriculationB: formData.immatriculationB || '',
      societeB: formData.societeB || '',
      policeB: formData.policeB || '',
      circSelectedB: formData.circSelectedB || '',
      declarationB: formData.declarationB || '',

       // Accident - 
      date: formData.date || new Date().toISOString().split('T')[0], // valeur par défaut aujourd'hui
      heure: formData.heure || '12:00', // valeur par défaut
      lieu: formData.lieu || 'Non spécifié',
      degats: degats,
      blesses: blesses
    };
    
    console.log('Payload final envoyé:', JSON.stringify(payload, null, 2));

    // 3. Envoi au serveur
    const response = await fetch('http://localhost:3001/api/sinistres', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(await response.text());
    return await response.json();

  } catch (error) {
    console.error('Erreur côté client:', error);
    throw error;
  }
};