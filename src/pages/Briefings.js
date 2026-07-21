import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "./Briefings.css";
import { Helmet } from "react-helmet-async";

const Briefings = () => {

  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const unsubscribe = onSnapshot(
      collection(db, "Briefings"),

      (snapshot) => {

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const missions = data.filter(
          item => item.images && item.images.length > 0
        );

        setContent(missions);
        setLoading(false);
        setError(null);

      },


      (error)=>{

        console.error(error);

        setError(error.message);

        setLoading(false);

      }

    );


    return () => unsubscribe();


  }, []);



return (

<Layout>
<Helmet>

<title>Briefings | U.T.A Airsoft</title>

</Helmet>

<div className="briefings-page">


<div className="briefings-container">


<div className="briefing-title">

<h1>
BRIEFINGS
</h1>

<p>
Planejamento das operações e missões da U.T.A.
</p>

</div>



{loading ? (

<div className="loading">

Carregando missões...

</div>


) : error ? (

<p className="error">

{error}

</p>


) : (


<div className="mission-grid">


{
content.length === 0 ? (

<p>
Nenhuma missão disponível.
</p>


) : (


content.map(item => (

<div 
key={item.id}
className="mission-card"
>


<a href={`/briefings/${item.id}`}>

<img

src={item.images[0]}

alt={item.title || "Missão"}

className="mission-image"

/>


<div className="mission-overlay">

<span>
ACESSAR BRIEFING
</span>

</div>


</a>


</div>


))


)


}


</div>


)}


</div>


</div>


</Layout>

);


};


export default Briefings;