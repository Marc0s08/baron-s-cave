import React from "react";
import Layout from "../components/Layout";
import Ranking from "../components/Ranking";
import "./Home.css";
import { Helmet } from "react-helmet-async";

const Home = () => {


return (

<Layout>
<Helmet>

<title>U.T.A | Unidade Tática Airsoft</title>

</Helmet>


<div className="home-container">



<section className="hero-section">


<h1>

DESCUBRA O MUNDO DO AIRSOFT

</h1>


<p>

Estratégia, adrenalina e trabalho em equipe.
O airsoft é uma experiência que une simulação tática,
disciplina e diversão.

</p>


</section>





<section className="highlights-section">


<h2>

POR QUE JOGAR AIRSOFT?

</h2>



<div className="highlight-cards">



<div className="highlight-card">


<img

src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fequipe.jpg?alt=media&token=022de2e4-de88-4d36-b940-57a8409ddfb5"

alt="Equipe"

/>


<h3>

Trabalho em Equipe

</h3>


<p>

O sucesso depende da comunicação,
cooperação e estratégia entre operadores.

</p>


</div>





<div className="highlight-card">


<img

src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2FC%C3%A3es%20Militares.jpeg?alt=media&token=18369fec-edcd-4dfb-ab1d-e88393b31bda"

alt="Estratégia"

/>



<h3>

Pensamento Estratégico

</h3>



<p>

Cada missão exige planejamento,
decisão rápida e adaptação.

</p>



</div>






<div className="highlight-card">


<img

src="https://firebasestorage.googleapis.com/v0/b/barons-cave.appspot.com/o/home%2Fcombat.jpg?alt=media&token=62c1c1fb-4be0-4f08-85b1-1169358bb0a2"

alt="Combate"

/>



<h3>

Adrenalina

</h3>



<p>

Cenários imersivos e desafios
que simulam operações táticas.

</p>


</div>



</div>


</section>







<section className="rules-section">



<h2>

REGRAS IMPORTANTES

</h2>



<ul>


<li>

<strong>
Proteção:
</strong>

Uso obrigatório de óculos durante toda partida.

</li>




<li>

<strong>
Campo U.T.A:
</strong>

Utilize calçado adequado para terrenos variados.

</li>




<li>

<strong>
Equipamentos:
</strong>

Sempre revise seu equipamento antes da operação.

</li>



</ul>



</section>







{/* RANKING DOS OPERADORES */}


<Ranking />





</div>


</Layout>


);


};


export default Home;