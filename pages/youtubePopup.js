import React from 'react';
import Youtubet from '../components/youtubePopup/youtubePopup'


export default function YoutubePopup() {

    return (
      <div className='mx-auto my-auto h-1/2 relative' style={{width:"640px", marginTop:"100px"}}>
         
         {/* <Youtubet videoId={'UeVy4QOUBy8'} 
                   popups={[
                    // Objetos de Pruebas
                    {time:12, title:"Tipo Input Que tipo de golpe hizo Andy?, Derecha", message:"Indique su respuesta", reply:"derecha", type:"writer",popUpShown: false},
                    {time:9, title:"Tipo Input Que tipo de golpe va a ejecutar Andy?, Reves", message:"Pienselo bien", reply:"Reves", type:"writer",popUpShown: false},
                    {time:6, title:"Tipo Input Que deporte estan jugando?, Tenis", message:"EL deporte es", reply:"tenis" , type:"writer",popUpShown: false},
                    {time:3, title:"Tipo select Que accion hizo el jugador, Sacar", message:"Actividad 1", reply:"Sacar", 
                                           type:"checkbox",options:['Sacar','bolea','derecha'], paddingLeft:'38%',popUpShown: false},
                  ]} /> */}
                  <Youtubet videoId={'CguXO_5okCY'} 
                            titlep={'En el siguiente video, selecciona la forma correcta de los verbos para completar las oraciones.'}
                   popups={
                      [
                    // Objetos de Pruebas
                    {time:11, title:"Mi nombre _______ Daniela Masías.", reply:"es", message:" (soy/es/está) ", 
                                           type:"checkbox",options:['soy','es','está'],paddingLeft:'10%',popUpShown: false,value:0},
                    {time:56, title:"Ella es Julia Coronatta y _______ 22 años.", message:"Pienselo bien", reply:"tiene", 
                                           type:"checkbox",options:['tiene','lleva','es'],paddingLeft:'10%',popUpShown: false,value:0},
                    {time:83, title:"Ella ______ de Alemania.", message:"EL deporte es", reply:"es" , 
                                           type:"checkbox",options:['tiene','es','esta'],paddingLeft:'10%',popUpShown: false,value:0},
                    {time:116, title:"Yo _______ de Minneapolis Minesota.", message:"Actividad 1", reply:"vengo", 
                                           type:"checkbox",options:['vengo','viene','venir'], paddingLeft:'10%',popUpShown: false,value:0},
                    {time:152, title:"Susana López viene de México, de una ciudad pequeña que _________ Zamora.", message:"Actividad 1", reply:"se llama", 
                                           type:"checkbox",options:['es','se llama','esta'], paddingLeft:'10%',popUpShown: false,value:0},
                    {time:193, title:"Me _______ las ciudades pequeñas.", message:"Actividad 1", reply:"gustan", 
                                           type:"checkbox",options:['gusta','gustar','gustan'], paddingLeft:'10%',popUpShown: false,value:0},
                    {time:218, title:"Córdoba _____ una provincia preciosa.", message:"Actividad 1", reply:"es", 
                                           type:"checkbox",options:['está','son','es'], paddingLeft:'10%',popUpShown: false,value:0},
                  ]} />
        
      </div>
    );
  };