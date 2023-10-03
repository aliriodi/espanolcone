import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from '../Layout';
import Head from 'next/head';
import SuccessPopUp from './successPopUp';
import FailedPopUp from './failedPopUp';
import { useSpring, animated } from 'react-spring';


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

    // Pop Ups
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showSuccessPopUp, setShowSuccessPopUp] = useState(false);
    const [showFailedPopUp, setShowFailedPopUp] = useState(false);
    const [showProgressPopUp, setShowProgressPopUp] = useState(false);

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
    
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      //setShowPopup(false);
    };

    const handleCheckboxChange = (event, option) => {
      const isChecked = event.target.checked;
      setSelectedOption(option);
      // Realiza las acciones necesarias con la opción seleccionada
    };
    
    const handleShowPopUp = (show)=>{
      setShowPopup2(show)
    }

    const handleShowSuccessPopUp = (show)=>{
      progressPopup();

      // Una vez cerrado el popUp se actualiza currentPopUp
      nextPopUp()

      // Se cierra el PopUp 
      setShowSuccessPopUp(show)
    }

    const handleShowFailedPopUp = (show)=>{   
      player.playVideo() 

      // Una vez cerrado el popUp se actualiza currentPopUp
      nextPopUp()

      // Se cierra el PopUp 
      setShowFailedPopUp(show)
    }

    //#endregion
    let aux=popUps;
    
    function rendeerizerstar(){ 
    aux = aux.map((item) => {
      if (item.time === currentPopUp.time) {
          return currentPopUp; // Retorna el objeto nuevo en lugar del objeto actual
          }
      
          return item; // Mantiene los otros objetos sin cambios
      });
    }

    //#region PopUp
    const closePopup = () => {
      //mando por alert lo que se escribe
      //comprobacion de respuesta correcta
      let result;

      // //  INPUT
      // if(inputValue.toLowerCase()===currentPopUp.reply.toLowerCase())
      //       { setcurrentPopUp({...currentPopUp, value:1})
      //         //para sumar cuantos aciertos tiene el popups array 
      //         result = 1;
      //         setAcert(aux.reduce((accumulator, popup) => accumulator + popup.value, 0))
   
      //         alert(acert+' / ' +maxAcert)
      //         //alert(inputValue+' es correcta');
              
      //        setSelectedOption(null)
      //       }

      // else if(inputValue&&inputValue.toLowerCase()!==currentPopUp.reply.toLowerCase()) 
      //       { setcurrentPopUp({...currentPopUp, value:0})
      //         //alert(acert+' / '+maxAcert)
      //          //para sumar cuantos aciertos tiene el popups array  
      //         result = 0;
      //          setAcert(aux.reduce((accumulator, popup) => accumulator + popup.value, 0))
      //         rendeerizerstar()
      //         //alert(inputValue+ ' es incorrecto');
              
      //        setSelectedOption(null)
      //    //    alert(acert+' / ' +maxAcert)
      //   }
      
      // //  SELECT    
      // else if(selectedOption === currentPopUp.reply)
      //       { 
      //         result = 1;
      //         setcurrentPopUp({...currentPopUp, value:1})
      //         setAcert(aux.reduce((accumulator, popup) => accumulator + popup.value, 0))
              
      //         //alert(selectedOption+' ES correcta');
              
      //        setSelectedOption(null)
             
      //      //  alert(acert+' / ' +maxAcert)
           
      //       }
      // else  { 
      //   result = 0;
      //   setcurrentPopUp({...currentPopUp, value:0})
      //    //para sumar cuantos aciertos tiene el popups array 
      //    setAcert(aux.reduce((accumulator, popup) => accumulator + popup.value, 0))
                  
      //         // alert(acert+' / '+maxAcert)
      //        // alert(selectedOption+' ES incorrecta');
             
      //         setSelectedOption(null)
      //         //El renderizado de las estrellas debe venir cuando 
      //         //      alert(acert+' / ' +maxAcert)
      //       }
      
      // Check Boxs
      if(selectedOption === currentPopUp.reply){
        result = 1;

        // Se crea un array de PopUps auxiliar
        const updatedPopUps = [...popUps];

        // Encuentra el índice del PopUp
        const indexToUpdate = updatedPopUps.findIndex((popUp) => popUp.time === currentPopUp.time);

        // Verifica si se encuentra el PopUp
        if (indexToUpdate !== -1) {
          // Actualiza el PopUp específico en el array copiado.
          updatedPopUps[indexToUpdate] = {
            ...updatedPopUps[indexToUpdate],
            value: 1, // Actualiza el valor 
          };

          // Actualiza el estado con el nuevo array que contiene el objeto actualizado.
          setPopUps(updatedPopUps);
        }

        setcurrentPopUp({...currentPopUp, value:1})

        setSelectedOption(null)
      }
      else{
        setSelectedOption(null)
        result = 0;
      }

      rendeerizerstar()

      resultPopUp(result)

      setInputValue("");
      setShowPopup(false);
      setShowPopup2(false);
    };

    const resultPopUp = (result) =>{
      // Esta funcion muestra el resultado del popUp anterior 
      // si fue correcto o incorrecto

      if(result == 1){
        setShowSuccessPopUp(true)
        setShowFailedPopUp(false)
      }
      else{
        setShowFailedPopUp(true)
        setShowSuccessPopUp(false)
      }
    }

    const progressPopup = () =>{
      // Esta funcion se encarga de calcular la cantidad de aciertos 
      let totalAcerts = 0;      
      popUps.map((popUp)=>{
        console.log("valor", popUp.value)
        totalAcerts = totalAcerts + popUp.value;
      })
      setAcert(totalAcerts)

      setShowProgressPopUp(true)
    }

    const closeProgressPopup = ()=>{
      setStartAnimation(false)
      setShowProgressPopUp(false)
      player.playVideo();
    }

    const prevPopUp = () =>{
      const nearbyPopUps = popUps.filter((popUp) => popUp.time < videoTime);
      if (nearbyPopUps.length > 0) {
        const nearbyPopUp = nearbyPopUps[nearbyPopUps.length-1];
        setcurrentPopUp(nearbyPopUp)
      }
      else setcurrentPopUp({time:null, message:"", reply:"", popUpShown: false})
    }

    const nextPopUp = () =>{
      const nearbyPopUps = popUps.filter((popUp) => popUp.time > videoTime);
      if (nearbyPopUps.length > 0) {
        const nearbyPopUp = nearbyPopUps[0];
        setcurrentPopUp(nearbyPopUp)
      }
      else setcurrentPopUp({time:null, message:"", reply:"", popUpShown: false})
    }

    // Comprueba si se tiene que mostrar el PopUp
    if(Math.floor(videoTime) == currentPopUp.time && !showPopup && currentPopUp.value != 1){
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

    const [startAnimation, setStartAnimation] = useState(false)
    const progressValue = (acert / maxAcert) * 100;
    
    // Animacion de Progress
    const progressAnimation = useSpring({
      width: `${progressValue}%`, // Define la propiedad que deseas animar
      from: { width: '0%' }, // Valor inicial
      config: { duration: 200 }, // Duración de la animación en milisegundos
      onRest: () => {
        // Esta función se ejecutará cuando la animación haya terminado
        setStartAnimation(true);
      }
    });

    // Animacion Estrella
    const startRotationAnimation = useSpring({
      from: {
        rotate: 0, // Grados de rotación inicial
      },
      to: async (next) => {
        if (startAnimation) {

          await next({ rotate: 50 }); 
          await next({ rotate: -50 }); 
          
          await next({ rotate: 30 }); 
          await next({ rotate: -30 }); 

          await next({ rotate: 10 }); 
          await next({ rotate: -10 });           
          
          await next({ rotate: 2 }); 
          await next({ rotate: -2 });
          
          await next({ rotate: 0 });   

          await new Promise((resolve) => setTimeout(resolve, 500)); 

          closeProgressPopup();
        }
      },
      config: { duration: 100 }, // Configuración de animación,
    });

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

            {/* PopUp de respuesta Erronea */}
            <FailedPopUp
            showPopUp={showFailedPopUp}
            onShowFailedPopUp={handleShowFailedPopUp}
            onShowPopUp={handleShowPopUp}/>

            {/* PopUp´de respuesta Correcta */}
            <SuccessPopUp
            showPopUp={showSuccessPopUp}
            onShowSuccessPopUp={handleShowSuccessPopUp}/>

            {/* PopUp */}
            {
              showPopup && !showFailedPopUp && !showSuccessPopUp ?
              <div className="popup  absolute top-0 left-0 flex justify-center items-center text-center"  style={{zIndex:0, width:'60%', height:'90%'}}>
                <button 
                  onClick={() => {showPopup?setShowPopup(false):null; setShowPopup2(true)}} 
                  className="btn-primary"
                  style={{marginBottom: "20px", padding: "10px 22px 10px 22px"}}>
                    Actividad
                  <span role="img" aria-label="Hand Emoji">👋</span>
                </button>
              </div>:null
            }
              
            {
              showPopup2 && ( currentPopUp.type==='writer'?     

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
                <div className="bg-white overflow-hidden m-3" style={{borderRadius:"8px", minWidth: "40%"}}>

                  {/* Titulo */}
                  <h3 className='p-3' style={{fontWeight:"700",  fontSize:"21px"}}>
                  {currentPopUp.title}
                  </h3>
                  {/* Botón para mostrar el popup */}
                  

                  {/* Opciones del Selector */}
                  <ul className='flex justify-between px-6 my-4'>
                    {currentPopUp.options &&
                    currentPopUp.options.map(opt =>
                      <li
                      className='relative flex items-center my-2 justify-center'
                      key={opt}
                        >
                        <input 
                        type="radio"
                        className="mr-2 checkbox"
                        value={opt}
                        id={opt}
                        checked={selectedOption === opt}
                        onChange={(e) => handleCheckboxChange(e, opt)}/>
                        
                        <label
                        htmlFor={opt}
                        className= {`text-dark z-10 cursor-pointer`}>
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
              )
            }

            
            {/* Progress PopUp */}
            {
              showProgressPopUp && (
              <div ref={popupRef} className="popup w-full h-full absolute top-0 left-0 flex justify-center items-center text-center" style={{background:"#000a"}}>

                <div className="p-2 bg-white" style={{borderRadius:"8px", minWidth: "70%"}}>
                
                  {/* Titulo */}
                  <h3 className='' style={{fontWeight:"700", fontSize:"21px"}}>
                    Bien Hecho
                  </h3>
                  
                  <div className='flex items-center'>
                    {/* Barra de progreso */}
                    <div className='w-[100%] bg-primary_flat_hover rounded-full h-[14px] relative'>
                      <animated.div
                        className="progress-bar bg-primary rounded-full h-[14px]"
                        style={{
                          width: progressAnimation.width,
                          // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
                        }}
                      ></animated.div>
                    </div>

                    {/* Estrella */}
                    <animated.div
                      style={{
                        display: 'inline-block',
                        transform: startRotationAnimation.rotate.interpolate((rotate) => `rotate(${rotate}deg)`),
                      }}
                    >
                      <i className="fa fa-star-o w-full text-info text-[40px]"></i>
                    </animated.div>
                  </div>
                  
                </div>
              </div>
              )
            }
          </div>

          {/* Resultados de Respuestas */}
          {/* <div>{aux.map(a=>a.value)}</div>

          <div>{acert}</div> */}

          {/* Boton para activar la ACTIVIDAD */}
          {/* <div className="progress">
            <i className="fa fa-star-o"></i>
            <p>Javascript</p>
              <progress
              className='duration-500 ease-in-out'
              id="javascript"
              max={maxAcert}
              value={acert}></progress>
              <span></span>
          </div> */}
        </div>
      </Layout>
      </>
    );
  };