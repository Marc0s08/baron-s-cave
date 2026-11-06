
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "./Ranking.css";

const ranks = [
  { points: 0, name: "Recruta" },
  { points: 1, name: "Aspirante" },
  { points: 51, name: "Soldado" },
  { points: 201, name: "Sargento" },
  { points: 401, name: "Tenente" },
  { points: 501, name: "Capitão" },
  { points: 601, name: "Comandante" },
  { points: 701, name: "Coronel" },
  { points: 801, name: "General" },
  { points: 1000, name: "Marechal" }
];

const getRank = (points) => {
  let rank = ranks[0].name;

  ranks.forEach((item) => {
    if (points >= item.points) {
      rank = item.name;
    }
  });

  return rank;
};

const getProgress = (points) => {
  const currentPoints = Math.max(0, points);

  let currentIndex = 0;

  ranks.forEach((item, index) => {
    if (currentPoints >= item.points) {
      currentIndex = index;
    }
  });

  const next = ranks[currentIndex + 1];

  if (!next) {
    return {
      percent: 100,
      missing: 0,
      next: "Patente Máxima"
    };
  }

  const current = ranks[currentIndex];
  const total = next.points - current.points;
  const progress = currentPoints - current.points;

  return {
    percent: Math.min(100, Math.max(0, Math.round((progress / total) * 100))),
    missing: next.points - currentPoints,
    next: next.name
  };
};

const Ranking = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const user = doc.data();

          return {
            id: doc.id,
            name: user.name || "Operador",
            class: user.class || "Não definido",
            points: Math.max(0, Number(user.points) || 0)
          };
        });

        data.sort((a, b) => b.points - a.points);

        setOperators(data);
        setLoading(false);
        setError(false);
      },
      (err) => {
        console.error("Erro ao carregar ranking:", err);
        setError(true);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getPositionClass = (index) => {
    if (index === 0) return "ranking-first";
    if (index === 1) return "ranking-second";
    if (index === 2) return "ranking-third";
    return "";
  };

  return (
    <section className="ranking-section">

      {/* CABEÇALHO */}
      <div className="ranking-title-area">
        <div className="ranking-title-info">
          <span className="ranking-kicker">
            U.T.A / CENTRAL DE OPERAÇÕES
          </span>

          <h2>RANKING DOS OPERADORES</h2>

          <p>
            Acompanhe a evolução e a classificação dos operadores.
          </p>
        </div>

        <div className="ranking-status">
          <span className="ranking-status-dot"></span>
          CLASSIFICAÇÃO ATIVA
        </div>
      </div>

      {/* RESUMO */}
      <div className="ranking-summary">
        <div className="ranking-summary-item">
          <span className="summary-icon">◎</span>
          <div>
            <strong>{operators.length}</strong>
            <small>OPERADORES</small>
          </div>
        </div>

        <div className="ranking-summary-divider"></div>

        <div className="ranking-summary-item">
          <span className="summary-icon">⌖</span>
          <div>
            <strong>
              {operators.length > 0 ? operators[0].points : 0}
            </strong>
            <small>MAIOR PONTUAÇÃO</small>
          </div>
        </div>

        <div className="ranking-summary-divider"></div>

        <div className="ranking-summary-item">
          <span className="summary-icon">★</span>
          <div>
            <strong>
              {operators.length > 0 ? getRank(operators[0].points) : "—"}
            </strong>
            <small>MAIOR PATENTE</small>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      {loading ? (
        <div className="ranking-message">
          <span className="ranking-spinner"></span>
          <p>CARREGANDO CLASSIFICAÇÃO...</p>
        </div>
      ) : error ? (
        <div className="ranking-message ranking-error">
          <span>!</span>
          <p>Não foi possível carregar o ranking.</p>
        </div>
      ) : operators.length === 0 ? (
        <div className="ranking-message">
          <span>◎</span>
          <p>NENHUM OPERADOR CADASTRADO.</p>
        </div>
      ) : (
        <div className="ranking-content">

          {/* DESTAQUE DOS TRÊS PRIMEIROS */}
          <div className="ranking-podium">
            {operators.slice(0, 3).map((operator, index) => {
              const position = index + 1;

              return (
                <div
                  className={`podium-card ${getPositionClass(index)}`}
                  key={operator.id}
                >
                  <div className="podium-position">
                    {position === 1 ? "1º LUGAR" :
                     position === 2 ? "2º LUGAR" : "3º LUGAR"}
                  </div>

                  <div className="podium-medal">
                    {position === 1 ? "★" :
                     position === 2 ? "◆" : "✦"}
                  </div>

                  <strong className="podium-name">
                    {operator.name}
                  </strong>

                  <span className="podium-class">
                    {operator.class}
                  </span>

                  <div className="podium-points">
                    {operator.points}
                    <small> PTS</small>
                  </div>

                  <span className="podium-rank">
                    {getRank(operator.points)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* LISTAGEM COMPLETA */}
          <div className="ranking-list-header">
            <div>
              <span className="ranking-kicker">CLASSIFICAÇÃO GERAL</span>
              <h3>OPERADORES EM CAMPO</h3>
            </div>

            <span className="ranking-total">
              TOP {Math.min(operators.length, 10)}
            </span>
          </div>

          <div className="ranking-table">

            <div className="ranking-header">
              <span>POSIÇÃO / OPERADOR</span>
              <span>CLASSE</span>
              <span>PONTOS</span>
              <span>PATENTE</span>
              <span>EVOLUÇÃO</span>
            </div>

            {operators.slice(0, 10).map((operator, index) => {
              const progress = getProgress(operator.points);

              return (
                <div
                  className={`ranking-row ${getPositionClass(index)}`}
                  key={operator.id}
                >
                  <div className="ranking-operator">
                    <span className="ranking-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="ranking-operator-name">
                      <strong>{operator.name}</strong>
                      <small>OPERADOR U.T.A.</small>
                    </div>
                  </div>

                  <span className="ranking-class">
                    {operator.class}
                  </span>

                  <strong className="ranking-points">
                    {operator.points}
                    <small> PTS</small>
                  </strong>

                  <span className="ranking-rank">
                    {getRank(operator.points)}
                  </span>

                  <div className="ranking-evolution">
                    <div className="evolution-info">
                      <span>{progress.percent}%</span>
                      <small>
                        {progress.missing > 0
                          ? `${progress.missing} pts para ${progress.next}`
                          : "PATENTE MÁXIMA"}
                      </small>
                    </div>

                    <div className="evolution-bar">
                      <div
                        className="evolution-fill"
                        style={{ width: `${progress.percent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ranking-footer">
            <span>
              DADOS ATUALIZADOS EM TEMPO REAL
            </span>

            <span>
              U.T.A — UNIDADE TÁTICA AIRSOFT
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Ranking;
