import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [buttonRect, setButtonRect] = useState({});

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const button = document.querySelector('.toggle-btn');
    if (button) {
      setButtonRect(button.getBoundingClientRect());
    }
  }, [showSidebar]);

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      {showSidebar && <div className="blur-background"></div>}
      <div
        className={`floating-menu ${showSidebar ? 'show' : 'hide'}`}
        style={{
          top: buttonRect.top + buttonRect.height + window.scrollY + 10 + 'px', 
          left: buttonRect.left + 'px',
        }}
      >
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/midia">Mídia</a></li>
          <li><a href="/Briefings">Briefings</a></li>
          <li><a href="/Vendas">Vendas</a></li>
          <li><a href="/Aluguel">Aluguel</a></li>
        </ul>
      </div>
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
