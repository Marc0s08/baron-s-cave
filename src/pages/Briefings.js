import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './Briefings.css'; // Certifique-se de importar o arquivo CSS

const Briefings = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'Briefings'),
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
      <h1>Briefings</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="briefings-container"> {/* Adicione a classe ao contêiner principal */}
          {content.map((item) => (
            <div key={item.id} className="news-card">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="news-card-image" />
              )}
              <div className="news-card-content">
                {Object.keys(item).map((field, index) => (
                  field !== 'imageUrl' && field !== 'id' && (
                    <p key={index}>
                      <span className="field-name">{field}: </span>
                      <span className="field-content">{item[field]}</span>
                    </p>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Briefings;
