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
        const images = data.filter(item => item.imageUrl); // Filtra apenas itens com URL de imagem
        setContent(images);
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
                    {item.imageUrl ? (
                      <a href={`/briefings/${item.id}`}>
                        <img src={item.imageUrl} alt={item.title || 'Imagem'} />
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
