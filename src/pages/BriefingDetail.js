import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./BriefingDetail.css";


const BriefingDetail = () => {

  const { id } = useParams();

  const [briefing, setBriefing] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {


    const fetchBriefing = async () => {


      try {


        const docRef = doc(db,"Briefings",id);

        const docSnap = await getDoc(docRef);



        if(docSnap.exists()){


          setBriefing(docSnap.data());

          setError(null);


        }else{


          setError("Briefing não encontrado");


        }



      }catch(error){


        setError(error.message);


      }


    };


    fetchBriefing();


  },[id]);



  if(error){

    return (

      <Layout>

        <div className="briefing-error">

          {error}

        </div>

      </Layout>

    );

  }



  if(!briefing){


    return (

      <Layout>

        <div className="briefing-loading">

          Carregando missão...

        </div>


      </Layout>

    );

  }



return (

<Layout>


<div className="briefing-detail-container">


<h1 className="mission-title">

BRIEFING DA OPERAÇÃO

</h1>



{/* GALERIA */}


{

briefing.images && briefing.images.length > 0 && (


<div className="image-gallery">


{

briefing.images.map((image,index)=>(


<div className="detail-image-card" key={index}>


<img

src={image}

alt={`Imagem ${index+1}`}

className="briefing-detail-image"

/>


</div>


))


}


</div>


)

}





{/* INFORMAÇÕES */}


<div className="briefing-detail-content">


{

briefing.fields && briefing.fields.length > 0 ? (


briefing.fields.map((field,index)=>(


<div

key={index}

className="field-card"

>


<h2>

{field.name || "Sem título"}

</h2>


<p>

{field.value || "Sem informação"}

</p>


</div>


))


):(


<p>

Nenhuma informação disponível.

</p>


)


}


</div>



</div>


</Layout>

);


};


export default BriefingDetail;