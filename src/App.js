import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IdentificationConducteur from './components/IdentificationConducteur';
import CirconstancesAccident from './components/CirconstancesAccident';
import InfosConducteurA from './components/InfosConducteurA';
import InfosVehiculeA from './components/InfosVehiculeA';
import ChoixCirconstanceUnique from './components/ChoixCirconstanceUnique';
import InfosConducteurB from './components/InfosConducteurB';
import InfosVehiculeB from './components/InfosVehiculeB';
import ChoixCirconstanceB from './components/ChoixCirconstanceB';
import Croquis from './components/Croquis';
import VerificationPage from './components/VerificationPage';  
import FinalPage from './components/FinalPage';
import { SinistreProvider } from './contexts/SinistreContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <SinistreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IdentificationConducteur />} />
          <Route path="/circonstances" element={<CirconstancesAccident />} />
          <Route path="/conducteur-a" element={<InfosConducteurA />} />
          <Route path="/vehicule-a" element={<InfosVehiculeA />} />
          <Route path="/choix-circonstance" element={<ChoixCirconstanceUnique />} />
          <Route path="/conducteur-b" element={<InfosConducteurB />} />
          <Route path="/vehicule-b" element={<InfosVehiculeB />} />
          <Route path="/circonstance-b" element={<ChoixCirconstanceB />} />
          <Route path="/croquis" element={<Croquis />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/final" element={<FinalPage />} />
        </Routes>
      </Router>
    </SinistreProvider>
  );
}

export default App; 