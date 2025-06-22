import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgentAssurance = () => {
  const [idSinistre, setIdSinistre] = useState('');
  const [sinistre, setSinistre] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const handleSearch = async () => {
    if (!idSinistre) {
      setMessage("Veuillez entrer un ID de sinistre valide");
      return;
    }

    setLoading(true);
    setMessage('Recherche en cours...');

    try {
      const response = await axios.get(`http://localhost:3001/api/sinistres/${idSinistre}`);
      
      if (response.data) {
        setSinistre(response.data);
        setMessage('');
        setActiveTab('details');
      } else {
        setMessage("Aucune donnée trouvée");
        setSinistre(null);
      }
    } catch (err) {
      console.error('Erreur:', err);
      setMessage(err.response?.data?.error || "Erreur de connexion au serveur");
      setSinistre(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = () => {
    setMessage("Analyse en cours...");
    setActiveTab('prediction');
    
    // Simulation de la prédiction (à remplacer par l'appel réel à votre modèle)
    setTimeout(() => {
      setMessage("✅ Analyse terminée - Conducteur A identifié comme fautif");
      // Mettre à jour le statut fautif dans les données
      setSinistre(prev => ({
        ...prev,
        fautif: 'Conducteur A'
      }));
    }, 2000);
  };

  const renderDetails = () => (
    <div className="mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="text-primary">
          <i className="bi bi-file-earmark-text me-2"></i>
          Détails du sinistre #{sinistre.id}
        </h4>
        <span className="badge bg-secondary">
          {new Date(sinistre.date_accident).toLocaleDateString()}
        </span>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3 border-success">
            <div className="card-header bg-success text-white d-flex justify-content-between">
              <h5>
                <i className="bi bi-person me-2"></i>
                Conducteur A
              </h5>
              {sinistre.fautif === 'Conducteur A' && (
                <span className="badge bg-danger">FAUTIF</span>
              )}
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-muted">Identité</h6>
                <p>
                  <i className="bi bi-person-badge me-2"></i>
                  {sinistre.nom_conducteur_a} {sinistre.prenom_conducteur_a}
                </p>
                <p>
                  <i className="bi bi-card-text me-2"></i>
                  Permis: {sinistre.numero_permis_a || 'N/A'}
                </p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">Véhicule</h6>
                <p>
                  <i className="bi bi-car-front me-2"></i>
                  {sinistre.type_vehicule_a} ({sinistre.immatriculation_a})
                </p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">Assurance</h6>
                <p>
                  <i className="bi bi-shield-check me-2"></i>
                  {sinistre.societe_assurance_a || 'N/A'} - {sinistre.police_assurance_a || 'N/A'}
                </p>
              </div>
              
              <div className="alert alert-light">
                <h6 className="text-muted">Déclaration</h6>
                <p>{sinistre.declaration_a || 'Aucune déclaration'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-3 border-danger">
            <div className="card-header bg-danger text-white d-flex justify-content-between">
              <h5>
                <i className="bi bi-person me-2"></i>
                Conducteur B
              </h5>
              {sinistre.fautif === 'Conducteur B' && (
                <span className="badge bg-danger">FAUTIF</span>
              )}
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-muted">Identité</h6>
                <p>
                  <i className="bi bi-person-badge me-2"></i>
                  {sinistre.nom_conducteur_b || 'N/A'} {sinistre.prenom_conducteur_b || 'N/A'}
                </p>
                <p>
                  <i className="bi bi-card-text me-2"></i>
                  Permis: {sinistre.numero_permis_b || 'N/A'}
                </p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">Véhicule</h6>
                <p>
                  <i className="bi bi-car-front me-2"></i>
                  {sinistre.type_vehicule_b || 'N/A'} ({sinistre.immatriculation_b || 'N/A'})
                </p>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted">Assurance</h6>
                <p>
                  <i className="bi bi-shield-check me-2"></i>
                  {sinistre.societe_assurance_b || 'N/A'} - {sinistre.police_assurance_b || 'N/A'}
                </p>
              </div>
              
              <div className="alert alert-light">
                <h6 className="text-muted">Déclaration</h6>
                <p>{sinistre.declaration_b || 'Aucune déclaration'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-primary mb-3">
        <div className="card-header bg-primary text-white">
          <h5>
            <i className="bi bi-geo-alt me-2"></i>
            Circonstances de l'accident
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <p>
                <i className="bi bi-calendar me-2"></i>
                <strong>Date:</strong> {new Date(sinistre.date_accident).toLocaleDateString()}
              </p>
              <p>
                <i className="bi bi-clock me-2"></i>
                <strong>Heure:</strong> {sinistre.heure_accident}
              </p>
              <p>
                <i className="bi bi-pin-map me-2"></i>
                <strong>Lieu:</strong> {sinistre.lieu}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <i className="bi bi-tools me-2"></i>
                <strong>Dégâts matériels:</strong> 
                <span className={sinistre.degats_materiels ? 'text-danger' : 'text-success'}>
                  {sinistre.degats_materiels ? ' Oui' : ' Non'}
                </span>
              </p>
              <p>
                <i className="bi bi-activity me-2"></i>
                <strong>Blessés:</strong> 
                <span className={sinistre.blesses ? 'text-danger' : 'text-success'}>
                  {sinistre.blesses ? ' Oui' : ' Non'}
                </span>
              </p>
            </div>
          </div>
          
          <hr />
          
          <div className="row">
            <div className="col-md-6">
              <h6 className="text-success">
                <i className="bi bi-signpost me-2"></i>
                Circonstance Conducteur A
              </h6>
              <p>{sinistre.circonstance_a}</p>
            </div>
            <div className="col-md-6">
              <h6 className="text-danger">
                <i className="bi bi-signpost me-2"></i>
                Circonstance Conducteur B
              </h6>
              <p>{sinistre.circonstance_b || 'Non spécifiée'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrediction = () => (
    <div className="mt-4 p-4">
      <div className="card border-warning">
        <div className="card-header bg-warning text-dark">
          <h4>
            <i className="bi bi-robot me-2"></i>
            Analyse de responsabilité
          </h4>
        </div>
        <div className="card-body">
          {message.includes('terminée') ? (
            <>
              <div className="alert alert-success">
                <i className="bi bi-check-circle me-2"></i>
                {message}
              </div>
              
              <div className="analysis-result p-4 text-center">
                <h5 className="mb-4">
                  <i className="bi bi-graph-up me-2"></i>
                  Résultats de l'analyse
                </h5>
                
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="card mb-4">
                      <div className="card-body">
                        <h6 className="text-muted">Probabilités de responsabilité</h6>
                        <div className="progress mb-3" style={{height: '30px'}}>
                          <div 
                            className="progress-bar bg-danger" 
                            style={{width: '75%'}}
                          >
                            Conducteur A: 75%
                          </div>
                          <div 
                            className="progress-bar bg-success" 
                            style={{width: '25%'}}
                          >
                            Conducteur B: 25%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card">
                      <div className="card-body">
                        <h6 className="text-muted">Facteurs déterminants</h6>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                              <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                              Déclaration incohérente
                            </span>
                            <span className="badge bg-danger">Fort impact</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                              <i className="bi bi-sign-stop-fill text-warning me-2"></i>
                              Non-respect de priorité
                            </span>
                            <span className="badge bg-warning text-dark">Moyen impact</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                              <i className="bi bi-speedometer2 text-info me-2"></i>
                              Vitesse excessive
                            </span>
                            <span className="badge bg-info">Faible impact</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-4">
              <div className="spinner-border text-warning mb-3" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <h5>{message}</h5>
              <p>Analyse des circonstances en cours...</p>
            </div>
          )}
          
          <div className="text-center mt-4">
            <button 
              className="btn btn-outline-primary"
              onClick={() => setActiveTab('details')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Retour aux détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid min-vh-100" style={{background: '#f8f9fa'}}>
      <div className="row justify-content-center py-4">
        <div className="col-lg-10">
          <div className="card shadow-lg">
            <div className="card-header bg-dark text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  <i className="bi bi-shield-lock me-2"></i>
                  Espace Agent d'Assurance
                </h2>
                <div className="badge bg-light text-dark">
                  <i className="bi bi-person-circle me-1"></i>
                  Agent
                </div>
              </div>
            </div>
            
            <div className="card-body">
              <div className="search-section mb-4 p-3 bg-light rounded">
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Entrez l'ID du sinistre..."
                    value={idSinistre}
                    onChange={(e) => setIdSinistre(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    disabled={loading}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSearch}
                    disabled={loading || !idSinistre}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Recherche...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-search me-2"></i>
                        Rechercher
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-warning ms-2"
                    onClick={handlePredict}
                    disabled={!sinistre || loading}
                  >
                    <i className="bi bi-magic me-2"></i>
                    Analyser
                  </button>
                </div>
              </div>

              {message && !message.includes('en cours') && (
                <div className={`alert ${message.includes('Erreur') ? 'alert-danger' : 'alert-info'} d-flex align-items-center`}>
                  <i className={`bi ${message.includes('Erreur') ? 'bi-exclamation-triangle' : 'bi-info-circle'} me-2`}></i>
                  {message}
                </div>
              )}

              {sinistre && (
                <>
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('details')}
                      >
                        <i className="bi bi-file-text me-1"></i>
                        Détails
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${activeTab === 'prediction' ? 'active' : ''}`}
                        onClick={() => setActiveTab('prediction')}
                        disabled={!sinistre}
                      >
                        <i className="bi bi-graph-up me-1"></i>
                        Analyse
                      </button>
                    </li>
                  </ul>

                  {activeTab === 'details' ? renderDetails() : renderPrediction()}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAssurance;