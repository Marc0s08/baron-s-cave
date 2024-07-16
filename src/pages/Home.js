import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import './Home.css'; // Certifique-se de importar o arquivo CSS

const Home = () => {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <Layout>
      <h2>Página Inicial</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        content.map((item, index) => (
          <div key={index} className="news-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))
      )}
    </Layout>
  );
};

export default Home;
