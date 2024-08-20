import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './Home.css'; // Certifique-se de importar o arquivo CSS

const Home = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null); // Estado para rastrear a imagem expandida

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'homeContent'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setContent(data);
        setError(null);
      },
      (error) => {
        setError(`Error fetching data: ${error.message}`);
      }
    );

    return () => unsubscribe();
  }, []);

  const toggleExpandImage = (imageUrl) => {
    setExpandedImage(expandedImage === imageUrl ? null : imageUrl); // Alterna a exibição da imagem expandida
  };

  return (
    <Layout>
      <h2>Página Inicial</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : expandedImage ? (
        <div className="expanded-image-container" onClick={() => setExpandedImage(null)}>
          <img src={expandedImage} alt="Expanded" className="expanded-image" />
        </div>
      ) : (
        content.map((item, index) => (
          <div key={index} className="news-card">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="news-card-image"
                onClick={() => toggleExpandImage(item.imageUrl)} // Adiciona o evento de clique para expandir a imagem
              />
            )}
            <div className="news-card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))
      )}
    </Layout>
  );
};

export default Home;
