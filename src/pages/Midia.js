
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  limit,
  query
} from "firebase/firestore";
import "./Midia.css";
import { Helmet } from "react-helmet-async";

const Midia = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar imagens
  useEffect(() => {
    let active = true;

    const loadImages = async () => {
      try {
        const q = query(
          collection(db, "midia"),
          limit(40)
        );

        const snapshot = await getDocs(q);

        if (!active) return;

        const images = snapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(item => item.imageUrl);

        setContent(images);

      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      active = false;
    };
  }, []);

  // Fechar com ESC e bloquear rolagem
  useEffect(() => {
    if (!expandedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setExpandedImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedImage]);

  return (
    <>
      <Layout>
        <Helmet>
          <title>Mídia | U.T.A Airsoft</title>
        </Helmet>

        <div className="midia-container">

          <h1 className="midia-title">
            GALERIA U.T.A.
          </h1>

          <p className="midia-subtitle">
            Momentos, operações e registros do campo.
          </p>

          {loading && (
            <p className="midia-loading">
              Carregando imagens...
            </p>
          )}

          {error && (
            <p className="midia-error">
              {error}
            </p>
          )}

          <div className="midia-grid">
            {content.map(item => (
              <div
                key={item.id}
                className="midia-card"
                onClick={() => setExpandedImage(item.imageUrl)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title || "Imagem U.T.A."}
                  className="midia-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {!loading && content.length === 0 && !error && (
            <p className="midia-loading">
              Nenhuma imagem disponível.
            </p>
          )}

        </div>
      </Layout>

      {/* MODAL FORA DO LAYOUT */}
      {expandedImage && createPortal(
        <div
          className="image-modal"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="image-modal-close"
            onClick={() => setExpandedImage(null)}
            aria-label="Fechar imagem"
          >
            ×
          </button>

          <img
            src={expandedImage}
            alt="Imagem ampliada"
            className="image-modal-photo"
            onClick={(event) => event.stopPropagation()}
            decoding="async"
          />
        </div>,
        document.body
      )}
    </>
  );
};

export default Midia;
