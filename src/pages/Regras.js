import React from "react";
import Layout from "../components/Layout";
import "./Regras.css";


const Regras = () => {


return (

<Layout>


<div className="regras-container">


<h1 className="regras-title">
REGRAS DO CAMPO U.T.A.
</h1>



<p className="regras-intro">

Para garantir segurança, diversão e respeito entre todos os operadores,
siga atentamente as regras abaixo.

</p>




<section className="rules-card">

<h2>Itens Obrigatórios</h2>


<ul>

<li>
<strong>Óculos de proteção:</strong>
Uso obrigatório durante TODO o tempo no campo.
</li>


<li>
<strong>Pano vermelho:</strong>
Recomendado para sinalizar operador eliminado.
</li>


<li>
<strong>Ataduras:</strong>
Leve pelo menos 4 ataduras ou torniquetes conforme briefing.
</li>


</ul>

</section>





<section className="rules-card">


<h2>Regras Gerais</h2>


<ul>


<li>
<strong>FPS e Joules:</strong>
Respeite o limite da sua classe.
</li>


<li>
<strong>Morto:</strong>
Ao ser atingido, levante a mão e grite "Morto".
</li>


<li>
<strong>Sem contato físico:</strong>
Empurrões, agarrões ou brigas são proibidos.
</li>


<li>
<strong>Distância mínima:</strong>
Cada classe possui uma distância obrigatória de disparo.
</li>


<li>
<strong>Highlander:</strong>
Não será tolerado jogador que não acusa acertos.
</li>


<li>
<strong>Tarzan:</strong>
Discussões e reclamações durante o jogo não serão aceitas.
Informe os organizadores.
</li>


<li>
<strong>Rendimento:</strong>
Opcional, exceto quando o operador for tocado pelas costas.
</li>


</ul>


</section>






<section className="rules-card">


<h2>Recomendações</h2>


<ul>


<li>
<strong>Calçado fechado:</strong>
Utilize botas ou tênis reforçados.
</li>


<li>
<strong>Hidratação:</strong>
Leve água durante a partida.
</li>


<li>
<strong>Equipamento:</strong>
Revise sua arma e equipamentos antes do jogo.
</li>


</ul>


</section>





<section className="classes-section">


<h2>Regras por Equipamento</h2>



<div className="classes-grid">



<div className="class-card">

<img src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FASSAULT.png?alt=media&token=7f5c14bd-5f63-4283-afb0-e9b8d1b702e9"/>

<h3>ASSAULT</h3>

<p>FPS: 400</p>
<p>Joules: 1.52J</p>
<p>Sem limite de distância</p>

</div>





<div className="class-card">

<img src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FDMR.png?alt=media&token=722e184e-dc05-43b9-b860-c167265f6ed8"/>

<h3>D.M.R.</h3>

<span>Designated Marksman Rifle</span>

<p>FPS: 450</p>
<p>Joules: 1.9J</p>
<p>Distância mínima: 20 metros</p>

</div>





<div className="class-card">

<img src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FSUPPORT.png?alt=media&token=5bc8710d-0686-4580-88a3-e399b7e031a2"/>

<h3>SUPPORT</h3>

<p>FPS: 400</p>
<p>Joules: 1.52J</p>
<p>Distância mínima: 7 metros</p>
<p>Full permitido</p>

</div>





<div className="class-card">


<img src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/images%2FM24.png?alt=media&token=3b8dc0a2-8db1-49af-b00d-1e3ec19a276e"/>


<h3>SNIPER</h3>

<p>FPS: 550</p>

<p>Joules: 2.81J</p>

<p>Distância mínima: 30 metros</p>


</div>



</div>


</section>




</div>


</Layout>


);


};


export default Regras;