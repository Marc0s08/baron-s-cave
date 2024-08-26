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
        <li>
          <a href="https://chat.whatsapp.com/DmTld80rm2yElfHfB8LYVS" target="_blank" rel="noopener noreferrer">
          <img src={process.env.PUBLIC_URL + '/images/whatsapp-logo.png'} alt="Grupo WhatsApp" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/unidade_tatica_airsoft/" target="_blank" rel="noopener noreferrer">
            <img src={process.env.PUBLIC_URL + '/images/instagram-logo.png'} alt="Instagram" />
          </a>
        </li>
      </ul>
    </div>
    <div className="logo">
      <a href="/">
        <img src={logo} alt="Logo" className="footer-logo" />
      </a>
    </div>
    <div className="fields">
      <h3>Campos</h3>
      <ul>
        <li>
          <a href="https://maps.app.goo.gl/zNKffFuPJ3orHrru8" target="_blank" rel="noopener noreferrer">
            <img src={process.env.PUBLIC_URL + '/images/loc.png'} alt="Chácara Argolo" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Layout;
