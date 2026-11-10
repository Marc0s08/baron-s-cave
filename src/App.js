
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

import Home from './pages/Home';
import Midia from './pages/Midia';
import Briefings from './pages/Briefings';
import BriefingDetail from './pages/BriefingDetail';
import Regras from './pages/Regras';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/midia" element={<Midia />} />
        <Route path="/Briefings" element={<Briefings />} />
        <Route path="/briefings" element={<Briefings />} />
        <Route path="/briefings/:id" element={<BriefingDetail />} />
        <Route path="/regras" element={<Regras />} />
      </Routes>
    </Router>
  );
};

export default App;
