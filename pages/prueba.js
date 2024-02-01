import React , { useState } from 'react'
import YouTube from 'react-youtube';

export default function prueba() {
  
  function _onReady(e) {
    // access to player in all event handlers via event.target
    e.target.pauseVideo();
  }
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      cc_lang_pref: 'en',
      cc_load_policy:1
    }}
    const opts2 = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        cc_lang_pref: 'pt',
        cc_load_policy:1
      }}
  return (
    <div>hola Nahuel
      <p></p>
      <div className='grid grid-cols-2 p-12'>
      <div className='pt-14'>
     <YouTube 
      videoId='TR1HoQ8uCEs'
      opts={opts}
    //  onReady={_onReady} 
     /> <br/>
    <b> Este video tiene subtitulos en ingles</b>
     </div>
     <div className='pt-14'>
    
     <YouTube 
     controls
      videoId='TR1HoQ8uCEs'
      opts={opts2}
   //   onReady={_onReady} 
     /> <br/>
     <b>este video tiene subtitulos en portugues</b>
     </div>
     <div>
     {/* <video width="560" height="315" controls> */}
  {/* <source src="https://res.cloudinary.com/tu-nombre-de-usuario/video/upload/tu-video.mp4" type="video/mp4" /> */}
  Tu navegador no soporta la etiqueta de video.
{/* </video> */}

     <br/><b>Video Cloudinary</b></div>
     
     <div><br/><iframe width="560" height="315" src="https://www.youtube.com/embed/qOCgDGIo6hg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     <br/><b>Video Publico</b></div>



    
     </div>
    </div>
  )
}
