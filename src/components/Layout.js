import React from "react";
import "./Layout.css";
import Sidebar from "./Sidebar";
import logo from "../assets/logo.png";

const Layout = ({ children }) => {
  return (
    <div className="layout">

      <Sidebar />

      <main className="main-content page-animation">

        <div className="page-container">

          {children}

        </div>

      </main>


      <footer className="footer">

        <div className="footer-container">


          <div className="footer-column">

            <img
              src={logo}
              alt="UTA"
              className="footer-logo"
            />

            <h3>
              Unidade Tática Airsoft
            </h3>

            <p>
              Estratégia • Honra • Trabalho em equipe
            </p>

          </div>


          <div className="footer-column">

            <h3>
              Redes Sociais
            </h3>


            <a
              href="https://www.instagram.com/unidade_tatica_airsoft/"
              target="_blank"
              rel="noreferrer"
            >
              📷 Instagram
            </a>


            <a
              href="https://chat.whatsapp.com/DmTld80rm2yElfHfB8LYVS"
              target="_blank"
              rel="noreferrer"
            >
              🟢 WhatsApp
            </a>


          </div>



          <div className="footer-column">

            <h3>
              Campo
            </h3>


            <a
              href="https://maps.app.goo.gl/zNKffFuPJ3orHrru8"
              target="_blank"
              rel="noreferrer"
            >
              📍 Localização
            </a>


          </div>


        </div>


        <div className="footer-copy">

          © {new Date().getFullYear()} Unidade Tática Airsoft

        </div>


      </footer>


    </div>
  );
};


export default Layout;