import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './Briefings.css'; // Certifique-se de importar o arquivo CSS correto

const Briefings = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Briefings'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Dados recebidos:', data); // Para depuração
        const missionsWithImages = data.filter(item => item.images && item.images.length > 0); // Filtra apenas itens com imagens
        setContent(missionsWithImages);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error('Erro ao buscar dados: ', error);
        setError(`Erro ao buscar dados: ${error.message}`);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div className="briefings-page"> {/* Adicione uma classe específica */}
        <div className="briefings-container">
          <h2>Briefings</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div className="image-list">
              {content.length === 0 ? (
                <p>Nenhuma imagem encontrada.</p>
              ) : (
                content.map((item) => (
                  <div key={item.id} className="image-item">
                    {/* Exibir a primeira imagem */}
                    {item.images && item.images.length > 0 ? (
                      <a href={`/briefings/${item.id}`}>
                        <img
                          src={item.images[0]}
                          alt={item.title || 'Imagem'}
                          className="mission-image" // Classe para estilização
                        />
                      </a>
                    ) : (
                      <p>Imagem não disponível</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Briefings;
