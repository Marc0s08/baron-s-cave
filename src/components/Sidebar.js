
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
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu ao mudar de página
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Bloqueia a rolagem do fundo com o menu aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (link) => {
    if (link === "/") {
      return location.pathname === "/";
    }

    return location.pathname.toLowerCase() === link.toLowerCase();
  };

  return (
    <>
      {/* NAVBAR */}
      <header className={`navbar ${scroll ? "scrolled" : ""}`}>

        {/* IDENTIDADE VISUAL */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <div className="brand-logo-container">
            <img src={logo} alt="UTA" className="brand-logo" />
          </div>

          <div className="brand-text">
            <h2>UNIDADE TÁTICA</h2>
            <span>AIRSOFT</span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="desktop-menu">
          {menuItems.map((item, index) => (
            <Link
              key={item.title}
              to={item.link}
              className={isActive(item.link) ? "active" : ""}
            >
              <span className="menu-index">
                0{index + 1}
              </span>

              {item.title}
            </Link>
          ))}
        </nav>

        {/* BOTÃO MOBILE */}
        <button
          className={`menu-btn ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </header>

      {/* FUNDO ESCURO */}
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* MENU MOBILE */}
      <aside
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "show" : ""}`}
        aria-hidden={!menuOpen}
      >

        <div className="mobile-menu-header">
          <img src={logo} alt="UTA" />

          <div>
            <h3>UNIDADE TÁTICA</h3>
            <span>AIRSOFT</span>
          </div>
        </div>

        <div className="mobile-menu-label">
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
              <span className="mobile-menu-index">
                0{index + 1}
              </span>

              <span>{item.title}</span>

              <span className="mobile-menu-arrow">↗</span>
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <span className="mobile-status-dot"></span>
          UNIDADE TÁTICA AIRSOFT
          <small>CHÁCARA ARGOLO</small>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
