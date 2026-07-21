import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "./Ranking.css";


const Ranking = () => {


const [operators,setOperators] = useState([]);



const ranks = [

{points:0,name:"Recruta"},

{points:1,name:"Aspirante"},

{points:51,name:"Soldado"},

{points:201,name:"Sargento"},

{points:401,name:"Tenente"},

{points:501,name:"Capitão"},

{points:601,name:"Comandante"},

{points:701,name:"Coronel"},

{points:801,name:"General"},

{points:1000,name:"Marechal"}

];




const getRank=(points)=>{


let rank="Recruta";


ranks.forEach(item=>{


if(points >= item.points){

rank=item.name;

}


});


return rank;


};





const getProgress=(points)=>{


let current=0;


for(let i=0;i<ranks.length;i++){


if(points >= ranks[i].points){

current=i;

}


}



const next=ranks[current+1];



if(!next){


return {

percent:100,

missing:0,

next:"Patente Máxima"

};


}



const total=next.points-ranks[current].points;


const progress=points-ranks[current].points;



return{


percent:Math.round((progress/total)*100),

missing:next.points-points,

next:next.name


};


};






useEffect(()=>{


const unsubscribe = onSnapshot(

collection(db,"users"),


(snapshot)=>{


let data=snapshot.docs.map(doc=>{


const user=doc.data();


return{


id:doc.id,

name:user.name || "Operador",

class:user.class || "Não definido",

points:Number(user.points)||0


};


});



data.sort((a,b)=>b.points-a.points);


setOperators(data);


}


);



return()=>unsubscribe();


},[]);






return(


<section className="ranking-section">


<h2>

RANKING DOS OPERADORES

</h2>



<div className="ranking-table">



<div className="ranking-header">

<span>Operador</span>
<span>Classe</span>
<span>Pontos</span>
<span>Patente</span>

</div>





{

operators.slice(0,10).map((operator,index)=>{


const progress=getProgress(operator.points);



return(


<div className="ranking-row" key={operator.id}>


<div className="operator-info">


<strong>

#{index+1} {operator.name}

</strong>



<div className="progress-area">


<div className="progress-bar">


<div

className="progress-fill"

style={{

width:`${progress.percent}%`

}}


/>


</div>



<small>

{

progress.missing > 0

?

`${progress.missing} pts para ${progress.next}`

:

"Patente Máxima"

}


</small>


</div>


</div>





<span>

{operator.class}

</span>



<span className="points">

{operator.points}

</span>



<span className="rank">

{getRank(operator.points)}

</span>



</div>


)


})


}



</div>


</section>


);


};


export default Ranking;