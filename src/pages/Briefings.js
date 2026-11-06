
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Helmet } from "react-helmet-async";
import "./Briefings.css";

const Briefings = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Briefings"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const missions = data.filter(
          (item) => Array.isArray(item.images) && item.images.length > 0
        );

        setContent(missions);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Erro ao carregar briefings:", error);
        setError("Não foi possível carregar os briefings. Tente novamente.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Briefings | U.T.A Airsoft</title>
      </Helmet>

      <div className="briefings-page">
        <div className="briefings-container">

          <header className="briefings-header">
            <div className="briefings-line"></div>

            <span className="briefings-label">
              UNIDADE TÁTICA AIRSOFT
            </span>

            <h1>BRIEFINGS</h1>

            <p>
              Planejamento operacional, instruções e informações das missões.
            </p>

            <div className="briefings-counter">
              <span>{content.length}</span>
              <small>
                {content.length === 1 ? "BRIEFING DISPONÍVEL" : "BRIEFINGS DISPONÍVEIS"}
              </small>
            </div>
          </header>

          {loading ? (
            <div className="briefings-state">
              <div className="briefings-spinner"></div>
              <p>Carregando briefings...</p>
            </div>
          ) : error ? (
            <div className="briefings-state briefings-error">
              <p>{error}</p>
            </div>
          ) : content.length === 0 ? (
            <div className="briefings-state">
              <h3>NENHUM BRIEFING DISPONÍVEL</h3>
              <p>As próximas instruções operacionais serão publicadas aqui.</p>
            </div>
          ) : (
            <div className="mission-grid">
              {content.map((item, index) => (
                <a
                  key={item.id}
                  href={`/briefings/${item.id}`}
                  className="mission-card"
                  aria-label={`Acessar briefing ${item.title || index + 1}`}
                >
                  <div className="mission-card-top">
                    <span className="mission-number">
                      OPERAÇÃO {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="mission-status">
                      <span></span>
                      DISPONÍVEL
                    </span>
                  </div>

                  <div className="mission-image-container">
                    <img
                      src={item.images[0]}
                      alt={item.title || `Briefing ${index + 1}`}
                      className="mission-image"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="mission-image-overlay">
                      <span>ACESSAR BRIEFING</span>
                    </div>
                  </div>

                  <div className="mission-card-bottom">
                    <span>VISUALIZAR INSTRUÇÕES</span>
                    <span className="mission-arrow">→</span>
                  </div>
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default Briefings;
