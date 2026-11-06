
import React from "react";
import "./Layout.css";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";
import {
  FaInstagram,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaArrowUp,
  FaHome,
  FaImages,
  FaClipboardList,
  FaShieldAlt,
  FaCrosshairs,
} from "react-icons/fa";

const Layout = ({ children }) => {
  const voltarAoTopo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content page-animation">
        <div className="page-container">
          {children}
        </div>
      </main>

      {/* RODAPÉ TÁTICO */}
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
              <FaCrosshairs />
              NAVEGAÇÃO
            </h3>

            <div className="footer-links">

              <a href="/">
                <FaHome />
                Home
              </a>

              <a href="/midia">
                <FaImages />
                Galeria de Mídia
              </a>

              <a href="/Briefings">
                <FaClipboardList />
                Briefings
              </a>

              <a href="/regras">
                <FaShieldAlt />
                Regras da Unidade
              </a>

            </div>

          </div>

          {/* COMUNICAÇÃO */}
          <div className="footer-column">

            <h3 className="footer-heading">
              <FaCrosshairs />
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
                <FaInstagram />
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
                <FaWhatsapp />
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
              <FaCrosshairs />
              BASE OPERACIONAL
            </h3>

            <div className="footer-location">

              <div className="footer-location-icon">
                <FaMapMarkerAlt />
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
              <span>↗</span>
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
              <FaArrowUp />
            </button>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default Layout;
