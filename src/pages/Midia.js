
import React, { useEffect, useState } from "react";
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

  return (
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

        {expandedImage && (
          <div
            className="image-modal"
            onClick={() => setExpandedImage(null)}
          >
            <img
              src={expandedImage}
              alt="Imagem ampliada"
              decoding="async"
            />
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Midia;
