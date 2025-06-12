const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'E_constat',
  password: 'narjes',
  port: 5432,
});

// Middleware de log amélioré
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (req.body) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Body keys:', Object.keys(req.body));
  }
  next();
});


// Test de connexion
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connecté à PostgreSQL'))
  .catch(err => console.error('❌ Erreur de connexion:', err));

// Route test
app.get('/hello', (req, res) => {
  res.status(200).json({ message: "Hello Backend" });
});

// Route POST pour enregistrer un sinistre
app.post('/api/sinistres', async (req, res) => {
  let client;

  try {

    console.log('Validation des données reçues...');
       // Extraction de tous les champs attendus

    const {
      nom, prenom, type, immatriculation,
      date, heure, lieu, degats, blesses, societe, police, permis, dateDelivrance, circSelected,
      societeB, policeB ,nomB ,prenomB , permisB, dateDelivranceB, typeB, immatriculationB, circSelectedB
    } = req.body;

    // Vérification des champs requis
 
   const requiredFields = [
  'nom', 'prenom', 'type', 'immatriculation', 'date', 'heure', 'lieu',
  'degats', 'blesses', 'societe', 'police', 'permis', 'dateDelivrance', 'circSelected',
  'societeB', 'policeB', 'nomB', 'prenomB', 'permisB', 'dateDelivranceB',
  'typeB', 'immatriculationB', 'circSelectedB'
];

  // Vérification des champs manquants
   const missingFields = requiredFields.filter(field =>
  req.body[field] === undefined || req.body[field] === null || req.body[field] === ''
);

if (missingFields.length > 0) {
  return res.status(400).json({
    error: 'Certains champs requis sont manquants.',
    requiredFields: missingFields
  });
}

    // Validation de la date
    const dateAccident = new Date(date);
    if (isNaN(dateAccident.getTime())) {
      return res.status(400).json({ error: 'Format de date invalide' });
    }

    

    client = await pool.connect();
    await client.query('BEGIN');

    const query = `
      INSERT INTO sinistres (
        date_accident, heure_accident, lieu, degats_materiels, blesses,
        societe_assurance_a, police_assurance_a, nom_conducteur_a, prenom_conducteur_a,
        numero_permis_a, date_delivrance_permis_a, type_vehicule_a, immatriculation_a,
        circonstance_a,
        societe_assurance_b, police_assurance_b, nom_conducteur_b, prenom_conducteur_b,
        numero_permis_b, date_delivrance_permis_b, type_vehicule_b, immatriculation_b,
        circonstance_b
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14,
        $15, $16, $17, $18,
        $19, $20, $21, $22, $23
      ) RETURNING id;
    `;

    const values = [
      dateAccident.toISOString().split('T')[0], // $1 : date_accident
      heure,                                    // $2 : heure_accident
      lieu,                                     // $3 : lieu
      degats,                                   // $4 : degats_materiels
      blesses,                                  // $5 : blesses
      societe,                                  // $6 : societe_assurance_a
      police,                                   // $7 : police_assurance_a
      nom,                                      // $8 : nom_conducteur_a
      prenom,                                   // $9 : prenom_conducteur_a
      permis,                                   // $10 : numero_permis_a
      dateDelivrance,                           // $11 : date_delivrance_permis_a
      type,                                     // $12 : type_vehicule_a
      immatriculation,                          // $13 : immatriculation_a
      circSelected,                             // $14 : circonstance_a
      societeB,                                 // $15 : societe_assurance_b
      policeB,                                  // $16 : police_assurance_b
      nomB ,                               // $17 : nom_conducteur_b
      prenomB ,                            // $18 : prenom_conducteur_b
      permisB,                                  // $19 : numero_permis_b
      dateDelivranceB,                          // $20 : date_delivrance_permis_b
      typeB,                                    // $21 : type_vehicule_b
      immatriculationB,                         // $22 : immatriculation_b
      circSelectedB                             // $23 : circonstance_b
    ];

    const result = await client.query(query, values);
    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      sinistreId: result.rows[0].id,
      message: 'Déclaration enregistrée avec succès'
    });

  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error('❌ Erreur lors de l\'enregistrement :', err.stack);
    res.status(500).json({ error: 'Erreur serveur' });
  } finally {
    if (client) client.release();
  }
});

// Lancer le serveur
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
