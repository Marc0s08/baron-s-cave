import React from 'react';
import './Layout.css'; // Adiciona a importação do arquivo CSS
import logo from '../assets/logo.jpg'; // Substitua pelo caminho correto da sua logo
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>Baron's Cave</h1>
        </div>
        {/* Inclui o Sidebar que se adapta às telas */}
        <Sidebar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2024 Baron's Cave</p>
      </footer>
    </div>
  );
};

export default Layout;
