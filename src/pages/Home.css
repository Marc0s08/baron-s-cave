
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Layout from "../components/Layout";
import Ranking from "../components/Ranking";
import { Helmet } from "react-helmet-async";
import "./Home.css";

// Imagens utilizadas nas seções fixas da página
const imagens = {
  hero: "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FWhatsApp%20Image%202026-11-06%20at%2014.24.18.jpeg?alt=media&token=7afb3604-5bcd-43f3-a693-837f0cdf5fc4",

  equipe: "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FWhatsApp%20Image%202026-11-06%20at%2014.24.18.jpeg?alt=media&token=7afb3604-5bcd-43f3-a693-837f0cdf5fc4",

  estrategia: "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2FC%C3%A3es%20Militares.jpeg?alt=media&token=18369fec-ed4c-4dfb-ab1d-e88393b31bda",

  combate: "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fcombat.jpg?alt=media&token=62c1c1fb-4be0-4f08-85b1-1169358bb0a2"
};

// Verifica se o valor é uma URL de imagem
const ehUrlImagem = (valor) => {
  return (
    typeof valor === "string" &&
    /^https?:\/\//i.test(valor.trim()) &&
    /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(valor.trim())
  );
};

// Extrai imagens de diferentes formatos de documentos
const extrairMidias = (data) => {
  let imagensEncontradas = [];

  const adicionar = (valor) => {
    if (Array.isArray(valor)) {
      valor.forEach(adicionar);
      return;
    }

    if (typeof valor === "object" && valor !== null) {
      adicionar(valor.url || valor.imageUrl || valor.src);
      return;
    }

    if (ehUrlImagem(valor)) {
      imagensEncontradas.push(valor.trim());
    }
  };

  // Formato atual
  adicionar(data.images);

  // Formato legado
  adicionar(data.imageUrl);

  // Outros formatos possíveis
  adicionar(data.image);
  adicionar(data.value);

  // Campos dinâmicos em formato de array
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
  }

  // Campos dinâmicos em formato de objeto
  if (data.fields && typeof data.fields === "object" && !Array.isArray(data.fields)) {
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

  // Busca as mídias em tempo real no Firestore
  useEffect(() => {
    const referencia = collection(db, "midia");

    const cancelarInscricao = onSnapshot(
      referencia,
      (snapshot) => {
        const todasImagens = [];

        snapshot.forEach((documento) => {
          const data = documento.data();
          const imagensDocumento = extrairMidias(data);

          imagensDocumento.forEach((url, index) => {
            todasImagens.push({
              id: `${documento.id}-${index}`,
              url,
              titulo:
                data.title ||
                data.name ||
                data.titleImage ||
                "Registro U.T.A."
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
          content="Conheça a Unidade Tática Airsoft. Estratégia, disciplina, adrenalina e trabalho em equipe."
        />
      </Helmet>

      <div className="home-container">

        {/* BANNER PRINCIPAL */}
        <section
          className="home-hero"
          style={{ backgroundImage: `url("${imagens.hero}")` }}
        >
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <span className="hero-label">
              UNIDADE TÁTICA AIRSOFT
            </span>

            <h1>
              MAIS QUE UM JOGO.
              <br />
              <span>UMA OPERAÇÃO.</span>
            </h1>

            <p>
              Estratégia, disciplina e trabalho em equipe.
              Entre em campo, supere desafios e faça parte da missão.
            </p>

            <div className="hero-buttons">
              <Link to="/Briefings" className="hero-button primary">
                CONHEÇA AS OPERAÇÕES
              </Link>

              <Link to="/midia" className="hero-button secondary">
                VER GALERIA
              </Link>
            </div>
          </div>

          <div className="hero-bottom-info">
            <span>● UNIDADE TÁTICA AIRSOFT</span>
            <span>CHÁCARA ARGOLO</span>
          </div>
        </section>

        {/* INDICADORES */}
        <section className="home-stats">
          <div className="stat-item">
            <span className="stat-icon">◎</span>
            <div>
              <strong>ESTRATÉGIA</strong>
              <small>Cada movimento importa</small>
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">⌖</span>
            <div>
              <strong>DISCIPLINA</strong>
              <small>Preparação para a missão</small>
            </div>
          </div>

          <div className="stat-item">
            <span className="stat-icon">✦</span>
            <div>
              <strong>OPERAÇÕES</strong>
              <small>Desafios em equipe</small>
            </div>
          </div>
        </section>

        {/* SOBRE A UTA */}
        <section className="home-about">
          <div className="about-image">
            <img src={imagens.estrategia} alt="Ambiente tático" />
            <span className="image-tag">U.T.A / CAMPO</span>
          </div>

          <div className="about-content">
            <span className="section-kicker">QUEM SOMOS</span>

            <h2>
              PREPARAÇÃO.
              <br />
              <span>ESTRATÉGIA.</span>
              <br />
              TRABALHO EM EQUIPE.
            </h2>

            <p>
              O airsoft vai muito além dos equipamentos. É uma experiência
              que exige comunicação, raciocínio, disciplina e confiança
              entre os operadores.
            </p>

            <p>
              Na Unidade Tática Airsoft, cada partida representa uma nova
              missão, com objetivos, desafios e oportunidades de evolução.
            </p>

            <Link to="/regras" className="text-link">
              CONHEÇA AS REGRAS <span>→</span>
            </Link>
          </div>
        </section>

        {/* DESTAQUES */}
        <section className="home-highlights">
          <div className="section-heading">
            <div>
              <span className="section-kicker">NOSSO UNIVERSO</span>
              <h2>O QUE MOVE A OPERAÇÃO</h2>
            </div>

            <span className="section-number">01 / 03</span>
          </div>

          <div className="highlight-grid">
            <article className="highlight-card">
              <img src={imagens.equipe} alt="Trabalho em equipe" />

              <div className="highlight-card-content">
                <span>01 — COOPERAÇÃO</span>
                <h3>TRABALHO EM EQUIPE</h3>
                <p>
                  Comunicação e confiança são fundamentais para alcançar
                  os objetivos da missão.
                </p>
              </div>
            </article>

            <article className="highlight-card">
              <img src={imagens.estrategia} alt="Pensamento estratégico" />

              <div className="highlight-card-content">
                <span>02 — PLANEJAMENTO</span>
                <h3>PENSAMENTO ESTRATÉGICO</h3>
                <p>
                  Cada cenário exige análise, planejamento e decisões
                  rápidas.
                </p>
              </div>
            </article>

            <article className="highlight-card">
              <img src={imagens.combate} alt="Experiência de airsoft" />

              <div className="highlight-card-content">
                <span>03 — EXPERIÊNCIA</span>
                <h3>ADRENALINA</h3>
                <p>
                  Missões imersivas que colocam à prova as habilidades
                  de cada operador.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* GAVETA DE MÍDIAS DO FIREBASE */}
        <section className="media-drawer">
          <div className="media-drawer-header">
            <div>
              <span className="section-kicker">REGISTROS DE CAMPO</span>

              <h2>POR TRÁS DE CADA OPERAÇÃO</h2>

              <p>
                Momentos, equipes e missões registrados em campo.
              </p>
            </div>

            <Link to="/midia" className="media-all-button">
              ACESSAR TODAS AS MÍDIAS <span>↗</span>
            </Link>
          </div>

          {carregandoMidias ? (
            <div className="media-loading">
              <span className="media-loader"></span>
              CARREGANDO REGISTROS...
            </div>
          ) : midias.length > 0 ? (
            <div className="media-drawer-gallery">
              {midias.slice(0, 3).map((midia, index) => (
                <Link
                  to="/midia"
                  className={`media-photo ${
                    index === 0 ? "media-photo-large" : ""
                  }`}
                  key={midia.id}
                >
                  <img
                    src={midia.url}
                    alt={midia.titulo}
                    loading="lazy"
                  />

                  <div className="media-photo-caption">
                    <span>
                      REGISTRO {String(index + 1).padStart(2, "0")}
                    </span>

                    <strong>{midia.titulo}</strong>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="media-empty">
              <span>▧</span>
              <h3>NENHUM REGISTRO DISPONÍVEL</h3>
              <p>
                As próximas imagens cadastradas na galeria aparecerão aqui.
              </p>
            </div>
          )}

          <Link to="/midia" className="media-mobile-link">
            EXPLORAR GALERIA COMPLETA →
          </Link>
        </section>

        {/* REGRAS */}
        <section className="home-rules">
          <div className="rules-heading">
            <span className="section-kicker">
              SEGURANÇA EM PRIMEIRO LUGAR
            </span>

            <h2>ANTES DE ENTRAR EM CAMPO</h2>

            <p>
              A segurança e o respeito são responsabilidades de todos
              os operadores.
            </p>
          </div>

          <div className="rules-grid">
            <div className="rule-card">
              <span>01</span>
              <div>
                <h3>PROTEÇÃO OCULAR</h3>
                <p>
                  Óculos de proteção obrigatórios durante toda a partida.
                </p>
              </div>
            </div>

            <div className="rule-card">
              <span>02</span>
              <div>
                <h3>EQUIPAMENTOS</h3>
                <p>
                  Confira suas condições antes de iniciar a operação.
                </p>
              </div>
            </div>

            <div className="rule-card">
              <span>03</span>
              <div>
                <h3>CONDUTA</h3>
                <p>
                  Respeite os operadores, as regras e as orientações do campo.
                </p>
              </div>
            </div>
          </div>

          <div className="rules-footer">
            <Link to="/regras">
              LER TODAS AS REGRAS <span>→</span>
            </Link>
          </div>
        </section>

        {/* RANKING */}
        <section className="home-ranking">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                EVOLUÇÃO DOS OPERADORES
              </span>

              <h2>RANKING U.T.A.</h2>
            </div>

            <span className="section-number">RANK / UTA</span>
          </div>

          <Ranking />
        </section>

        {/* CHAMADA FINAL */}
        <section className="home-cta">
          <span className="section-kicker">
            SUA PRÓXIMA MISSÃO COMEÇA AQUI
          </span>

          <h2>ESTÁ PRONTO PARA ENTRAR EM CAMPO?</h2>

          <p>
            Conheça nossas operações e acompanhe os registros
            da Unidade Tática Airsoft.
          </p>

          <Link to="/Briefings" className="hero-button primary">
            EXPLORAR OPERAÇÕES →
          </Link>
        </section>

      </div>
    </Layout>
  );
};

export default Home;
