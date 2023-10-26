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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
  //me traigo todas las clase de base de datos por _id trida por props.id
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
        
       // alert(typeof(response.class1))
        setData(response.class1);
        setL(response.class1.sheets.length)

      })
      .catch((error) => {
        // Handle any errors
        console.error('Fetch error:', error);
      });
  }, [props.id]);
  
  useEffect(()=>{
    setI(props.page)
  },[props.page])

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

  useEffect(()=>{
    console.log(data)
    console.log(data?.sheets[i])
  },[i])

  //https://docs.google.com/presentation/d/10lxVnbNdlLZ6OlsXJTU9-uZ3GDJPz140/edit#slide=id.g27c3e69a393_0_0
  //https://www.figma.com/file/JZZzrLkQhTDEuUPkAsacuB/ECE-%2F-Prototipos?type=design&node-id=403-9008&mode=design&t=RIjgbE4EDSxOXwZ9-0

  return (
    <>

      {/* Paginacion */}
      <div className='fixed bottom-6 w-full flex justify-center z-50'>

        <div className='pagination' style={{boxShadow:"0px 4px 26px #00000040"}}>

          {/* Boton de Previo */}
          <button
          className='pagination-btn'
          onClick={() => Back(i)}>
            <FontAwesomeIcon icon={faAngleLeft}/> Prev
          </button>

          {/* Index */}
          <span className='pagination-index'>{i + 1} / {length}</span>

          {/* Boton de Siguiente */}
          <button
          className='pagination-btn'
          onClick={() => Forward(i)}>
            Next <FontAwesomeIcon icon={faAngleRight}/> 
          </button>
          
        </div>
      </div>

      {
        data && data.sheets[i]?.data ?

        
        data.sheets[i].template && i == 0 ||
        data.sheets[i].template && (i + 1) == data.sheets.length?

        // En caso de que sea la primera o ultima sheets
        data.sheets[i].data.map((c, index) =>
        <>

          {/* Fondo */}
          <div style={{width:80,heigth:40}}>
            <Image
              key={index+1}
              src={data.sheets[i].template}
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              style={{zIndex: -10}}
              className="z-10"
            />
          </div>

          {/* Contenido */}
          <div className={style[c.className]} key={index}>

            {c.type === 'title' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p></div> : null}
            
            {c.type === 'paragraph' ? <div className='className'><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div>: null}
            
          </div>

        </>)

        :

        // En el caso contrario se muestra el resto sheets
        <>
          {/* Teample */}
          <div className={style[data.sheets[i].template]}>

            {/* Titulo */}
            <div className={style['title']}>
              {
              data.sheets[i].data.map((c, index) =>
              <>
                {c.type === 'title' && 
                  <div className={style[c.className]}>
                    <p dangerouslySetInnerHTML={{ __html: c.value }}></p>
                  </div>
                }
              </>

              )}
            </div>
            
            {/* Contenido */}
            <div className={style['content']}>
              {
              data.sheets[i].data.map((c, index) =>
                <>
                  {/* Level */}
                  {c.type === 'level' &&
                  <p className={style[c.className]} dangerouslySetInnerHTML={{ __html: c.value }}></p> }
                  
                  {/* Imagen */}
                  {c.type === 'image' &&<Image width='100' height='100' className={style[c.className]} src={c.value} alt={c.alt} />}
                  
                  {/* Video Youtube */}
                  {c.type === 'video-youtube' &&
                  <div className={`${style[c.className]} youtube`}> <YouTube ref={iframeRef} opts={opts} videoId={c.value} className='youtube' /> </div>}
                  
                  {/* Video Youtube con PopUps */}
                  {c.type === 'videoi-youtube' &&
                  <div className={`${style[c.className]}`}><YOUTUVEPOPUP titlep={null} popups={c.popups} videoId={c.value} className='youtube' /></div> }

                  {/* Box? */}
                  <div className={styles['box']}>
                  <div className='className'>
                    {c.type === 'options-box' ? c.value.map(value => <BOXMOMVE key={c.id} option={value} id={c.id}  />): null}
                  </div></div>
                  
                  {/* Parrafo */}
                  {c.type === 'paragraph' &&
                  <p className={style[c.className]} dangerouslySetInnerHTML={{ __html: c.value }}></p>}
                  
                  {/* Caja de Oraciones */}
                  {c.type === 'sentence-box' &&
                  <div className={style[c.className]}><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div>}
                  
                  {/* SelectSimple */}
                  {c.type === 'selectsimple' &&
                  <div className={style[c.className]}> <SELECTSIMPLE key={c.option} data={c}/> </div>}
                  
                  {/* Texto */}
                  {c.type === 'text' &&
                  <div className={style[c.className]}><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div>}
                  {/* En la siguiente linea falta destructurar el objeto como input form */}
                  
                  {/* Parrafo a Completar */}
                  {c.type === 'paragraph-complete' &&
                  <div className={style[c.className]}><PARAGGRAPHCOMPLETE data={c}/></div> }
                  
                  {c.type === 'complete-li' &&
                  <div className={style[c.className]}><PARAGGRAPHCOMPLETE data={c}/> </div> }
                  
                  {c.type === 'complete-li-personal' &&
                  <div className={style[c.className]}><PARAGGRAPHCOMPLETE data={c}/> </div> }
                  
                  {c.type === 'popup' &&
                  <div className={style[c.className]}> <p dangerouslySetInnerHTML={{ __html: c.value }}></p></div> }
                  {/* <p dangerouslySetInnerHTML={{ __html: c.value }}></p> */}
                </>)
                } 
            </div>
            
          </div>
        </>

        : <div style={{ paddingRight: '1000px' }}> <Spinner /></div>
      }
    </>
  )
}
