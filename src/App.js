import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Midia from './pages/Midia';
import Briefings from './pages/Briefings';
import BriefingDetail from './pages/BriefingDetail';
import Regras from './pages/Regras';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/midia" element={<Midia />} />
        <Route path="/Briefings" element={<Briefings />} />
        <Route path="/briefings" element={<Briefings />} />
        <Route path="/briefings/:id" element={<BriefingDetail />} /> {/* Rota dinâmica */}
        <Route path="/regras" element={<Regras />} />
      </Routes>
    </Router>
  );
};

export default App;
