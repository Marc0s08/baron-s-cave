import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "./Midia.css";
import { Helmet } from "react-helmet-async";

const Midia = () => {


const [content,setContent] = useState([]);

const [error,setError] = useState(null);

const [expandedImage,setExpandedImage] = useState(null);

const [loading,setLoading] = useState(true);



useEffect(()=>{


const unsubscribe = onSnapshot(

collection(db,"midia"),


(snapshot)=>{


const data = snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));


const images = data.filter(item=>item.imageUrl);


setContent(images);

setLoading(false);


},


(error)=>{


setError(error.message);

setLoading(false);


}

);


return ()=>unsubscribe();


},[]);





return (

<Layout>
<Helmet>

<title>Mídia | U.T.A Airsoft</title>

</Helmet>

<div className="midia-container">



<h1 className="midia-title">

GALERIA U.T.A.

</h1>



<p className="midia-subtitle">

Momentos, operações e registros do campo.

</p>





{

loading &&

<p className="midia-loading">

Carregando imagens...

</p>

}





{

error &&

<p className="midia-error">

{error}

</p>

}





<div className="midia-grid">


{

content.map(item=>(


<div

key={item.id}

className="midia-card"

onClick={()=>setExpandedImage(item.imageUrl)}

>


<img

src={item.imageUrl}

alt={item.title || "Imagem"}

className="midia-image"

/>


</div>


))


}


</div>





{

expandedImage &&

<div

className="image-modal"

onClick={()=>setExpandedImage(null)}

>


<img

src={expandedImage}

alt="Imagem ampliada"

/>


</div>


}





</div>


</Layout>


);


};


export default Midia;