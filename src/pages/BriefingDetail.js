import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import Layout from '../components/Layout';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './BriefingDetail.css';

const BriefingDetail = () => {
  const { id } = useParams(); 
  const [briefing, setBriefing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBriefing = async () => {
      try {
        const docRef = doc(db, 'Briefings', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBriefing(docSnap.data());
          setError(null);
        } else {
          setError('Briefing not found');
        }
      } catch (error) {
        setError(`Error fetching briefing: ${error.message}`);
      }
    };

    fetchBriefing();
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!briefing) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="briefing-detail-container">
        {/* Renderizar todas as imagens, caso existam */}
        {briefing.images && briefing.images.length > 0 && (
          <div className="image-gallery">
            {briefing.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagem ${index + 1}`}
                className="briefing-detail-image"
              />
            ))}
          </div>
        )}

        <div className="briefing-detail-content">
          
          {/* Renderizar os campos em ordem */}
          {briefing.fields && briefing.fields.length > 0 ? (
            briefing.fields.map((field, index) => (
              <div key={index} className="field-card">
                <h2 className="field-name">{field.name || 'Sem Título'}</h2>
                <p className="field-content">{field.value || 'Valor não disponível'}</p>
              </div>
            ))
          ) : (
            <p>Nenhum campo disponível</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BriefingDetail;
