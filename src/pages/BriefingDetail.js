
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
  const [selectedImage, setSelectedImage] = useState(null);

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
        setError(err.message);
      }
    };

    fetchBriefing();
  }, [id]);

  // FECHAR IMAGEM COM ESC E NAVEGAR COM AS SETAS
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedImage || !briefing?.images?.length) return;

      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedImage((current) =>
          (current + 1) % briefing.images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedImage((current) =>
          (current - 1 + briefing.images.length) %
          briefing.images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, briefing]);

  const images = briefing?.images || [];

  const previousImage = () => {
    setSelectedImage((current) =>
      (current - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setSelectedImage((current) =>
      (current + 1) % images.length
    );
  };

  if (error) {
    return (
      <Layout>
        <Helmet>
          <title>Briefing não encontrado | U.T.A</title>
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

  return (
    <Layout>
      <Helmet>
        <title>
          {briefing.title || "Briefing da Operação"} | U.T.A
        </title>
      </Helmet>

      <div className="briefing-detail-container">

        {/* CABEÇALHO */}

        <header className="operation-header">

          <div className="operation-topline">
            <span className="operation-indicator"></span>
            UNIDADE TÁTICA AIRSOFT
          </div>

          <h1>BRIEFING DA OPERAÇÃO</h1>

          <p>
            CENTRAL DE INFORMAÇÕES OPERACIONAIS
          </p>

          <div className="operation-divider">
            <span></span>
          </div>

        </header>

        {/* GALERIA */}

        {images.length > 0 && (
          <section className="briefing-section">

            <div className="section-heading">
              <div>
                <span className="section-kicker">REGISTROS VISUAIS</span>
                <h2>GALERIA DA OPERAÇÃO</h2>
              </div>

              <span className="image-counter">
                {images.length} {images.length === 1 ? "IMAGEM" : "IMAGENS"}
              </span>
            </div>

            <div className="image-gallery">

              {images.map((image, index) => (
                <button
                  className="detail-image-card"
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Ampliar imagem ${index + 1}`}
                >
                  <div className="image-number">
                    REGISTRO {String(index + 1).padStart(2, "0")}
                  </div>

                  <img
                    src={image}
                    alt={`Registro da operação ${index + 1}`}
                    className="briefing-detail-image"
                    loading="lazy"
                  />

                  <div className="image-expand">
                    <span>⌕</span>
                    AMPLIAR IMAGEM
                  </div>
                </button>
              ))}

            </div>
          </section>
        )}

        {/* INFORMAÇÕES */}

        <section className="briefing-section information-section">

          <div className="section-heading">
            <div>
              <span className="section-kicker">DADOS E ORIENTAÇÕES</span>
              <h2>INFORMAÇÕES DA MISSÃO</h2>
            </div>
          </div>

          {briefing.fields && briefing.fields.length > 0 ? (
            <div className="briefing-detail-content">

              {briefing.fields.map((field, index) => (
                <article
                  key={index}
                  className="field-card"
                >

                  <div className="field-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="field-information">

                    <h3 className="field-name">
                      {field.name || "Sem título"}
                    </h3>

                    <p className="field-content">
                      {field.value || "Sem informação"}
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

        {/* VOLTAR */}

        <div className="briefing-bottom">
          <button
            className="back-button"
            onClick={() => navigate("/Briefings")}
          >
            ← VOLTAR AOS BRIEFINGS
          </button>

          <span>U.T.A • UNIDADE TÁTICA AIRSOFT</span>
        </div>

      </div>

      {/* VISUALIZADOR DE IMAGEM */}

      {selectedImage !== null && (
        <div
          className="image-lightbox"
          onClick={() => setSelectedImage(null)}
        >

          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Fechar imagem"
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              className="lightbox-arrow lightbox-prev"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              aria-label="Imagem anterior"
            >
              ‹
            </button>
          )}

          <div
            className="lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >

            <img
              src={images[selectedImage]}
              alt={`Imagem ${selectedImage + 1}`}
            />

            <div className="lightbox-caption">
              REGISTRO {String(selectedImage + 1).padStart(2, "0")}
              {" / "}
              {String(images.length).padStart(2, "0")}
            </div>

          </div>

          {images.length > 1 && (
            <button
              className="lightbox-arrow lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="Próxima imagem"
            >
              ›
            </button>
          )}

        </div>
      )}

    </Layout>
  );
};

export default BriefingDetail;
