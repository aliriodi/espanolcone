import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../Spinner';
import Image from 'next/image';
import styles from '../../styles/boxmove.module.css';
import YouTube from 'react-youtube';
import YOUTUVEPOPUP from '../youtubePopup/youtubePopup';
import BOXMOMVE from './boxmove'
export default function Class(props) {
  const [data, setData] = useState(null);
  const [i, setI] = useState(0);
  const [length, setL] = useState(1);
//posicion del cursor
// document.addEventListener("mousemove", function(event) {
//   const x = event.clientX;
//   const y = event.clientY;
//   console.log(`Posición del cursor: X=${x}, Y=${y}`);
// });
  // Opciones de Youtube
  const iframeRef = useRef(null);
  const opts = {
    playerVars: {
      rel: 0, // Evitar videos relacionados al final
      autoplay: 1, // Desactivar la reproducción automática
      modestbranding: 1, // Ocultar el logotipo de YouTube
      fs: 0, // Oculto el boton de maximizar video fs FullScreen
      color: "#000"
    }
  }
  // Fetch data when the component mounts
  useEffect(() => {
    fetch('/api/class/get')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((response) => {
        setData(response.class1[3]);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Fetch error:', error);
      });
  }, []);

  //como son n sheets avanzo con el boton de forward
  function Forward(i) {
    if (data) {
      if (data) { if (data.sheets) { if (data.sheets.length) setL(data.sheets.length) } }
      if (i < data.sheets.length - 1) setI(++i)
    }

  }
  //como son n sheets retrocedo con el boton de forward
  function Back(i) {
    if (data) {
      if (data) { if (data.sheets) { if (data.sheets.length) setL(data.sheets.length) } }
      if (i > 0) setI(--i)
    }
  }
  //https://docs.google.com/presentation/d/10lxVnbNdlLZ6OlsXJTU9-uZ3GDJPz140/edit#slide=id.g27c3e69a393_0_0


  return (
    <div>Class

      <h1>Esto es traido de la Base de Datos</h1>
      <div><button style={{ 'backgroundColor': '#4CCFEB', 'border': '4px solid #007bff' }} onClick={() => Back(i)}> Back </button>
        <span style={{ 'marginLeft': '16px' }}>{i + 1}/{length}</span>
        <button style={{ 'marginLeft': '16px', 'backgroundColor': '#4CCFEB', 'border': '4px solid #007bff' }} onClick={() => Forward(i)}>Forward</button>
      </div>
      <div></div>
      {
        data && data.sheets[i].data ?

          data.sheets[i].data.map((c, index) =>

            <div key={index}  >
              {/* PARA RENDERIZAR MEJOR  */}
              {c.type === 'level' ? <p dangerouslySetInnerHTML={{ __html: c.value }}></p> : null}
              {c.type === 'image' ? <Image width='100' height='100' src={c.value} alt={c.alt} /> : null}
              {c.type === 'title' ? <p dangerouslySetInnerHTML={{ __html: c.value }}></p> : null}
              {c.type === 'video-youtube' ? <YouTube ref={iframeRef} opts={opts} videoId={c.value} className='youtube' /> : null}
              {c.type === 'videoi-youtube' ? <YOUTUVEPOPUP titlep={null} popups={c.popups} videoId={c.value} className='youtube' /> : null}
              <div className={styles['box']}>
                {c.type === 'options-box' ? c.value.map(value => <BOXMOMVE key={value.y} option={value} />)
                  : null}
              </div>

              <p dangerouslySetInnerHTML={{ __html: c.value }}></p>

              {c && c.options ?

                <ul>
                  {c.options.map(option =>
                    <li key={option}>
                      {option}
                    </li>)}</ul> : null}

            </div>) : <div style={{ paddingRight: '1000px' }}> <Spinner /></div>
      }
    </div>
  )
}
