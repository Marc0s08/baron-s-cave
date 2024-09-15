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
        <img src={briefing.imageUrl} alt={briefing.title} className="briefing-detail-image" />
        <div className="briefing-detail-content">
          <h1>{briefing.title}</h1>
          {briefing.fields && briefing.fields
            .sort((a, b) => a.order - b.order)
            .map((field, index) => (
              <div key={index} className="field-card">
                <h2 className="field-name">{field.name}</h2>
                <p className="field-content">{field.value}</p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default BriefingDetail;
