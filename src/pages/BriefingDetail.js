
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
        } else {
          setError("Briefing não encontrado.");
        }
      } catch (err) {
        console.error("Erro ao buscar briefing:", err);
        setError("Não foi possível carregar o briefing.");
      }
    };

    fetchBriefing();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setImageExpanded(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (error) {
    return (
      <Layout>
        <Helmet>
          <title>Briefing | U.T.A</title>
        </Helmet>

        <div className="briefing-status">
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
  const fields = briefing.fields || [];

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

          <h1 className="mission-title">
            BRIEFING DA OPERAÇÃO
          </h1>

          <p>DOCUMENTO DE INFORMAÇÕES OPERACIONAIS</p>

          <div className="operation-divider">
            <span></span>
          </div>

        </header>

        {/* IMAGEM - MANTIDA NO ESTILO ORIGINAL */}

        {briefingImage && (
          <section className="image-gallery">

            <button
              type="button"
              className="detail-image-card"
              onClick={() => setImageExpanded(true)}
              aria-label="Ampliar imagem da operação"
            >
              <img
                src={briefingImage}
                alt="Imagem do briefing"
                className="briefing-detail-image"
              />
            </button>

          </section>
        )}

        {/* INFORMAÇÕES ESTILO JORNAL */}

        <section className="briefing-editorial">

          <div className="editorial-header">
            <div>
              <span className="editorial-kicker">
                DOCUMENTO OPERACIONAL
              </span>

              <h2>INFORMAÇÕES DA MISSÃO</h2>
            </div>

            <span className="editorial-count">
              {String(fields.length).padStart(2, "0")} REGISTROS
            </span>
          </div>

          {fields.length > 0 ? (

            <div className="editorial-grid">

              {fields.map((field, index) => (

                <article
                  className={`editorial-item editorial-item-${index + 1}`}
                  key={index}
                >

                  <div className="editorial-item-top">
                    <span className="editorial-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="editorial-category">
                      RELATÓRIO DE CAMPO
                    </span>
                  </div>

                  <h3 className="field-name">
                    {field.name || "Sem título"}
                  </h3>

                  <div className="editorial-rule"></div>

                  <p className="field-content">
                    {field.value || "Sem informação disponível."}
                  </p>

                </article>

              ))}

            </div>

          ) : (

            <div className="editorial-empty">
              Nenhuma informação disponível para esta operação.
            </div>

          )}

          <div className="editorial-footer">
            <span>U.T.A • UNIDADE TÁTICA AIRSOFT</span>
            <span>FIM DO DOCUMENTO</span>
          </div>

        </section>

        {/* VOLTAR */}

        <div className="briefing-bottom">
          <button
            className="back-button"
            onClick={() => navigate("/Briefings")}
          >
            ← VOLTAR AOS BRIEFINGS
          </button>
        </div>

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
