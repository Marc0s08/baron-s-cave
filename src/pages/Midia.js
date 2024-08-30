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
        setContent(data);
        setError(null);
      },
      (error) => {
        setError(`Error fetching data: ${error.message}`);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <div className="midia-container">
        <h2>Vídeos e Fotos</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="video-list">
            {content.map((item) => (
              <div key={item.id} className="video-item">
                {item.type === 'video' ? (
                  <>
                    <h3>{item.title}</h3>
                    <video controls width="600">
                      <source src={item.url} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </>
                ) : (
                  <>
                    <h3>{item.title}</h3>
                    <img src={item.url} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Midia;
