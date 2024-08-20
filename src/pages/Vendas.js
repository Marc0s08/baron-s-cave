import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './Home.css'; // Certifique-se de importar o arquivo CSS

const Vendas = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null); // Estado para rastrear a imagem expandida

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'vendas'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setContent(data);
        setError(null);
      },
      (error) => {
        setError(`Error fetching data: ${error.message}`);
      }
    );

    return () => unsubscribe();
  }, []);

  const formatFieldContent = (value) => {
    if (value && typeof value === 'object') {
      if ('seconds' in value && 'nanoseconds' in value) {
        return new Date(value.seconds * 1000).toLocaleString();
      }
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return JSON.stringify(value);
    }
    return value;
  };

  const toggleExpandImage = (imageId) => {
    setExpandedImage(expandedImage === imageId ? null : imageId); // Alterna a expansão/redução
  };

  return (
    <Layout>
      <h1>Lojinha</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        content.map((item) => (
          <div key={item.id} className="news-card">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`news-card-image ${expandedImage === item.id ? 'expanded' : ''}`}
                onClick={() => toggleExpandImage(item.id)} // Adiciona o evento de clique
              />
            )}
            <div className="news-card-content">
              {Object.keys(item).map((field, index) => (
                field !== 'imageUrl' && field !== 'id' && (
                  <p key={index}>
                    <span className="field-name">{field}: </span>
                    <span className="field-content">{formatFieldContent(item[field])}</span>
                  </p>
                )
              ))}
            </div>
          </div>
        ))
      )}
    </Layout>
  );
};

export default Vendas;
