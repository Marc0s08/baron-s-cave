import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Layout from "../components/Layout";
import Ranking from "../components/Ranking";
import { Helmet } from "react-helmet-async";
import "./Home.css";

const imagemHero =
  "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FWhatsApp%20Image%202026-11-06%20at%2014.24.18.jpeg?alt=media&token=7afb3604-5bcd-43f3-a693-837f0cdf5fc4";

const ehUrlImagem = (valor) =>
  typeof valor === "string" && /^https?:\/\//i.test(valor.trim());

const extrairMidias = (data) => {
  const imagensEncontradas = [];

  const adicionar = (valor) => {
    if (Array.isArray(valor)) {
      valor.forEach(adicionar);
      return;
    }

    if (valor && typeof valor === "object") {
      adicionar(
        valor.url ||
        valor.imageUrl ||
        valor.src ||
        valor.downloadURL
      );
      return;
    }

    if (ehUrlImagem(valor)) {
      imagensEncontradas.push(valor.trim());
    }
  };

  adicionar(data.images);
  adicionar(data.imageUrl);
  adicionar(data.image);
  adicionar(data.value);

  if (Array.isArray(data.fields)) {
    data.fields.forEach((field) => {
      if (!field) return;

      const nome = String(field.name || "").toLowerCase();

      if (
        nome.includes("imagem") ||
        nome.includes("image") ||
        nome.includes("foto") ||
        nome.includes("url")
      ) {
        adicionar(field.value);
      }
    });
  } else if (data.fields && typeof data.fields === "object") {
    Object.entries(data.fields).forEach(([nome, valor]) => {
      const chave = nome.toLowerCase();

      if (
        chave.includes("imagem") ||
        chave.includes("image") ||
        chave.includes("foto") ||
        chave.includes("url")
      ) {
        adicionar(valor);
      }
    });
  }

  return [...new Set(imagensEncontradas)];
};

const Home = () => {
  const [midias, setMidias] = useState([]);
  const [carregandoMidias, setCarregandoMidias] = useState(true);

  useEffect(() => {
    const cancelarInscricao = onSnapshot(
      collection(db, "midia"),
      (snapshot) => {
        const todasImagens = [];

        snapshot.forEach((documento) => {
          const data = documento.data();
          const titulo =
            data.title ||
            data.name ||
            data.titleImage ||
            "Registro U.T.A.";

          extrairMidias(data).forEach((url, index) => {
            todasImagens.push({
              id: `${documento.id}-${index}`,
              url,
              titulo,
            });
          });
        });

        setMidias(todasImagens);
        setCarregandoMidias(false);
      },
      (error) => {
        console.error("Erro ao carregar mídias:", error);
        setCarregandoMidias(false);
      }
    );

    return () => cancelarInscricao();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>U.T.A | Unidade Tática Airsoft</title>
        <meta
          name="description"
          content="Unidade Tática Airsoft. Estratégia, disciplina e operações em equipe."
        />
      </Helmet>

      <main className="home-container">
        <section
          className="home-hero"
          style={{ backgroundImage: `url("${imagemHero}")` }}
        >
          <div className="hero-overlay" />

          <div className="hero-content">
            <span className="hero-label">
              UNIDADE TÁTICA AIRSOFT
            </span>

            <h1>
              U.T.A<span>.</span>
            </h1>

            <p>MAIS QUE UM JOGO. UMA OPERAÇÃO.</p>

            <Link to="/Briefings" className="hero-button">
              VER OPERAÇÕES <span>↗</span>
            </Link>
          </div>

          <div className="hero-bottom">
            <span>CHÁCARA ARGOLO</span>
            <span>EST. / DISC. / EQUIPE.</span>
          </div>
        </section>

        <section className="home-media">
          <div className="section-topline">
            <div>
              <span className="section-kicker">
                REGISTROS DE CAMPO
              </span>
              <h2>
                GALERIA <span>U.T.A.</span>
              </h2>
            </div>

            <Link to="/midia" className="section-link">
              VER TODAS <span>↗</span>
            </Link>
          </div>

          {carregandoMidias ? (
            <div className="media-state">
              CARREGANDO REGISTROS...
            </div>
          ) : midias.length > 0 ? (
            <div className="media-grid">
              {midias.slice(0, 3).map((midia, index) => (
                <Link
                  to="/midia"
                  className={`media-card media-card-${index + 1}`}
                  key={midia.id}
                  aria-label={`Abrir galeria: ${midia.titulo}`}
                >
                  <img
                    src={midia.url}
                    alt={midia.titulo}
                    loading="lazy"
                  />

                  <span className="media-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="media-card-title">
                    {midia.titulo}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="media-state">
              NENHUM REGISTRO DISPONÍVEL NO MOMENTO.
            </div>
          )}
        </section>

        <section className="home-ranking">
          <div className="section-topline">
            <div>
              <span className="section-kicker">
                EVOLUÇÃO DOS OPERADORES
              </span>
              <h2>
                RANKING <span>U.T.A.</span>
              </h2>
            </div>
          </div>

          <Ranking />
        </section>

        <section className="home-bottom">
          <div>
            <span className="section-kicker">
              CONDUTA OPERACIONAL
            </span>
            <h2>SEGURANÇA É PARTE DA MISSÃO.</h2>
          </div>

          <Link to="/regras" className="section-link">
            CONSULTAR REGRAS <span>↗</span>
          </Link>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
