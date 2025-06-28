const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Configuration CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (req.body) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
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

// Route POST pour enregistrer un sinistre
app.post('/api/sinistres', async (req, res) => {
  let client;
  try {
    const requiredFields = [
      'nom', 'prenom', 'type', 'immatriculation', 'date', 'heure', 'lieu',
      'degats', 'blesses', 'societe', 'police', 'permis', 'dateDelivrance', 'circSelected','chocA'
    ];

    const missingFields = requiredFields.filter(field => 
      !req.body.hasOwnProperty(field) || 
      (req.body[field] === '' || req.body[field] === null || req.body[field] === undefined)
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Champs manquants',
        missingFields,
        receivedData: Object.keys(req.body)
      });
    }

    const values = [
      new Date(req.body.date).toISOString().split('T')[0],
      req.body.heure || '00:00',
      req.body.lieu || 'Non spécifié',
      Boolean(req.body.degats),
      Boolean(req.body.blesses),
      req.body.societe || null,
      req.body.police || null,
      req.body.nom,
      req.body.prenom,
      req.body.permis || null,
      req.body.dateDelivrance || null,
      req.body.type || 'Non spécifié',
      req.body.immatriculation,
      req.body.circSelected || 'Non spécifié',
      req.body.societeB || null,
      req.body.policeB || null,
      req.body.nomB || null,
      req.body.prenomB || null,
      req.body.permisB || null,
      req.body.dateDelivranceB || null,
      req.body.typeB || null,
      req.body.immatriculationB || null,
      req.body.circSelectedB || null,
      req.body.declaration || null,
      req.body.declarationB || null,
      req.body.chocA || null,
      req.body.chocB || null,
    ];

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
        circonstance_b, declaration_a, declaration_b, point_de_choc_a, point_de_choc_b
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
      RETURNING id;
    `;

    const result = await client.query(query, values);
    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      sinistreId: result.rows[0].id,
      message: 'Déclaration enregistrée avec succès',
    });

  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error('Erreur:', err);
    res.status(500).json({ 
      error: 'Erreur serveur',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  } finally {
    if (client) client.release();
  }
});

// Route GET pour récupérer un sinistre
app.get('/api/sinistres/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM sinistres WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sinistre non trouvé' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route pour la prédiction - Version corrigée
app.post('/api/analyze/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`🔍 Début analyse pour sinistre ID: ${id}`);
    
    try {
        // 1. Récupération des données
        const { rows } = await pool.query('SELECT * FROM sinistres WHERE id = $1', [id]);
        if (rows.length === 0) {
            console.error(`❌ Sinistre non trouvé: ${id}`);
            return res.status(404).json({ error: 'Sinistre non trouvé' });
        }

        const sinistre = rows[0];
        console.log('📦 Données du sinistre:', {
            id: sinistre.id,
            date: sinistre.date_accident,
            conducteurs: `${sinistre.nom_conducteur_a} vs ${sinistre.nom_conducteur_b}`
        });

        // 2. Correction du format de date
        let formattedDate;
        try {
            // Convertir la date en format YYYY-MM-DD
            const dateObj = new Date(sinistre.date_accident);
            if (isNaN(dateObj.getTime())) {
                throw new Error('Format de date invalide');
            }
            formattedDate = dateObj.toISOString().split('T')[0];
            console.log(`📅 Date convertie: ${sinistre.date_accident} → ${formattedDate}`);
        } catch (dateError) {
            console.error('❌ Erreur conversion date:', dateError);
            formattedDate = '1970-01-01'; // Valeur par défaut si erreur
        }

        // 3. Préparation des données pour Flask
        const predictionData = {
            date_accident: formattedDate, // Utiliser la date corrigée
            heure_accident: sinistre.heure_accident,
            immatriculation_a: sinistre.immatriculation_a,
            type_vehicule_a: sinistre.type_vehicule_a,
            point_de_choc_a: sinistre.point_de_choc_a,
            circonstance_a: sinistre.circonstance_a,
            declaration_a: sinistre.declaration_a,
            immatriculation_b: sinistre.immatriculation_b,
            type_vehicule_b: sinistre.type_vehicule_b,
            point_de_choc_b: sinistre.point_de_choc_b,
            circonstance_b: sinistre.circonstance_b,
            declaration_b: sinistre.declaration_b
        };

        console.log('📤 Données envoyées à Flask:', predictionData);

        // 4. Appel à l'API Flask avec gestion d'erreur améliorée
        const flaskResponse = await axios.post('http://localhost:5000/predict', predictionData, {
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('📥 Réponse de Flask:', flaskResponse.data);

        // 5. Validation de la réponse
        if (!flaskResponse.data || !flaskResponse.data.prediction) {
            throw new Error('Réponse invalide du modèle Flask');
        }

        // 6. Mise à jour de la base
        await pool.query(
            'UPDATE sinistres SET fautif = $1 WHERE id = $2',
            [flaskResponse.data.prediction, id]
        );

        // 7. Réponse
        res.json({
            prediction: flaskResponse.data.prediction,
            probabilities: {
                conducteur_A: Math.round(flaskResponse.data.probabilities.conducteur_A * 100),
                conducteur_B: Math.round(flaskResponse.data.probabilities.conducteur_B * 100)
            }
        });

    } catch (error) {
        console.error('❌ Erreur analyse:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data
        });

        res.status(500).json({ 
            error: 'Erreur lors de l\'analyse',
            details: process.env.NODE_ENV === 'development' ? {
                message: error.message,
                flaskError: error.response?.data
            } : undefined
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});