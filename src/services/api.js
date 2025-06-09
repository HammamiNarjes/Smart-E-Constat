export const saveSinistre = async (formData) => {
  try {
    // Construction de l'objet complet avec valeurs par défaut
    const sinistreData = {
      conducteurA: {
        nom: formData.conducteurA?.nom || '',
        prenom: formData.conducteurA?.prenom || '',
        permis: formData.conducteurA?.permis || null,
        dateDelivrance: formData.conducteurA?.dateDelivrance || null,
        societe: formData.conducteurA?.societe || null,
        police: formData.conducteurA?.police || null
      },
      vehiculeA: {
        type: formData.vehiculeA?.type || '',
        immatriculation: formData.vehiculeA?.immatriculation || ''
      },
      conducteurB: formData.conducteurB ? {
        nom: formData.conducteurB.nom || null,
        prenom: formData.conducteurB.prenom || null,
        permis: formData.conducteurB.permis || null,
        dateDelivrance: formData.conducteurB.dateDelivrance || null,
        societe: formData.conducteurB.societe || null,
        police: formData.conducteurB.police || null
      } : null,
      vehiculeB: formData.vehiculeB ? {
        type: formData.vehiculeB.type || null,
        immatriculation: formData.vehiculeB.immatriculation || null
      } : null,
      circonstances: {
        date: formData.circonstances?.date || '',
        heure: formData.circonstances?.heure || '',
        lieu: formData.circonstances?.lieu || '',
        degats: formData.circonstances?.degats || 'non',
        blesses: formData.circonstances?.blesses || 'non',
        circonstanceA: formData.circonstances?.circonstanceA || '',
        circonstanceB: formData.circonstances?.circonstanceB || null
      },
      croquis: formData.croquis || null
    };

    console.log('Envoi des données au serveur:', sinistreData);
    const response = await fetch('http://localhost:3001/api/sinistres', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sinistreData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de la sauvegarde');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur dans saveSinistre:', {
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};