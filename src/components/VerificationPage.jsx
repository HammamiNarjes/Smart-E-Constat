import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SinistreContext } from '../contexts/SinistreContext';

function VerificationPage() {
  const navigate = useNavigate();
  const { formData } = useContext(SinistreContext);

  // Structure des données pour affichage
  const conducteurA = {
    assurance: formData.societe || "Non renseigné",
    police: formData.police || "Non renseigné",
    nom: formData.nom || "Non renseigné",
    prenom: formData.prenom || "Non renseigné",
    numeroPermis: formData.permis || "Non renseigné",
    dateDelivrancePermis: formData.dateDelivrance || "Non renseigné",
    typeVehicule: formData.type || "Non renseigné",
    immatriculation: formData.immatriculation || "Non renseigné",
    circSelected: formData.circSelected || "Non renseigné"
  };

  const conducteurB = {
    assurance: formData.societeB || "Non renseigné",
    police: formData.policeB || "Non renseigné",
    nom: formData.nomB || "Non renseigné",
    prenom: formData.prenomB || "Non renseigné",
    numeroPermis: formData.permisB || "Non renseigné",
    dateDelivrancePermis: formData.dateDelivranceB || "Non renseigné",
    typeVehicule: formData.typeB || "Non renseigné",
    immatriculation: formData.immatriculationB || "Non renseigné",
    circSelected: formData.circSelectedB || "Non renseigné"
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold text-primary mb-5">
        Validation du constat
      </h2>

      <div className="card mb-4 p-3" style={{ backgroundColor: '#f3f4f6' }}>
        <h5 className="fw-bold text-primary mb-3 text-start">Circonstances générales</h5>
        <p className="mb-1 fw-medium">Date : {formData.date || "Non renseigné"}</p>
        <p className="mb-1 fw-medium">Heure : {formData.heure || "Non renseigné"}</p>
        <p className="mb-1 fw-medium">Lieu : {formData.lieu || "Non renseigné"}</p>
        <p className="mb-0 fw-medium">Dégâts matériels : {formData.degats ? "Oui" : "Non"}</p>
        <p className="mb-0 fw-medium">Blessés : {formData.blesses ? "Oui" : "Non"}</p>
      </div>

      <div className="row g-3">
        <div className="col-md-3"> {/* Réduit de 4 à 3 pour donner plus d'espace */}
          <div className="card h-100 p-3" style={{ backgroundColor: '#fde68a' }}>
            <h5 className="fw-bold" style={{ color: '#a16207' }}>Conducteur B</h5>
            <p><strong>Société d'assurance :</strong> {conducteurB.assurance}</p>
            <p><strong>Police d'assurance :</strong> {conducteurB.police}</p>
            <p><strong>Nom :</strong> {conducteurB.nom}</p>
            <p><strong>Prénom :</strong> {conducteurB.prenom}</p>
            <p><strong>Numéro de permis :</strong> {conducteurB.numeroPermis}</p>
            <p><strong>Date de délivrance :</strong> {conducteurB.dateDelivrancePermis}</p>
            <p><strong>Circonstance :</strong> {conducteurB.circSelected}</p>
            <h6 className="fw-bold mt-3" style={{ color: '#a16207' }}>Véhicule</h6>
            <p><strong>Type :</strong> {conducteurB.typeVehicule}</p>
            <p><strong>Immatriculation :</strong> {conducteurB.immatriculation}</p>
          </div>
        </div>

        <div className="col-md-6"> {/* Augmenté de 4 à 6 pour plus d'espace */}
          <div className="card h-100">
            <div className="card-header bg-white border-bottom">
              <h5 className="fw-semibold mb-0 text-center">Croquis de l'accident</h5>
            </div>
            <div className="card-body p-0 d-flex flex-column">
              {formData.croquis ? (
                <div className="flex-grow-1" style={{ 
                  height: '500px',
                  overflow: 'auto',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <img 
                    src={formData.croquis} 
                    alt="Croquis de l'accident" 
                    style={{ 
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      padding: '20px'
                    }}
                  />
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center" style={{ 
                  height: '500px',
                  color: '#6c757d'
                }}>
                  <p className="mb-0">Aucun croquis disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-3"> {/* Réduit de 4 à 3 */}
          <div className="card h-100 p-3" style={{ backgroundColor: '#a7f3d0' }}>
            <h5 className="fw-bold" style={{ color: '#065f46' }}>Conducteur A</h5>
            <p><strong>Société d'assurance :</strong> {conducteurA.assurance}</p>
            <p><strong>Police d'assurance :</strong> {conducteurA.police}</p>
            <p><strong>Nom :</strong> {conducteurA.nom}</p>
            <p><strong>Prénom :</strong> {conducteurA.prenom}</p>
            <p><strong>Numéro de permis :</strong> {conducteurA.numeroPermis}</p>
            <p><strong>Date de délivrance :</strong> {conducteurA.dateDelivrancePermis}</p>
            <p><strong>Circonstance :</strong> {conducteurA.circSelected}</p>
            <h6 className="fw-bold mt-3" style={{ color: '#065f46' }}>Véhicule</h6>
            <p><strong>Type :</strong> {conducteurA.typeVehicule}</p>
            <p><strong>Immatriculation :</strong> {conducteurA.immatriculation}</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-5">
        <button 
          className="btn btn-secondary px-4" 
          onClick={() => navigate('/croquis')}
        >
          Précédent
        </button>
        <button 
          className="btn btn-primary text-white px-4" 
          onClick={() => navigate('/final')}
          disabled={!formData.croquis}
        >
          Valider le constat
        </button>
      </div>
    </div>
  );
}

export default VerificationPage;