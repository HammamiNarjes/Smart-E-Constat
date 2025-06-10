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
  password: 'root', //change to narjes 
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

// Vérification connexion PostgreSQL
pool.query('SELECT NOW()')
  .then(() => console.log('✅ Connecté à PostgreSQL'))
  .catch(err => console.error('❌ Erreur de connexion:', err));


app.get('/hello', async(req,res)=>{
  res.status(200).json({message : "Hello Backend"});
})

// Enregistrement sinistre
// app.post('/api/sinistres', async (req, res) => {
//   let client;
//   try {
//     console.log('Validation des données reçues...');
//     //const { conducteurA, vehiculeA, conducteurB, vehiculeB, circonstances, croquis } = req.body;
//     const { nom , prenom, type, immatriculation, date, heure, lieu }= req.body;
//     // Validation minimale
//     // const requiredFields = [
//     //   conducteurA?.nom, conducteurA?.prenom,
//     //   vehiculeA?.type, vehiculeA?.immatriculation,
//     //   circonstances?.date, circonstances?.heure, circonstances?.lieu
//     // ];

//     // if (requiredFields.some(field => !field)) {
//     //   return res.status(400).json({ 
//     //     error: 'Champs obligatoires manquants',
//     //     required: {
//     //       conducteurA: ['nom', 'prenom'],
//     //       vehiculeA: ['type', 'immatriculation'],
//     //       circonstances: ['date', 'heure', 'lieu']
//     //     }
//     //   });
//     // }

//     // Conversion des données
//     const dateAccident = new Date(date);
//     if (isNaN(dateAccident.getTime())) {
//       return res.status(400).json({ error: 'Format de date invalide' });
//     }

//     client = await pool.connect();
//     await client.query('BEGIN');

//     console.log('Préparation de la requête SQL...');
//     const query = `
//       INSERT INTO sinistres (
//         date_accident, heure_accident, lieu, degats_materiels, blesses,
//         societe_assurance_a, police_assurance_a, nom_conducteur_a, prenom_conducteur_a,
//         numero_permis_a, date_delivrance_permis_a, type_vehicule_a, immatriculation_a,
//         circonstance_a, 
//         societe_assurance_b, police_assurance_b, nom_conducteur_b, prenom_conducteur_b,
//         numero_permis_b, date_delivrance_permis_b, type_vehicule_b, immatriculation_b,
//         circonstance_b
//       ) VALUES (${date}, ${heure}, ${lieu}, ${null}, ${null}, ${null}, ${null}, ${nom}, ${prenom}, ${null}, ${null}, ${type}, ${immatriculation}, ${null}, ${null}, ${null}, ${null}, ${null}, ${null}, ${null}, ${null}, ${null}, ${null} )
//       RETURNING id;
//     `;

//     // const values = [
//     //   dateAccident.toISOString().split('T')[0], // date_accident
//     //   circonstances.heure,                      // heure_accident
//     //   circonstances.lieu,                       // lieu
//     //   circonstances.degats === 'oui',           // degats_materiels
//     //   circonstances.blesses === 'oui',          // blesses
//     //   conducteurA.societe || null,              // societe_assurance_a
//     //   conducteurA.police || null,               // police_assurance_a
//     //   conducteurA.nom,                          // nom_conducteur_a
//     //   conducteurA.prenom,                       // prenom_conducteur_a
//     //   conducteurA.permis || null,               // numero_permis_a
//     //   conducteurA.dateDelivrance || null,       // date_delivrance_permis_a
//     //   vehiculeA.type,                           // type_vehicule_a
//     //   vehiculeA.immatriculation,                // immatriculation_a
//     //   circonstances.circonstanceA || '',        // circonstance_a
//     //   conducteurB?.societe || null,             // societe_assurance_b
//     //   conducteurB?.police || null,              // police_assurance_b
//     //   conducteurB?.nom || null,                 // nom_conducteur_b
//     //   conducteurB?.prenom || null,              // prenom_conducteur_b
//     //   conducteurB?.permis || null,              // numero_permis_b
//     //   conducteurB?.dateDelivrance || null,      // date_delivrance_permis_b
//     //   vehiculeB?.type || null,                  // type_vehicule_b
//     //   vehiculeB?.immatriculation || null,       // immatriculation_b
//     //   circonstances.circonstanceB || null,      // circonstance_b
//     //  // croquis || null                           // croquis
//     // ];

//     // console.log('Exécution de la requête avec valeurs:', values);

//     const values = [{body : req.body}];
    
//     const result = await client.query(query, values);
    
//     console.log('Query result', req.body);
//     await client.query('COMMIT');

//     res.status(201).json({ 
//       success: true,
//       data : result,
//       message: 'Déclaration enregistrée avec succès'
//     });

//   } catch (err) {
//     if (client) await client.query('ROLLBACK');
//     console.error('❌ Erreur lors de l\'enregistrement:', err.stack);
//     res.status(500).json({
//       success: false,
//       error: 'Erreur serveur',
//       details: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   } finally {
//     if (client) client.release();
//   }
// });

app.post('/api/sinistres', async (req, res) => {
  let client;

  try {
    console.log('Validation des données reçues...');
    
    // Extraction de tous les champs attendus
    const {
      nom, prenom, type, immatriculation,
      date, heure, lieu
    } = req.body;

    // Vérification des champs requis
    if (!nom || !prenom || !type || !immatriculation || !date || !heure || !lieu) {
      return res.status(400).json({
        error: 'Certains champs requis sont manquants.',
        requiredFields: ['nom', 'prenom', 'type', 'immatriculation', 'date', 'heure', 'lieu']
      });
    }

    // Validation de la date
    const dateAccident = new Date(date);
    if (isNaN(dateAccident.getTime())) {
      return res.status(400).json({ error: 'Format de date invalide' });
    }

    client = await pool.connect();
    await client.query('BEGIN');

    console.log('Préparation de la requête SQL...');

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
        $6, $7, $8, $9,
        $10, $11, $12, $13,
        $14,
        $15, $16, $17, $18,
        $19, $20, $21, $22,
        $23
      )
      RETURNING id;
    `;

    const values = [
      dateAccident.toISOString().split('T')[0], // $1 : date_accident
      heure,                                    // $2 : heure_accident
      lieu,                                     // $3 : lieu
      null,                                     // $4 : degats_materiels
      null,                                     // $5 : blesses
      null,                                     // $6 : societe_assurance_a
      null,                                     // $7 : police_assurance_a
      nom,                                      // $8 : nom_conducteur_a
      prenom,                                   // $9 : prenom_conducteur_a
      null,                                     // $10 : numero_permis_a
      null,                                     // $11 : date_delivrance_permis_a
      type,                                     // $12 : type_vehicule_a
      immatriculation,                          // $13 : immatriculation_a
      null,                                     // $14 : circonstance_a
      null,                                     // $15 : societe_assurance_b
      null,                                     // $16 : police_assurance_b
      null,                                     // $17 : nom_conducteur_b
      null,                                     // $18 : prenom_conducteur_b
      null,                                     // $19 : numero_permis_b
      null,                                     // $20 : date_delivrance_permis_b
      null,                                     // $21 : type_vehicule_b
      null,                                     // $22 : immatriculation_b
      null                                      // $23 : circonstance_b
    ];

    const result = await client.query(query, values);

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      data: { id: result.rows[0].id },
      message: 'Déclaration enregistrée avec succès'
    });

  } catch (err) {
    if (client) await client.query('ROLLBACK');
    console.error('❌ Erreur lors de l\'enregistrement :', err.stack);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  } finally {
    if (client) client.release();
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
});