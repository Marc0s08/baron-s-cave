import React from 'react';
import './Layout.css'; // Certifique-se de que o arquivo CSS está corretamente referenciado
import logo from '../assets/logo.jpg'; // Substitua pelo caminho correto da sua logo
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1>UNIDADE TÁTICA AIRSOFT</h1>
        </div>
        <Sidebar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <div className="container">
          <div className="contacts">
            <h3>Contatos</h3>
            <ul>
              <li>GRUPO WHATSAPP</li>
              <li>INSTAGRAM</li>
            </ul>
          </div>
          <div className="logo">
            <img src={logo} alt="Logo" className="footer-logo" />
          </div>
          <div className="fields">
            <h3>Campos</h3>
            <ul>
            <li>
  📍<a href="https://www.google.com/maps/place/Ch%C3%A1cara+Argolo" target="_blank" rel="noopener noreferrer">CHÁCARA ARGOLO</a>
</li>

            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
