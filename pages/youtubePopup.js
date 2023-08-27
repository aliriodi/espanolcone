import React from 'react';
import Youtubet from '../components/youtubePopup/youtubePopup'


export default function YoutubePopup() {

    return (
      <div className='mx-auto my-auto h-1/2 relative' style={{width:"640px", marginTop:"100px"}}>

         <Youtubet videoId={'UeVy4QOUBy8'} 
                   popups={[
                    // Objetos de Pruebas
                    {time:3, title:"Completa la frase, hola", message:"Frase 1", reply:"hola", popUpShown: false},
                    {time:6, title:"Completa la frase, chao", message:"Frase 2", reply:"chao", popUpShown: false},
                    {time:9, title:"Completa la frase, bien", message:"Frase 3", reply:"bien", popUpShown: false}
                  ]} />
        
      </div>
    );
  };