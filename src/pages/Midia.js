import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './Midia.css'; // Importa o arquivo CSS

const Midia = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'midia'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // Filtra apenas itens do tipo 'image'
        const images = data.filter(item => item.type === 'image');
        setContent(images);
        setError(null);
      },
      (error) => {
        console.error('Erro ao buscar dados: ', error);
        setError(`Erro ao buscar dados: ${error.message}`);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div className="midia-container">
        <h2>Fotos</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="image-list">
            {content.length === 0 ? (
              <p>Nenhuma imagem encontrada.</p>
            ) : (
              content.map((item) => (
                <div key={item.id} className="image-item">
                  <h3>{item.title}</h3>
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Midia;
