import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './Midia.css'; // Importa o arquivo CSS

const Midia = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'midia'),
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

  const toggleExpandImage = (imageUrl) => {
    setExpandedImage(expandedImage === imageUrl ? null : imageUrl);
  };

  return (
    <Layout>
      <div className="midia-page"> {/* Adicione a classe específica */}
        <div className="midia-container">
          <h2>Galeria de Imagens</h2>
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
                  <div key={item.id} className="image-item" onClick={() => toggleExpandImage(item.imageUrl)}>
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title || 'Imagem'} />
                    ) : (
                      <p>Imagem não disponível</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
          {expandedImage && (
            <div className="expanded-image-container visible" onClick={() => setExpandedImage(null)}>
              <img src={expandedImage} alt="Expanded" className="expanded-image" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Midia;