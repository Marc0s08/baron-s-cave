import React from 'react';
import Layout from '../components/Layout';
import './Home.css';

const Home = () => {
  return (
    <Layout>
      <div className="home-container">
        <h2>Descubra o Mundo do Airsoft</h2>
        <p>
          O airsoft é um esporte empolgante que simula combates táticos com réplicas de armas de fogo. É ideal para quem busca adrenalina, estratégia e diversão em equipe. Mergulhe nesse universo e descubra por que o airsoft é mais do que um jogo—é uma experiência única!
        </p>

        <div className="highlights-section">
          <h3>Por Que Jogar Airsoft?</h3>
          <div className="highlight-cards">
            <div className="highlight-card">
              <img src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fequipe.jpg?alt=media&token=022de2e4-de88-4d36-b940-57a8409ddfb5https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fequipe.jpg?alt=media&token=d230bbd6-f51a-4172-a8d5-811c9bb9809dhttps://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fequipe.jpg?alt=media&token=9ce24299-1c57-4595-bd7d-12bc9044fcdf" alt="Teamwork" className="highlight-image" />
              <h4>Trabalho em Equipe</h4>
              <p>A experiência de airsoft fortalece o espírito de equipe e a colaboração, exigindo coordenação e estratégias eficazes para alcançar objetivos comuns.</p>
            </div>
            <div className="highlight-card">
              <img src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fpensamento.jpg?alt=media&token=619ffe07-0ca2-457d-977a-6845a4e5b896" alt="Strategic Thinking" className="highlight-image" />
              <h4>Pensamento Estratégico</h4>
              <p>Cada jogo exige planejamento e táticas detalhadas, desafiando você a pensar e reagir rapidamente em situações dinâmicas.</p>
            </div>
            <div className="highlight-card">
              <img src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fcombat.jpg?alt=media&token=62c1c1fb-4be0-4f08-85b1-1169358bb0a2" alt="Adrenaline" className="highlight-image" />
              <h4>Adrenalina e Diversão</h4>
              <p>Com tiroteios simulados e cenários envolventes, o airsoft proporciona uma dose alta de adrenalina e uma diversão inigualável.</p>
            </div>
          </div>
        </div>

        <div className="rules-section">
          <h3>Regras e Recomendações Importantes</h3>
          <ul>
            <li><strong>Uso de Óculos de proteção:</strong> É obrigatório o uso de óculos de proteção durante toda a partida para proteção dos olhos</li>
            <li><strong>Campo da U.T.A.:</strong> O campo de jogo da U.T.A. é uma chácara, portanto, é essencial usar calçado fechado e o mais reforçado 
            possível para garantir segurança ao caminhar em terrenos variados.</li>
            <li><strong>Equipamento:</strong> Certifique-se de utilizar equipamentos adequados e revisados antes de cada partida para evitar falhas durante o jogo.</li>
          </ul>
        </div>

        <div className="videos-section">
          <h3>Veja o Airsoft em Ação</h3>
          <div className="video-card">
            <video controls className="video-explaining">
              <source src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fvideo.mp4?alt=media&token=cb408d75-7845-4cb2-a2d5-2f73ff47316a" type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
            <p className="description">Ação emocionante em campo de airsoft.</p>
          </div>
          <div className="video-card">
            <video controls className="video-explaining">
              <source src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fvideo2.mp4?alt=media&token=081aba12-96b4-44ad-8b5e-1262a590dd09" type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
            <p className="description">Trabalho em equipe e estratégia.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
