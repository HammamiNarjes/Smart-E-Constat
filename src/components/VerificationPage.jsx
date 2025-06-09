import React from 'react';
import { useNavigate } from 'react-router-dom';

function VerificationPage() {
  const navigate = useNavigate();

  const conducteurA = {
    assurance: "Assurance A",
    police: "PA123456",
    nom: "Ahmed",
    prenom: "Ali",
    numeroPermis: "TUN123456",
    dateDelivrancePermis: "2018-06-10",
    declaration: "Je n'ai rien vu",
    typeVehicule: "Voiture",
    immatriculation: "1234-XYZ",
  };

  const conducteurB = {
    assurance: "Assurance B",
    police: "PB654321",
    nom: "Bassem",
    prenom: "Yassine",
    numeroPermis: "TUN654321",
    dateDelivrancePermis: "2016-11-15",
    declaration: "Circulait sur une voie prioritaire",
    typeVehicule: "Moto",
    immatriculation: "9876-ABC",
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold text-primary mb-5">
        Validation du constat
      </h2>

      <div className="card mb-4 p-3" style={{ backgroundColor: '#f3f4f6' }}>
        <h5 className="fw-bold text-primary mb-3 text-start">Circonstances générales</h5>
        <p className="mb-1 fw-medium">Date : 2024-05-20</p>
        <p className="mb-1 fw-medium">Heure : 14:30</p>
        <p className="mb-0 fw-medium">Lieu : Tunis, Avenue Hédi Nouira</p>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card p-3" style={{ backgroundColor: '#fde68a' }}>
            <h5 className="fw-bold" style={{ color: '#a16207' }}>Informations du Conducteur B</h5>
            <p><strong>Société d'assurance :</strong> {conducteurB.assurance}</p>
            <p><strong>Police d'assurance :</strong> {conducteurB.police}</p>
            <p><strong>Nom :</strong> {conducteurB.nom}</p>
            <p><strong>Prénom :</strong> {conducteurB.prenom}</p>
            <p><strong>Numéro de permis :</strong> {conducteurB.numeroPermis}</p>
            <p><strong>Date de délivrance du permis :</strong> {conducteurB.dateDelivrancePermis}</p>
            <p><strong>Déclaration du conducteur :</strong> {conducteurB.declaration}</p>
            <h6 className="fw-bold mt-3" style={{ color: '#a16207' }}>Informations du véhicule - Conducteur B</h6>
            <p><strong>Type de véhicule :</strong> {conducteurB.typeVehicule}</p>
            <p><strong>Numéro d'immatriculation :</strong> {conducteurB.immatriculation}</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center p-4" style={{ height: '100%', backgroundColor: '#ffffff' }}>
            <h5 className="fw-semibold mb-3">Croquis de l'accident</h5>
            <p>(Zone réservée pour le dessin de la scène)</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3" style={{ backgroundColor: '#a7f3d0' }}>
            <h5 className="fw-bold" style={{ color: '#065f46' }}>Informations du Conducteur A</h5>
            <p><strong>Société d'assurance :</strong> {conducteurA.assurance}</p>
            <p><strong>Police d'assurance :</strong> {conducteurA.police}</p>
            <p><strong>Nom :</strong> {conducteurA.nom}</p>
            <p><strong>Prénom :</strong> {conducteurA.prenom}</p>
            <p><strong>Numéro de permis :</strong> {conducteurA.numeroPermis}</p>
            <p><strong>Date de délivrance du permis :</strong> {conducteurA.dateDelivrancePermis}</p>
            <p><strong>Déclaration du conducteur :</strong> {conducteurA.declaration}</p>
            <h6 className="fw-bold mt-3" style={{ color: '#065f46' }}>Informations du véhicule - Conducteur A</h6>
            <p><strong>Type de véhicule :</strong> {conducteurA.typeVehicule}</p>
            <p><strong>Numéro d'immatriculation :</strong> {conducteurA.immatriculation}</p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-5">
        <button className="btn btn-secondary" onClick={() => navigate('/croquis')}>Précédent</button>
        <button className="btn btn-primary text-white" onClick={() => navigate('/final')}>Valider</button>
      </div>
    </div>
  );
}

export default VerificationPage;