
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./Briefings.css";
import { Helmet } from "react-helmet-async";

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
          ...doc.data()
        }));

        const missions = data.filter(
          (item) => item.images && item.images.length > 0
        );

        setContent(missions);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error(error);
        setError(error.message);
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

          <header className="briefing-title">
            <span className="briefing-subtitle">
              UNIDADE TÁTICA AIRSOFT
            </span>

            <h1>BRIEFINGS</h1>

            <p>
              Planejamento das operações e missões da U.T.A.
            </p>

            <div className="briefing-title-line"></div>
          </header>

          {loading ? (
            <div className="briefings-message">
              Carregando missões...
            </div>
          ) : error ? (
            <p className="briefings-error">{error}</p>
          ) : content.length === 0 ? (
            <div className="briefings-message">
              Nenhuma missão disponível.
            </div>
          ) : (
            <div className="mission-grid">
              {content.map((item) => (
                <Link
                  to={`/briefings/${item.id}`}
                  key={item.id}
                  className="mission-card"
                >
                  <div
  className="mission-image-container"
  style={{
    backgroundImage: `url("${item.images[0]}")`
  }}
>
  <img
    src={item.images[0]}
    alt={item.title || "Briefing U.T.A"}
    className="mission-image"
    loading="lazy"
  />
</div>

                  <div className="mission-footer">
                    <span>MAIS INFORMAÇÕES</span>
                    <span className="mission-arrow">↗</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default Briefings;
