import React from 'react';
import Youtubet from '../components/youtubePopup/youtubePopup'


export default function YoutubePopup() {

    return (
      <div className='mx-auto my-auto h-1/2 relative' style={{width:"640px", marginTop:"100px"}}>

         <Youtubet videoId={'UeVy4QOUBy8'} 
                   popups={[
                    // Objetos de Pruebas
                    {time:6, title:"Tipo Input Completa la frase, hola", message:"Frase 1", reply:"hola", type:"writer",popUpShown: false},
                    {time:9, title:"Tipo Input Completa la frase, chao", message:"Frase 2", reply:"chao", type:"writer",popUpShown: false},
                    {time:12, title:"Tipo Input Completa la frase, bien", message:"Frase 3", reply:"bien", type:"writer",popUpShown: false},
                    {time:3, title:"Tipo select Completa la frase, otra opcion", message:"Frase 4", reply:"otra opcion", 
                                           type:"checkbox",options:['hola','chao','otra opcion'], paddingLeft:'38%',popUpShown: false},
                  ]} />
        
      </div>
    );
  };