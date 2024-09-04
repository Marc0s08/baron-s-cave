import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './general.css'; // Certifique-se de importar o arquivo CSS

const Aluguel = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null); // Estado para rastrear a imagem expandida

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Aluguel'),
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

  const toggleExpandImage = (imageUrl) => {
    setExpandedImage(expandedImage === imageUrl ? null : imageUrl); // Alterna a exibição da imagem expandida
  };

  const formatFieldContent = (value) => {
    if (typeof value === 'string') {
      return value.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
    }
    return value;
  };

  return (
    <Layout>
      <h1>Armas para aluguel</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : expandedImage ? (
        <div className="expanded-image-container" onClick={() => setExpandedImage(null)}>
          <img src={expandedImage} alt="Expanded" className="expanded-image" />
        </div>
      ) : (
        content.map((item) => (
          <div key={item.id} className="news-card">
            {item.isAlugada && <div className="ribbon">Alugada</div>} {/* Faixa de Alugada */}
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="news-card-image"
                onClick={() => toggleExpandImage(item.imageUrl)} // Adiciona o evento de clique para expandir a imagem
              />
            )}
            <div className="news-card-content">
              {Object.keys(item).map((field, index) => (
                field !== 'imageUrl' && field !== 'id' && field !== 'contactLink' && field !== 'isAlugada' && (
                  <p key={index}>
                    <span className="field-name">{field}</span>
                    <span className="field-content">{formatFieldContent(item[field])}</span>
                  </p>
                )
              ))}
            </div>
            {item.contactLink && (
              <a href={item.contactLink} className="contact-button" target="_blank" rel="noopener noreferrer">
                Entrar em contato com o vendedor
              </a>
            )}
          </div>
        ))
      )}
    </Layout>
  );
};

export default Aluguel;
