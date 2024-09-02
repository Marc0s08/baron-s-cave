import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className={`floating-menu ${showSidebar ? 'show' : 'hide'}`}>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/midia">Mídia</a></li>
            <li><a href="/Briefings">Briefings</a></li>
            <li><a href="/Vendas">Vendas</a></li>
            <li><a href="/Aluguel">Aluguel</a></li>
          </ul>
        </nav>
      </div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      {showSidebar && <div className="blur-background"></div>}
      <nav className="horizontal-menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/midia">Mídia</a></li>
          <li><a href="/Briefings">Briefings</a></li>
          <li><a href="/Vendas">Vendas</a></li>
          <li><a href="/Aluguel">Aluguel</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
