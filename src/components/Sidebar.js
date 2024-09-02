import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰ Menu
      </button>
      {showSidebar && <div className="blur-background"></div>} {/* Fundo embaçado somente quando o menu estiver aberto */}
      <div className={`floating-menu ${showSidebar ? 'show' : 'hide'}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/midia">Mídia</a></li>
          <li><a href="/Briefings">Briefings</a></li>
          <li><a href="/Vendas">Vendas</a></li>
          <li><a href="/Aluguel">Aluguel</a></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
