import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './Midia.css'; // Importa o arquivo CSS

const Midia = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null); // Estado para rastrear a imagem expandida
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'midia'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Dados brutos do Firestore:', data);

        // Remove a filtragem baseada no campo "type"
        const images = data.filter(item => item.imageUrl); // Garante que o item tenha um URL de imagem
        console.log('Imagens filtradas:', images);

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
    setExpandedImage(expandedImage === imageUrl ? null : imageUrl); // Alterna a exibição da imagem expandida
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default Midia;
