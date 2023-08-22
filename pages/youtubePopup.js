import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';


export default function youtubePopup() {
    const [player, setPlayer] = useState(null);
    const [videoTime, setVideoTime] = useState(0);
    const [playingVideo, setPlayingVideo] = useState(false)
    const [popUps, setPopUps] = useState([
      // Objetos de Pruebas
      {time:3, message:"Alguien fue Rickroleado", reply:"", popUpShown: false},
      {time:6, message:"Alguien fue super Rickroleado", reply:"", popUpShown: false},
      {time:9, message:"Alguien fue HYPER Rickroleado3", reply:"", popUpShown: false}
    ]);
    const [currentPopUp, setcurrentPopUp] = useState(popUps[0])
    const [showPopup, setShowPopup] = useState(false);
  
    //#region Handlers
    const handlePlayerReady = (event) => {
        setPlayer(event.target);

        // Ordenar los PopUps por el tiempo en orden ascendente
        setPopUps(popUps.sort((a, b) => a.time - b.time));

        nextPopUp()
    };

    const handlePlayerStateChange = (event) => {
      console.log("Change")
      if (event.data === 1) setPlayingVideo(true)
      if (event.data === 2) setPlayingVideo(false)
      if (!showPopup) nextPopUp()
    };
    //#endregion
    
    // Contador
    let interval;  
    interval = setInterval(() => {
      if (player) {
        const currentTime = player.getCurrentTime();
          setVideoTime(currentTime);
      }
    }, 1000);
            
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

    const opts = {
        playerVars: {
        autoplay: 0, // Desactivar la reproducción automática
        modestbranding: 1, // Ocultar el logotipo de YouTube
        rel: 0, // Evitar videos relacionados al final
      }
    }

    return (
      <div className='mx-auto my-auto w-1/2 h-1/2'>
        <YouTube
          videoId="dQw4w9WgXcQ"         
          onReady={handlePlayerReady}
          onStateChange={handlePlayerStateChange}
          opts={opts}
          style={{
            margin: 'auto', // Establecer el margen a cero
          }}
        >
          <span
          style={{width:"100vh", height:"100vh", background: "#000"}}>HOLA</span>
        </YouTube>
        {showPopup && (
          <div className="popup">
            <p>{currentPopUp.message}</p>
            <button onClick={closePopup}>Cerrar</button>
          </div>
        )}
      </div>
    );
  };