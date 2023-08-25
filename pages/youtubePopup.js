import React, { useEffect, useState, useRef } from 'react';
import YouTube from 'react-youtube';


export default function youtubePopup() {
    const [player, setPlayer] = useState(null);
    const [videoTime, setVideoTime] = useState(0);
    const [playingVideo, setPlayingVideo] = useState(false)
    const [popUps, setPopUps] = useState([
      // Objetos de Pruebas
      {time:3, title:"Completa la frase", message:"Frase 1", reply:"", popUpShown: false},
      {time:6, title:"Completa la frase", message:"Frase 2", reply:"", popUpShown: false},
      {time:9, title:"Completa la frase", message:"Frase 3", reply:"", popUpShown: false}
    ]);
    const [currentPopUp, setcurrentPopUp] = useState(popUps[0])
    const [showPopup, setShowPopup] = useState(false);
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
  
    //#region Handlers
    async function handlePlayerReady(event) {
        // Obtiene el Player
        setPlayer(event.target);

        // Obtiene el elemento Player
        // const iframeDocument = document.querySelector("#widget4");
        // const playerElement = iframeDocument?.querySelector('.html5-video-player');
        // console.log(iframeDocument?.children)
        // if (playerElement && popupRef.current) {
        //   player.appendChild(popupRef.current);
        // }

        // const iframe = iframeRef.current;
        // const iframeDocument = iframe.contentDocument || iframe.contentWindow;

        
        const iframe = await iframeRef.current.internalPlayer.getIframe();
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
      }
    }

    return (
      <div className='mx-auto my-auto h-1/2 relative' style={{width:"640px", marginTop:"100px"}}>
        <YouTube
        ref={iframeRef}
          opts={opts}
          videoId="UeVy4QOUBy8"         
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
              <input type='text' style={{border:"2px #aaa solid", borderRadius:"8px"}}></input>
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