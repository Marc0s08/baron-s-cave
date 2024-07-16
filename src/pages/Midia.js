import React from 'react';
import Layout from '../components/Layout';
import './Midia.css'; // Importa o arquivo CSS

const midia = () => {
  // Array de vídeos de exemplo (substitua com seus próprios dados)
  const videos = [
    {
      id: 1,
      title: 'Video 1',
      url: 'https://drive.google.com/file/d/1-HmHeaJbJTYM7Auappp-vWQj7w9e9MS7/view?usp=drive_link'
    },
    {
      id: 2,
      title: 'Video 2',
      url: 'https://www.example.com/video2.mp4'
    },
    {
      id: 3,
      title: 'Video 3',
      url: 'https://www.example.com/video3.mp4'
    }
  ];

  return (
    <Layout>
      <div className="midia-container">
        <h2>Vídeos</h2>
        <div className="video-list">
          {videos.map(video => (
            <div key={video.id} className="video-item">
              <h3>{video.title}</h3>
              <video controls>
                <source src={video.url} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default midia;
