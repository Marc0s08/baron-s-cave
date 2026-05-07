import React from 'react';
import Layout from '../components/Layout';
import './Home.css'; // Reaproveita o estilo da home

const Regras = () => {
  return (
    <Layout>
      <div className="home-container">
        <h2>Regras do Campo U.T.A.</h2>

        <p>
          Para garantir segurança, diversão e respeito entre todos os jogadores,
          siga atentamente as regras abaixo. O cumprimento destas normas é obrigatório
          para participar das atividades.
        </p>
        <div className="rules-section">
          <h2>Itens obrigatórios</h2>
          <ul>
            <li>
              <strong>Óculos de proteção:</strong> Uso obrigatório durante TODO o tempo
              no campo, inclusive fora das partidas.
            </li>
            <li>
              <strong>Pano vermelho</strong> É recomendado que leve um pano vermelho, assim 
              evitando de tomar tiros depois de morto.
            </li>
            <li>
              <strong>Ataduras</strong> Se atente ao briefing, lá será informado a quantidade de
              ataduras que será usada em jogo, mesmo assim se precavine e leve 4 ataduras e/ou
              torniquetes.
            </li>
          </ul>
        </div>
        <div className="rules-section">
          <h2>Regras Gerais</h2>
          <ul>
            <li>
              <strong>FPS e Joules:</strong> Atente-se ao FPS e Joules permitido da classe, estamos para
              se divertir, não precisa machucar ninguém.
            </li>
            <li>
              <strong>Morto:</strong> Ao ser atingido, levante a mão e grite <em>"Morto"</em>.
              Nada de discutir se matou ou morreu durante a partida.
            </li>
            <li>
              <strong>Sem contato físico:</strong> Empurrões, agarrões e brigas são proibidos.
            </li>
            <li>
              <strong>Distância mínima de disparo:</strong> As classes no Airsoft tem limite 
              de distância, onde deve ser respeitado.
            </li>
            <li>
                <strong>Highlander</strong> Não aceitamos Highlander no jogo, aquele operador que
                nunca é "atingido", "nunca morre", caso tenha dúvidas se foi atingido ou não, levante 
                a mão e se acuse morto, assim garantindo honra e mantendo a diversão de todos.
            </li>
            <li>
              <strong>Tarzan</strong> Aquele operador que fica gritando em campo, acusando que acertou,
              brigando em campo, caso veja que acertou e que o operador não acusou, avise um dos 
              organizadores no particular, assim ele tomará medidas sobre o ocorrido.
            </li>
             <li>
              <strong>Rendimento</strong> Rendimento é opcional, sendo da escolha do operador aceitar ou não.
              Somente obrigatório quando for tocado nas costas, assim passa a ser obrigatório o rendimento.
            </li>
          </ul>
        </div>

        <div className="rules-section">
          <h3>Recomendações Importantes</h3>
          <ul>
            <li>
              <strong>Calçado fechado:</strong> O terreno é uma chácara; use botas ou tênis reforçados.
            </li>
            <li>
              <strong>Hidratação:</strong> Leve água! O jogo pode durar várias horas.
            </li>
            <li>
              <strong>Equipamento revisado:</strong> Antes da partida, confira sua arma e seus equipamentos.
            </li>
          </ul>
        </div>

        <div className="images-section">
          <h1>Regras para cada equipamento</h1>
          <div className="highlight-cards">
            <div className="highlight-card">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FASSAULT.png?alt=media&token=7f5c14bd-5f63-4283-afb0-e9b8d1b702e9"
                alt="ASSAULT"
                className="highlight-image"
              />
              <h4>ASSAULT</h4>
              <p>Limite de FPS: 400 FPS</p>
              <p>Limite de JOULES: 1.52J</p>
              <p>SEM LIMITE DE DISTÂNCIA</p>
            </div>
            <div className="highlight-card">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FDMR.png?alt=media&token=722e184e-dc05-43b9-b860-c167265f6ed8"
                alt="DMR"
                className="highlight-image"
              />
              <h4>D.M.R.</h4>
              <h5>(Designated Marksman Rifle)</h5>
              <p>Limite de FPS: 450 FPS</p>
              <p>Limite de JOULES: 1.9J</p>
              <p>DISTÂNCIA MÍNIMA 20 METROS</p>
            </div>
            <div className="highlight-card">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FSUPPORT.png?alt=media&token=5bc8710d-0686-4580-88a3-e399b7e031a2"
                alt="Support"
                className="highlight-image"
              />
              <h4>SUPPORT</h4>
              <p>Limite de FPS: 400 FPS</p>
              <p>Limite de JOULES: 1.52J</p>
              <p>DISTÂNCIA MÍNIMA 7 METROS</p>
              <p>PERMITIDO FULL</p>
            </div>
            <div className="highlight-card">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FM24.png?alt=media&token=3b8dc0a2-8db1-49af-b00d-1e3ec19a276e"
                alt="Sniper"
                className="highlight-image"
              />
            <h4>SNIPER</h4>
              <p>Limite de FPS: 550 FPS</p>
              <p>Limite de JOULES: 2.81J</p>
              <p>DISTÂNCIA MÍNIMA 30 METROS</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Regras;
