import React, { useState ,useRef,useEffect } from 'react';
import Image from 'next/image';
import Spinner from '../Spinner';
import styles from '../../styles/boxmove.module.css';
import YouTube from 'react-youtube';
import YOUTUVEPOPUP from '../youtubePopup/youtubePopup';
import BOXMOMVE from './boxmove';
import SELECTSIMPLE from './Selectsimple';
import PARAGGRAPHCOMPLETE from './paragragraphcomplete';
import style from '../../styles/class.module.css'

export default function Class(props) {
  //elemento a renderizar  
  const [data, setData] = useState(null);
  //numero de pagina
  const [i, setI] = useState(0);
  //cantidad de paginas de la leccion
  const [length, setL] = useState(1);


  // Opciones de Youtube
  const iframeRef = useRef(null);

  const opts = {
    playerVars: {
      rel: 0, // Evitar videos relacionados al final
      autoplay: 1, // Desactivar la reproducción automática
      modestbranding: 1, // Ocultar el logotipo de YouTube
      fs: 1, // Oculto el boton de maximizar video fs FullScreen
      color: "#000"
    }
  }
  // Fetch data when the component mounts 
  //me traigo todas las clases a futuro me traigo solo las del usuario en sesion
  useEffect(() => {
    fetch('/api/class/'+props.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((response) => {
        //const a=props.id;
        //Para colocar el indice de pagina en 0 porque nos paso que estabamos en la pagina 20
        //y cuando se llamaba otra clase con menos paginas quedaba en la pagina 20 y se rompia
        //el render aca garantizamos que al entrar a la promesa se va a 0 el index
        
        setI(0)
       // alert(typeof(response.class1))
        setData(response.class1);
        setL(response.class1.sheets.length)

      })
      .catch((error) => {
        // Handle any errors
        console.error('Fetch error:', error);
      });
  }, [props.id]);
  

  //PAGINATION
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
  //https://www.figma.com/file/JZZzrLkQhTDEuUPkAsacuB/ECE-%2F-Prototipos?type=design&node-id=403-9008&mode=design&t=RIjgbE4EDSxOXwZ9-0

  return (
    <div>
     {/* <h2>Me traigo todas las clases a futuro me traigo solo las del usuario en sesion</h2>
     <h2>Renderizando clase numero {props.id}</h2>
      <h1>Esto es traido de la Base de Datos</h1> */}
      <div><button style={{ 'backgroundColor': '#4CCFEB', 'border': '4px solid #007bff' }} onClick={() => Back(i)}> Back </button>
        <span style={{ 'marginLeft': '16px' }}>{i + 1}/{length}</span>
        <button style={{ 'marginLeft': '16px', 'backgroundColor': '#4CCFEB', 'border': '4px solid #007bff' }} onClick={() => Forward(i)}>Forward</button>
      </div>
      <div></div>
      {
        data &&data.sheets[i].data ?

                    
          data.sheets[i].data.map((c, index) =>
            <>
         
              {/* {console.log(index,i,c.className)} */}
              {/* PARA RENDERIZAR MEJOR  */}
             {data.sheets[i].template?<Image
                src={data.sheets[i].template}
                alt="Background Image"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                style={{zIndex: -10}}
                className="z-10"
              />:null} 
              <div className={style[c.className]} key={index}  >
              {c.type === 'level' ? <p dangerouslySetInnerHTML={{ __html: c.value }}></p> : null}
              
              {c.type === 'image' ? <div className='className'><Image width='100' height='100' src={c.value} alt={c.alt} /> </div>: null}
              {c.type === 'title' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p></div> : null}
              {c.type === 'video-youtube' ?<div className='youtube'> <YouTube ref={iframeRef} opts={opts} videoId={c.value} className='youtube'style={{ maxWidth: '400px', width: '100%' }} /> </div>: null}
              {c.type === 'videoi-youtube' ? <div className='className'><YOUTUVEPOPUP titlep={null} popups={c.popups} videoId={c.value} className='youtube' /></div> : null}
              <div className={styles['box']}>
              <div className='className'>
                {c.type === 'options-box' ? c.value.map(value => <BOXMOMVE key={value.y} option={value} id={c.id}  />): null}
              </div></div>
              {c.type === 'paragraph' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div>: null}
              {c.type === 'sentence-box' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div>: null}
              {c.type === 'selectsimple' ? <div className='className'> <SELECTSIMPLE key={c.option} data={c}/> </div>:null}
              {c.type === 'text' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div>: null}
              {/* En la siguiente linea falta destructurar el objeto como input form */}
              {c.type === 'paragraph-complete' ? <div className='className'><PARAGGRAPHCOMPLETE data={c}/></div> : null}
              {c.type === 'complete-li' ? <div className='className'><PARAGGRAPHCOMPLETE data={c}/> </div> :  null}
              {c.type === 'complete-li-personal' ? <div className='className'><PARAGGRAPHCOMPLETE data={c}/> </div> :  null}
              {c.type === 'popup' ?<div className='className'> <p dangerouslySetInnerHTML={{ __html: c.value }}></p></div> : null}
              {/* <p dangerouslySetInnerHTML={{ __html: c.value }}></p> */}
            </div></>) 
            : <div style={{ paddingRight: '1000px' }}> <Spinner /></div>
      }
    </div>
  )
}
