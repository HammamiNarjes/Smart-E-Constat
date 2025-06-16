const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Middleware CORS 
app.use(cors());

// Middleware pour parser le JSON du corps de la requête
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (req.body) {
    console.log('Body nettoyé:', JSON.stringify(req.body, null, 2));
    console.log('Clés du body:', Object.keys(req.body));
  }
  next();
});

// Configuration PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'E_constat',
  password: 'narjes',
  port: 5432,
});

// Test de connexion DB
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connecté à PostgreSQL'))
  .catch(err => console.error('❌ Erreur de connexion:', err));

// Route test
app.get('/hello', (req, res) => {
  res.status(200).json({ message: "Hello Backend" });
});

// Route POST sécurisée
app.post('/api/sinistres', async (req, res) => {
  console.log('req.body:', req.body);  
  let client;

  try {
    console.log('--- Début traitement ---');
    
    const requiredFields = [
      'nom', 'prenom', 'type', 'immatriculation', 'date', 'heure', 'lieu',
      'degats', 'blesses', 'societe', 'police', 'permis', 'dateDelivrance', 'circSelected'
    ];

    // Extraction des champs depuis req.body 
    const {
      nom, prenom, type, immatriculation,
      date, heure, lieu, degats, blesses,
      societe, police, permis, dateDelivrance, circSelected,
      societeB, policeB, nomB, prenomB, permisB, dateDelivranceB, typeB, immatriculationB, circSelectedB, declaration, declarationB
    } = req.body;

    // Validation des champs obligatoires (utiliser req.body)
    const missingFields = requiredFields.filter(field => 
  !req.body.hasOwnProperty(field) || 
  (req.body[field] === '' || req.body[field] === null || req.body[field] === undefined)
);

    if (missingFields.length > 0) {
  console.log('Champs manquants:', missingFields);
  return res.status(400).json({
    error: 'Champs manquants',
    missingFields,
    receivedData: Object.keys(req.body)
  });
}

    // Préparation des valeurs
    const values = [
      new Date(date).toISOString().split('T')[0], // $1
      heure || '00:00',                           // $2
      lieu || 'Non spécifié',                     // $3
      Boolean(degats),                            // $4
      Boolean(blesses),                           // $5
      societe || null,                            // $6
      police || null,                             // $7
      nom,                                        // $8
      prenom,                                     // $9
      permis || null,                             // $10
      dateDelivrance || null,                     // $11
      type || 'Non spécifié',                     // $12
      immatriculation,                            // $13
      circSelected || 'Non spécifié',             // $14
      societeB || null,                           // $15
      policeB || null,                            // $16
      nomB || null,                               // $17
      prenomB || null,                            // $18
      permisB || null,                            // $19
      dateDelivranceB || null,                    // $20
      typeB || null,                              // $21
      immatriculationB || null,                   // $22
      circSelectedB || null,                       // $23
      declaration || null,  
      declarationB || null,

    ];

    console.log('Valeurs préparées pour insertion:', values);

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
        circonstance_b, declaration_a ,declaration_b
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23,$24,$25)
      RETURNING id;
    `;

    const result = await client.query(query, values);
    await client.query('COMMIT');

    console.log('✅ Enregistrement réussi. ID:', result.rows[0].id);

    res.status(201).json({
      success: true,
      sinistreId: result.rows[0].id,  
      message: 'Déclaration enregistrée avec succès', 
    });

  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error('❌ Erreur:', {
      message: err.message,
      stack: err.stack,
      query: err.query,
      parameters: err.parameters
    });
    res.status(500).json({ 
      error: 'Erreur serveur',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  } finally {
    if (client) client.release();
    console.log('--- Fin traitement ---\n');
  }
});

// Démarrer le serveur
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log('🔍 Mode debug:', process.env.NODE_ENV || 'development');
});

