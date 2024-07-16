import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/midia">Mídia</a></li>
          <li><a href="/contact">Contato</a></li>
        </ul>
      </nav>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰ Menu
      </button>
    </div>
  );
};

export default Sidebar;
