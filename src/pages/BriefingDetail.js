
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import "./BriefingDetail.css";

const BriefingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [briefing, setBriefing] = useState(null);
  const [error, setError] = useState(null);
  const [imageExpanded, setImageExpanded] = useState(false);

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        const docRef = doc(db, "Briefings", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBriefing(docSnap.data());
          setError(null);
        } else {
          setError("Briefing não encontrado.");
        }
      } catch (err) {
        setError("Não foi possível carregar o briefing.");
        console.error("Erro ao buscar briefing:", err);
      }
    };

    fetchBriefing();
  }, [id]);

  // FECHAR IMAGEM COM ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setImageExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (error) {
    return (
      <Layout>
        <Helmet>
          <title>Briefing | U.T.A</title>
        </Helmet>

        <div className="briefing-status">
          <div className="status-icon">!</div>
          <h2>OPERAÇÃO INDISPONÍVEL</h2>
          <p>{error}</p>

          <button
            className="back-button"
            onClick={() => navigate("/Briefings")}
          >
            ← VOLTAR AOS BRIEFINGS
          </button>
        </div>
      </Layout>
    );
  }

  if (!briefing) {
    return (
      <Layout>
        <Helmet>
          <title>Carregando briefing | U.T.A</title>
        </Helmet>

        <div className="briefing-status">
          <div className="loading-indicator"></div>
          <h2>CARREGANDO OPERAÇÃO</h2>
          <p>Obtendo informações da missão...</p>
        </div>
      </Layout>
    );
  }

  const briefingImage = briefing.images?.[0];

  return (
    <Layout>
      <Helmet>
        <title>Briefing da Operação | U.T.A</title>
      </Helmet>

      <div className="briefing-detail-container">

        {/* CABEÇALHO */}

        <header className="operation-header">

          <div className="operation-topline">
            <span className="operation-indicator"></span>
            UNIDADE TÁTICA AIRSOFT
          </div>

          <h1>BRIEFING DA OPERAÇÃO</h1>

          <p>DOCUMENTO DE INFORMAÇÕES OPERACIONAIS</p>

          <div className="operation-divider">
            <span></span>
          </div>

        </header>

        {/* IMAGEM PRINCIPAL */}

        {briefingImage && (
          <section className="operation-image-section">

            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  MATERIAL VISUAL
                </span>

                <h2>REGISTRO DA OPERAÇÃO</h2>
              </div>

              <span className="section-reference">
                REGISTRO 01
              </span>
            </div>

            <button
              type="button"
              className="operation-image-card"
              onClick={() => setImageExpanded(true)}
              aria-label="Ampliar imagem da operação"
            >
              <img
                src={briefingImage}
                alt="Imagem do briefing da operação"
                className="operation-main-image"
              />

              <span className="image-zoom-label">
                <span>⌕</span>
                CLIQUE PARA AMPLIAR
              </span>
            </button>

          </section>
        )}

        {/* INFORMAÇÕES DA MISSÃO */}

        <section className="operation-information">

          <div className="section-heading information-heading">
            <div>
              <span className="section-kicker">
                DIRETRIZES E ORIENTAÇÕES
              </span>

              <h2>INFORMAÇÕES DA MISSÃO</h2>
            </div>

            <span className="section-reference">
              {String(briefing.fields?.length || 0).padStart(2, "0")} SEÇÕES
            </span>
          </div>

          {briefing.fields && briefing.fields.length > 0 ? (

            <div className="information-list">

              {briefing.fields.map((field, index) => (

                <article
                  className="information-card"
                  key={index}
                >

                  <div className="information-index">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="information-body">

                    <div className="information-title-row">
                      <span className="information-label">
                        INFORMAÇÃO OPERACIONAL
                      </span>

                      <span className="information-line"></span>
                    </div>

                    <h3 className="information-title">
                      {field.name || "Sem título"}
                    </h3>

                    <p className="information-text">
                      {field.value || "Sem informação disponível."}
                    </p>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="empty-information">
              Nenhuma informação disponível para esta operação.
            </div>

          )}

        </section>

        {/* RODAPÉ */}

        <footer className="briefing-bottom">

          <button
            className="back-button"
            onClick={() => navigate("/Briefings")}
          >
            ← VOLTAR AOS BRIEFINGS
          </button>

          <span>U.T.A • UNIDADE TÁTICA AIRSOFT</span>

        </footer>

      </div>

      {/* IMAGEM AMPLIADA */}

      {imageExpanded && briefingImage && (

        <div
          className="image-lightbox"
          onClick={() => setImageExpanded(false)}
        >

          <button
            className="lightbox-close"
            onClick={() => setImageExpanded(false)}
            aria-label="Fechar imagem"
          >
            ×
          </button>

          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >

            <img
              src={briefingImage}
              alt="Imagem ampliada da operação"
            />

            <span>REGISTRO FOTOGRÁFICO • U.T.A</span>

          </div>

        </div>

      )}

    </Layout>
  );
};

export default BriefingDetail;
