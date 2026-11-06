
import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";

const Icon = ({ name }) => {
  const icons = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-7h6v7" /></>,
    media: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
    briefing: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" /><path d="m9 12 2 2 4-4" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    whatsapp: <><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5Z" /><path d="M9 9c.5 2 2 3.5 4 4l1-1 2 1c-.5 2-2 2.5-4 2-3-1-5-3-5-5 0-1 1-2 2-1Z" /></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    up: <><path d="m18 15-6-6-6 6" /></>,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
};

const Layout = ({ children }) => {
  const voltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content page-animation">
        <div className="page-container">
          {children}
        </div>
      </main>

      <footer className="footer">

        <div className="footer-top-line" />

        <div className="footer-container">

          {/* IDENTIDADE */}
          <div className="footer-column footer-about">

            <div className="footer-brand">
              <img
                src={logo}
                alt="Unidade Tática Airsoft"
                className="footer-logo"
              />

              <div>
                <h2>UNIDADE TÁTICA</h2>
                <span>AIRSOFT</span>
              </div>
            </div>

            <p className="footer-description">
              Uma unidade formada por operadores comprometidos com
              estratégia, disciplina e trabalho em equipe.
            </p>

            <div className="footer-unit-status">
              <span className="footer-status-dot" />
              UNIDADE OPERACIONAL
            </div>

          </div>

          {/* NAVEGAÇÃO */}
          <div className="footer-column">

            <h3 className="footer-heading">
              <Icon name="target" />
              NAVEGAÇÃO
            </h3>

            <div className="footer-links">

              <Link to="/">
                <Icon name="home" />
                Home
              </Link>

              <Link to="/midia">
                <Icon name="media" />
                Galeria de Mídia
              </Link>

              <Link to="/Briefings">
                <Icon name="briefing" />
                Briefings
              </Link>

              <Link to="/regras">
                <Icon name="shield" />
                Regras da Unidade
              </Link>

            </div>

          </div>

          {/* COMUNICAÇÃO */}
          <div className="footer-column">

            <h3 className="footer-heading">
              <Icon name="target" />
              COMUNICAÇÃO
            </h3>

            <p className="footer-column-description">
              Entre em contato e acompanhe as atividades da unidade.
            </p>

            <div className="footer-social-links">

              <a
                href="https://www.instagram.com/unidade_tatica_airsoft/"
                target="_blank"
                rel="noreferrer"
                className="footer-social instagram"
              >
                <Icon name="instagram" />
                <span>
                  <strong>Instagram</strong>
                  <small>@unidade_tatica_airsoft</small>
                </span>
              </a>

              <a
                href="https://chat.whatsapp.com/DmTld80rm2yElfHfB8LYVS"
                target="_blank"
                rel="noreferrer"
                className="footer-social whatsapp"
              >
                <Icon name="whatsapp" />
                <span>
                  <strong>WhatsApp</strong>
                  <small>Grupo da Unidade</small>
                </span>
              </a>

            </div>

          </div>

          {/* LOCALIZAÇÃO */}
          <div className="footer-column">

            <h3 className="footer-heading">
              <Icon name="target" />
              BASE OPERACIONAL
            </h3>

            <div className="footer-location">

              <div className="footer-location-icon">
                <Icon name="location" />
              </div>

              <div>
                <strong>CHÁCARA ARGOLO</strong>
                <p>
                  Campo de operações da Unidade Tática Airsoft.
                </p>
              </div>

            </div>

            <a
              href="https://maps.app.goo.gl/zNKffFuPJ3orHrru8"
              target="_blank"
              rel="noreferrer"
              className="footer-map-button"
            >
              VER LOCALIZAÇÃO
              <Icon name="arrow" />
            </a>

          </div>

        </div>

        {/* FAIXA INFERIOR */}
        <div className="footer-bottom">

          <div className="footer-bottom-container">

            <div className="footer-copy">
              © {new Date().getFullYear()} U.T.A - Unidade Tática Airsoft
            </div>

            <div className="footer-motto">
              ESTRATÉGIA <span>•</span> HONRA <span>•</span> TRABALHO EM EQUIPE
            </div>

            <button
              className="footer-top-button"
              onClick={voltarAoTopo}
              aria-label="Voltar ao topo"
            >
              <Icon name="up" />
            </button>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Layout;
