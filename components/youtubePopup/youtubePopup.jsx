import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';


export default function YoutubePopup(props) {
    const [player, setPlayer] = useState(null);
    const [videoTime, setVideoTime] = useState(0);
    const [playingVideo, setPlayingVideo] = useState(false)
    const [popUps, setPopUps] = useState(props.popups);
    /*[
      // Objetos de Pruebas
      {time:3, title:"Completa la frase", message:"Frase 1", reply:"", popUpShown: false},
      {time:6, title:"Completa la frase", message:"Frase 2", reply:"", popUpShown: false},
      {time:9, title:"Completa la frase", message:"Frase 3", reply:"", popUpShown: false}
    ]*/
    const [currentPopUp, setcurrentPopUp] = useState(props.popups[0])
    const [showPopup, setShowPopup] = useState(false);
    //variable del input para capturarse cuando onClick button
    const [inputValue, setInputValue] = useState("");
    const popupRef = useRef(null);
    const iframeRef = useRef(null);
    
    // Contador
    let interval;  
    interval = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime();
          setVideoTime(currentTime);
      }
    }, 1000);

    const handleInputChange = (event) => {
      setInputValue(event.target.value); // Actualiza el estado con el valor del input
    };
    //#region Handlers
    async function handlePlayerReady(event) {
        // Obtiene el Player
       
        setPlayer(event.target);
//        const iframe = await iframeRef.current.internalPlayer.getIframe();
  
       // Agrega estilos para ocultar el botón de pantalla completa
  // Accede al botón de pantalla completa dentro del iframe y ocúltalo


  /*
  const style = document.createElement("style");
  style.innerHTML = `
    .ytp-fullscreen-button {
      display: none !important;
    }
  `;
  iframe?.contentDocument?.head.appendChild(style);
*/
        // Obtiene el elemento Player
        // const iframeDocument = document.querySelector("#widget4");
        // const playerElement = iframeDocument?.querySelector('.html5-video-player');
        // console.log(iframeDocument?.children)
        // if (playerElement && popupRef.current) {
        //   player.appendChild(popupRef.current);
        // }

        // const iframe = iframeRef.current;
        // const iframeDocument = iframe.contentDocument || iframe.contentWindow;

        
       // const iframe = await iframeRef.current.internalPlayer.getIframe();
        // console.log(iframe?.contentWindow.document)
        
        // Ordenar los PopUps por el tiempo en orden ascendente
        setPopUps(popUps.sort((a, b) => a.time - b.time));

        nextPopUp()
    };

    const handlePlayerStateChange = (event) => {
      if (event.data === 1) setPlayingVideo(true)
      if (event.data === 2) setPlayingVideo(false)
      if (!showPopup) nextPopUp()
    };
    //#endregion
    
    //#region PopUp
    const closePopup = () => {
      //mando por alert lo que se escribe
      //comprobacion de respuesta correcta
      if(inputValue.toLowerCase()===currentPopUp.reply.toLowerCase())
           {alert(inputValue+' es correcta')}
      
      else {alert(inputValue+ ' es incorrecto');}
      
      setInputValue("");
      player.playVideo();
      setShowPopup(false);
      nextPopUp();
    };
    
    const nextPopUp = () =>{
      const nearbyPopUps = popUps.filter((popUp) => popUp.time > videoTime);
      if (nearbyPopUps.length > 0) {
        const nearbyPopUp = nearbyPopUps[0];
        setcurrentPopUp(nearbyPopUp)
      }
      else setcurrentPopUp({time:null, message:"", reply:"", popUpShown: false})
    }

    // Comprueba si se tiene que mostrar el PopUp
    if(Math.floor(videoTime) == currentPopUp.time && !showPopup ){
      player.pauseVideo()
      setShowPopup(true)
    }
    //#endregion
    
   
    // Opciones de Youtube
    const opts = { 
        playerVars: {
          rel: 0, // Evitar videos relacionados al final
          autoplay: 0, // Desactivar la reproducción automática
          modestbranding: 1, // Ocultar el logotipo de YouTube
          fs:0, // Oculto el boton de maximizar video fs FullScreen
      }
    }

    return (
      <div className='mx-auto my-auto h-1/2 relative' style={{width:"640px", marginTop:"100px"}}>
        <YouTube
          ref={iframeRef}
          opts={opts}
          videoId={props.videoId}        
          onReady={handlePlayerReady}
          onStateChange={handlePlayerStateChange}
          className='youtube'
        />

        {/*  Hijo de html5-video-player  */}
        {showPopup && (          
        <div ref={popupRef} className="popup w-full h-full absolute top-0 left-0 flex justify-center items-center text-center" style={{background:"#000a"}}>
          <div className="p-2 bg-white" style={{borderRadius:"8px", minWidth: "40%"}}>

            {/* Titulo */}
            <h3 className='' style={{fontWeight:"700", marginBottom: "20px", fontSize:"21px"}}>
            {currentPopUp.title}
            </h3>

            {/* Texto */}
            <div className='text-center'>
              <p>{currentPopUp.message}</p>
              <input type='text' style={{border:"2px #aaa solid", borderRadius:"8px"} } value={inputValue}
            onChange={handleInputChange}></input>
            </div>

            {/* Boton */}
            <button 
              onClick={closePopup} 
              className="mt-5 bg-primary text-white" 
              style={{marginBottom: "20px", borderRadius: "5px", padding: "10px 22px 10px 22px"}}>Continuar</button>
          </div>
      </div>
        )}
      </div>
    );
  };