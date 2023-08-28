import React from 'react';
import Youtubet from '../components/youtubePopup/youtubePopup'


export default function YoutubePopup() {

    return (
      <div className='mx-auto my-auto h-1/2 relative' style={{width:"640px", marginTop:"100px"}}>

         <Youtubet videoId={'UeVy4QOUBy8'} 
                   popups={[
                    // Objetos de Pruebas
                    {time:12, title:"Tipo Input Que tipo de golpe hizo Andy?, Derecha", message:"Indique su respuesta", reply:"derecha", type:"writer",popUpShown: false},
                    {time:9, title:"Tipo Input Que tipo de golpe va a ejecutar Andy?, Reves", message:"Pienselo bien", reply:"chao", type:"writer",popUpShown: false},
                    {time:6, title:"Tipo Input Que deporte estan jugando?, Tenis", message:"EL deporte es", reply:"tenis" , type:"writer",popUpShown: false},
                    {time:3, title:"Tipo select Que accion hizo el jugador", message:"Actividad 1", reply:"Sacar", 
                                           type:"checkbox",options:['Sacar','bolea','derecha'], paddingLeft:'38%',popUpShown: false},
                  ]} />
        
      </div>
    );
  };