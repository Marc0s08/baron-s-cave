import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scroll ? "scrolled" : ""}`}>

        <a href="/" className="brand">

          <img src={logo} alt="UTA" className="brand-logo" />

          <div className="brand-text">
            <h2>UNIDADE TÁTICA</h2>
            <span>AIRSOFT</span>
          </div>

        </a>

        <nav className="desktop-menu">
          {menuItems.map((item) => (
            <a key={item.title} href={item.link}>
              {item.title}
            </a>
          ))}
        </nav>

        <button
          className={`menu-btn ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          ☰
        </button>

      </header>

      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />

      <aside className={`mobile-menu ${menuOpen ? "show" : ""}`}>
 
        <nav>

          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.link}
              onClick={closeMenu}
            >
              {item.title}
            </a>
          ))}

        </nav>

      </aside>
    </>
  );
};

export default Sidebar;