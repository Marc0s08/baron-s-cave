
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import logo from "../assets/logo.png";

const menuItems = [
  { title: "Home", link: "/" },
  { title: "Mídia", link: "/midia" },
  { title: "Briefings", link: "/Briefings" },
  { title: "Regras", link: "/regras" },
];

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("uta-menu-open", menuOpen);

    return () => {
      document.body.classList.remove("uta-menu-open");
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (link) => {
    if (link === "/") return location.pathname === "/";
    return location.pathname.toLowerCase() === link.toLowerCase();
  };

  return (
    <>
      <header className={`uta-navbar ${scroll ? "scrolled" : ""}`}>
        <Link to="/" className="uta-brand" onClick={closeMenu}>
          <div className="uta-brand-logo">
            <img src={logo} alt="UTA" />
          </div>

          <div className="uta-brand-text">
            <h2>UNIDADE TÁTICA</h2>
            <span>AIRSOFT</span>
          </div>
        </Link>

        <nav className="uta-desktop-menu">
          {menuItems.map((item, index) => (
            <Link
              key={item.title}
              to={item.link}
              className={isActive(item.link) ? "active" : ""}
            >
              <span>0{index + 1}</span>
              {item.title}
            </Link>
          ))}
        </nav>

        <button
          className={`uta-menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="uta-mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div
        className={`uta-menu-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="uta-mobile-menu"
        className={`uta-mobile-menu ${menuOpen ? "show" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="uta-mobile-header">
          <img src={logo} alt="UTA" />

          <div>
            <h3>UNIDADE TÁTICA</h3>
            <span>AIRSOFT</span>
          </div>
        </div>

        <div className="uta-mobile-label">
          <span>MENU PRINCIPAL</span>
          <span>U.T.A / 01</span>
        </div>

        <nav>
          {menuItems.map((item, index) => (
            <Link
              key={item.title}
              to={item.link}
              onClick={closeMenu}
              className={isActive(item.link) ? "active" : ""}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="uta-mobile-index">0{index + 1}</span>
              <span>{item.title}</span>
              <span className="uta-mobile-arrow">↗</span>
            </Link>
          ))}
        </nav>

        <div className="uta-mobile-footer">
          <div>
            <span className="uta-status-dot" />
            UNIDADE TÁTICA AIRSOFT
          </div>
          <small>CHÁCARA ARGOLO</small>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
