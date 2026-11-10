
import React from "react";
import Layout from "../components/Layout";
import "./Regras.css";
import { Helmet } from "react-helmet-async";

const Regras = () => {
  const regrasGerais = [
    {
      title: "FPS e Joules",
      text: "Respeite o limite de potência permitido para sua classe de equipamento."
    },
    {
      title: "Operador eliminado",
      text: 'Ao ser atingido, levante a mão e grite "Morto".'
    },
    {
      title: "Contato físico",
      text: "Empurrões, agarrões ou qualquer tipo de agressão física são proibidos."
    },
    {
      title: "Distância mínima",
      text: "Cada classe possui uma distância obrigatória de disparo. Respeite os limites."
    },
    {
      title: "Highlander",
      text: "Não será tolerado jogador que não acusa os acertos recebidos."
    },
    {
      title: "Tarzan",
      text: "Discussões e reclamações durante o jogo não serão aceitas. Informe os organizadores."
    },
    {
      title: "Rendimento",
      text: "Opcional, exceto quando o operador for tocado pelas costas."
    }
  ];

  const obrigatorios = [
    {
      number: "01",
      title: "Óculos de proteção",
      text: "Uso obrigatório durante TODO o tempo no campo."
    },
    {
      number: "02",
      title: "Pano vermelho",
      text: "Obrigatório para sinalizar operador eliminado."
    },
    {
      number: "03",
      title: "Ataduras",
      text: "Leve pelo menos 4 ataduras ou torniquetes conforme briefing."
    }
  ];

  const recomendacoes = [
    {
      title: "Calçado fechado",
      text: "Utilize botas ou tênis reforçados."
    },
    {
      title: "Hidratação",
      text: "Leve água durante a partida."
    },
    {
      title: "Equipamento",
      text: "Revise sua arma e equipamentos antes do jogo."
    }
  ];

  const classes = [
    {
      name: "ASSAULT",
      image: "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FASSAULT.png?alt=media&token=7f5c14bd-5f63-4283-afb0-e9b8d1b702e9",
      fps: "400",
      joules: "1.52J",
      distance: "Sem limite de distância",
      description: "Fuzis de assalto"
    },
    {
      name: "D.M.R.",
      image: "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FDMR.png?alt=media&token=722e184e-dc05-43b9-b860-c167265f6ed8",
      fps: "450",
      joules: "1.9J",
      distance: "20 metros",
      description: "Designated Marksman Rifle"
    },
    {
      name: "SUPPORT",
      image: "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FSUPPORT.png?alt=media&token=5bc8710d-0686-4580-88a3-e399b7e031a2",
      fps: "400",
      joules: "1.52J",
      distance: "7 metros",
      description: "Armas de suporte"
    },
    {
      name: "SNIPER",
      image: "https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FM24.png?alt=media&token=3b8dc0a2-8db1-49af-b00d-1e3ec19a276e",
      fps: "550",
      joules: "2.81J",
      distance: "30 metros",
      description: "Rifles de precisão"
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Regras do Campo | U.T.A Airsoft</title>
        <meta
          name="description"
          content="Consulte as regras, normas de segurança e limites de equipamentos da Unidade Tática Airsoft."
        />
      </Helmet>

      <main className="regras-container">

        {/* CABEÇALHO */}

        <header className="rules-hero">

          <div className="rules-overline">
            <span className="rules-status-dot"></span>
            U.T.A • UNIDADE TÁTICA AIRSOFT
          </div>

          <h1 className="regras-title">
            MANUAL DE CAMPO
          </h1>

          <p className="regras-intro">
            REGRAS, PROCEDIMENTOS E DIRETRIZES OPERACIONAIS
          </p>

          <div className="rules-hero-line">
            <span></span>
          </div>

          <div className="rules-warning">
            <span className="warning-symbol">!</span>

            <div>
              <strong>ATENÇÃO, OPERADOR</strong>
              <p>
                Conhecer e respeitar as regras é responsabilidade de todos.
                Segurança e respeito vêm antes de qualquer partida.
              </p>
            </div>
          </div>

        </header>

        {/* ITENS OBRIGATÓRIOS */}

        <section className="rules-section">

          <div className="rules-section-heading">
            <div>
              <span className="rules-kicker">01 • SEGURANÇA</span>
              <h2>ITENS OBRIGATÓRIOS</h2>
            </div>

            <span className="rules-section-tag">ESSENCIAL</span>
          </div>

          <div className="mandatory-grid">

            {obrigatorios.map((item) => (
              <article className="mandatory-card" key={item.number}>

                <span className="mandatory-number">
                  {item.number}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

              </article>
            ))}

          </div>

        </section>

        {/* REGRAS GERAIS */}

        <section className="rules-section">

          <div className="rules-section-heading">
            <div>
              <span className="rules-kicker">02 • CONDUTA</span>
              <h2>REGRAS GERAIS</h2>
            </div>

            <span className="rules-section-tag">
              07 DIRETRIZES
            </span>
          </div>

          <div className="general-rules">

            {regrasGerais.map((regra, index) => (
              <article className="general-rule" key={index}>

                <span className="general-rule-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="general-rule-content">
                  <h3>{regra.title}</h3>
                  <p>{regra.text}</p>
                </div>

                <span className="general-rule-marker"></span>

              </article>
            ))}

          </div>

        </section>

        {/* RECOMENDAÇÕES */}

        <section className="rules-section">

          <div className="rules-section-heading">
            <div>
              <span className="rules-kicker">03 • PREPARAÇÃO</span>
              <h2>RECOMENDAÇÕES</h2>
            </div>

            <span className="rules-section-tag">
              BOAS PRÁTICAS
            </span>
          </div>

          <div className="recommendations-grid">

            {recomendacoes.map((item, index) => (
              <article className="recommendation-card" key={index}>

                <span className="recommendation-number">
                  0{index + 1}
                </span>

                <h3>{item.title}</h3>
                <p>{item.text}</p>

              </article>
            ))}

          </div>

        </section>

        {/* CLASSES */}

        <section className="rules-section classes-section">

          <div className="rules-section-heading">
            <div>
              <span className="rules-kicker">04 • EQUIPAMENTOS</span>
              <h2>REGRAS POR CLASSE</h2>
            </div>

            <span className="rules-section-tag">
              LIMITES TÉCNICOS
            </span>
          </div>

          <p className="classes-intro">
            Confira os limites de potência e as distâncias mínimas
            estabelecidas para cada categoria de equipamento.
          </p>

          <div className="classes-grid">

            {classes.map((item, index) => (
              <article className="class-card" key={item.name}>

                <div className="class-card-header">
                  <span>CLASSE 0{index + 1}</span>
                  <span className="class-indicator"></span>
                </div>

                <div className="class-image-container">
                  <img
                    src={item.image}
                    alt={`Equipamento classe ${item.name}`}
                    loading="lazy"
                  />
                </div>

                <div className="class-card-info">

                  <h3>{item.name}</h3>
                  <span className="class-description">
                    {item.description}
                  </span>

                  <div className="class-stats">

                    <div className="class-stat">
                      <span>VELOCIDADE</span>
                      <strong>{item.fps} <small>FPS</small></strong>
                    </div>

                    <div className="class-stat">
                      <span>JOULE</span>
                      <strong>{item.joules}</strong>
                    </div>

                  </div>

                  <div className="class-distance">
                    <span>DISTÂNCIA MÍNIMA</span>
                    <strong>{item.distance}</strong>
                  </div>

                  {item.name === "SUPPORT" && (
                    <div className="class-extra">
                      FULL PERMITIDO
                    </div>
                  )}

                </div>

              </article>
            ))}

          </div>

        </section>

        {/* RODAPÉ */}

        <footer className="rules-footer">

          <div className="rules-footer-line"></div>

          <h2>JOGUE COM HONRA.</h2>

          <p>
            RESPEITO • SEGURANÇA • HONESTIDADE
          </p>

          <span>
            U.T.A — UNIDADE TÁTICA AIRSOFT
          </span>

        </footer>

      </main>
    </Layout>
  );
};

export default Regras;
