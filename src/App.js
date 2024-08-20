import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Midia from './pages/Midia';
import Briefings from './pages/Briefings';
import Vendas from './pages/Vendas';
import Aluguel from './pages/Aluguel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/midia" element={<Midia />} />
        <Route path="/Briefings" element={<Briefings />} />
        <Route path="/Vendas" element={<Vendas />} />
        <Route path="/Aluguel" element={<Aluguel />} />
      </Routes>
    </Router>
  );
};

export default App;
