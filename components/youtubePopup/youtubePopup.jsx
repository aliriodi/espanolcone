import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../Layout';
import Head from 'next/head';
// import { faStar } from '@fortawesome/free-solid-svg-icons';


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
    // Declaro las cantidad de ok maximos
    const maxAcert = popUps.length;
    // Declaro las cantidad de ok
    const [acert,setAcert]=useState(0) 
    const [currentPopUp, setcurrentPopUp] = useState(props.popups[0])
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    //variable del INPUT para capturarse cuando onClick button
    const [inputValue, setInputValue] = useState("");
    //variable del SELECT para capturarse cuando onClick button
    const [selectedOption, setSelectedOption] = useState(null);

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

        // Ordenar los PopUps por el tiempo en orden ascendente
        setPopUps(popUps.sort((a, b) => a.time - b.time));

        nextPopUp()
    };

    const handlePlayerStateChange = (event) => {
      if (event.data === 1) setPlayingVideo(true)
      if (event.data === 2) setPlayingVideo(false)
      if (!showPopup) nextPopUp()
      if(player) setShowPopup(false);
    };
    //function para tomar Select
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      //setShowPopup(false);
    };
    const handleCheckboxChange = (event, option) => {
      const isChecked = event.target.checked;
      setSelectedOption(option);
      // Realiza las acciones necesarias con la opción seleccionada
    };
    //#endregion
    let aux=popUps;
    
    function rendeerizerstar(){ 
                                 aux = aux.map((item) => {
                                   if (item.time === currentPopUp.time) {
                                       return currentPopUp; // Retorna el objeto nuevo en lugar del objeto actual
                                       }
                                    
                                        return item; // Mantiene los otros objetos sin cambios
                                                   });    }
    //#region PopUp
    const closePopup = () => {
      //mando por alert lo que se escribe
      //comprobacion de respuesta correcta
      //  INPUT
      if(inputValue.toLowerCase()===currentPopUp.reply.toLowerCase())
            { setcurrentPopUp(currentPopUp.value=1)
              //para sumar cuantos aciertos tiene el popups array 
              setAcert(aux.reduce((accumulator, popup) => accumulator + popup.value, 0))
              rendeerizerstar()   
              alert(acert+' / ' +maxAcert)
              //alert(inputValue+' es correcta');
             setSelectedOption(null)
            }

      else if(inputValue&&inputValue.toLowerCase()!==currentPopUp.reply.toLowerCase()) 
            { setcurrentPopUp(currentPopUp.value=0)
              //alert(acert+' / '+maxAcert)
               //para sumar cuantos aciertos tiene el popups array 
               setAcert(aux.reduce((accumulator, popup) => accumulator + popup.value, 0))
              rendeerizerstar()
              //alert(inputValue+ ' es incorrecto');
             setSelectedOption(null)
         //    alert(acert+' / ' +maxAcert)
        }
      //  SELECT      
      else if(selectedOption===currentPopUp.reply)
            { 
              setcurrentPopUp(currentPopUp.value=1)
              setAcert(aux.reduce((accumulator, popup) => accumulator + popup.value, 0))
              rendeerizerstar()
              //alert(selectedOption+' ES correcta');
             setSelectedOption(null)
             
           //  alert(acert+' / ' +maxAcert)
           
            }
      else  { setcurrentPopUp(currentPopUp.value=0)
         //para sumar cuantos aciertos tiene el popups array 
         setAcert(aux.reduce((accumulator, popup) => accumulator + popup.value, 0))
                rendeerizerstar()   
              // alert(acert+' / '+maxAcert)
             // alert(selectedOption+' ES incorrecta');
              setSelectedOption(null)
              //El renderizado de las estrellas debe venir cuando 
              //      alert(acert+' / ' +maxAcert)
            }

      setInputValue("");
      player.playVideo();
      setShowPopup(false);
      setShowPopup2(false);
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
          color: "#000"
      }
    }

    return (
      <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <Layout>
        <div className='mx-auto my-auto h-1/2 relative' style={{width:"640px", marginTop:"10px"}}>

          {/* Titulo de la Actividad */}
          <h3>{props.titlep}</h3>

          {/* Video */}
          <div className='relative'>
            <YouTube
              ref={iframeRef}
              opts={opts}
              videoId={props.videoId}        
              onReady={handlePlayerReady}
              onStateChange={handlePlayerStateChange}
              className='youtube'
            />
            
            {showPopup?
            <div className="popup  absolute top-0 left-0 flex justify-center items-center text-center"  style={{zIndex:0, width:'60%', height:'90%'}}>
              <button 
                onClick={() => {showPopup?setShowPopup(false):null; setShowPopup2(true)}} 
                className="btn-primary"
                style={{marginBottom: "20px", padding: "10px 22px 10px 22px"}}>
                  Actividad
                <span role="img" aria-label="Hand Emoji">👋</span>
              </button>
            </div>:null}
              
            {showPopup2 && ( currentPopUp.type==='writer'?     

            //INPUT   
            <div ref={popupRef} className="popup w-full h-full absolute top-0 left-0 flex justify-center items-center text-center" style={{background:"#000a"}}>
              <div className="p-2 bg-white" style={{borderRadius:"8px", minWidth: "40%"}}>
              
                {/* Titulo */}
                <h3 className='' style={{fontWeight:"700", marginBottom: "20px", fontSize:"21px"}}>
                  {currentPopUp.title}
                </h3>

                {/* Texto */}
                <div className='text-center'>
                  <p>{currentPopUp.message}</p>
                  <input
                    type='text'
                    style={{border:"2px #aaa solid", borderRadius:"8px"}}
                    value={inputValue}
                    onChange={handleInputChange}></input>
                </div>

                {/* Boton */}
                <button 
                  onClick={closePopup} 
                  className="mt-5 btn-primary" 
                  style={{marginBottom: "20px", padding: "10px 22px 10px 22px"}}>
                    Continuar
                </button>
              </div>
            </div>
            :  
            //SELECT
            <div ref={popupRef} className="popup w-full h-full absolute top-0 left-0 flex justify-center items-center " style={{background:"#000a"}}>
              <div className="bg-white overflow-hidden" style={{borderRadius:"8px", minWidth: "40%"}}>

                {/* Titulo */}
                <h3 className='p-3' style={{fontWeight:"700",  fontSize:"21px"}}>
                {currentPopUp.title}
                </h3>
                {/* Botón para mostrar el popup */}
                

                {/* Opciones del Selector */}
                <ul className='flex flex-col justify-between px-2 my-4'>
                  {currentPopUp.options &&
                  currentPopUp.options.map(opt =>
                    <li
                    className='relative overflow-hidden flex items-center my-2 p-2 justify-center'
                    style={{borderRadius: '7px'}}
                    key={opt}
                      >
                      <input 
                      type="radio"
                      className="mr-2 checkbox-test"
                      value={opt}
                      id={opt}
                      checked={selectedOption === opt}
                      onChange={(e) => handleCheckboxChange(e, opt)}/>
                      
                      <label
                      htmlFor={opt}
                      className= {`${selectedOption === opt? 'text-white' : 'text-dark z-10'} z-10`}>
                        {opt}
                      </label>

                    </li>)}
                </ul>
                {/* <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
                { currentPopUp.options ? currentPopUp.options.map(opt => 
                
                <option key={opt} value={opt}>{opt}</option>) :null}
                </select> */}

                {/* Boton */}
                <div className="text-center p-2" >
                  <button 
                    onClick={closePopup} 
                    type="submit"
                    className="btn-primary w-full" 
                    style={{ padding: "10px 22px 10px 22px"}}>
                      Continuar
                  </button> 
                </div>

              </div>
            </div>
            )}
          </div>

          {/* Resultados de Respuestas */}
          <div>{aux.map(a=>a.value)}</div>

          <div>{acert}</div>
          
          {/* Boton para activar la ACTIVIDAD */}
          <div className="progress">
            <i className="fa fa-star-o"></i>
            <p>Javascript</p>
              <progress  id="javascript" max={maxAcert} value={acert}></progress>
              <span></span>
          </div>
        </div>
      </Layout>
      </>
    );
  };