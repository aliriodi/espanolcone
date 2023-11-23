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
import DragablesBox from './DragableBox/DragablesBox';

export default function Class(props) {
  //elemento a renderizar  
  const [data, setData] = useState(null);

  //numero de pagina
  const [i, setI] = useState(0);

  //cantidad de paginas de la leccion
  const [length, setL] = useState(1);

  
  const [canFollow, setCanFollow] = useState(true)
  const [canBack, setCanBack] = useState(true)

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
        // props.updateTitle(`${response.class1?.level} - ${response.class1?.unit}`)

      })
      .catch((error) => {
        // Handle any errors
        console.error('Fetch error:', error);
      });
  }, [props.id]);
  
  useEffect(()=>{
    setI(props.page)
  },[props.page])

  //#region Pagination
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
  //#endregion
  
  //#region Verificacion de Actividades
  useEffect(()=>{
    console.log(data?.sheets[i])
    console.log("Type ",data?.sheets[i].type)
    console.log("Es tipo actividad? ",data?.sheets[i].type != "text" && data?.sheets[i].type != "video" && data?.sheets[i].type != "slice" && data?.sheets[i].type != "table")


    // Verifica si en esta pagina hay alguna actividad
    if(
      data?.sheets[i].type != undefined && 
      data?.sheets[i].type != "text" &&
      data?.sheets[i].type != "video" &&
      data?.sheets[i].type != "slice" &&
      data?.sheets[i].type != "table"){
      setCanFollow(false)
    }
    else setCanFollow(true);
  },[i])

  function allowFollow(){
    // Esta funcion es usada desde los componentes actividades para activar el boton de follow
    setCanFollow(true)
  }

  function checkSelectSimple(){
    
  }
  //#endregion

  //https://docs.google.com/presentation/d/10lxVnbNdlLZ6OlsXJTU9-uZ3GDJPz140/edit#slide=id.g27c3e69a393_0_0
  //https://www.figma.com/file/JZZzrLkQhTDEuUPkAsacuB/ECE-%2F-Prototipos?type=design&node-id=403-9008&mode=design&t=RIjgbE4EDSxOXwZ9-0

  return (
    <>

        {
          i == 0 &&
          <button
          className='bg-gradient-to-r from-primary to-secondary z-50 absolute bottom-[20%] text-white text-[28px] right-[30%] p-3 rounded-[5px] transition-all
          hover:shadow-[0px_4px_26px] hover:shadow-primary'
          onClick={() => Forward(i)}>
            ¡Empezemos!
          </button>
        }

        {/* Paginacion */}

          {/* Boton de Previo */}
          {
            i != 0 &&
            <button
              className={`
              ${ !canBack && "opacity-[50%] pointer-events-none"}
              transition-all fixed bottom-0 left-0 z-[90] bg-white rounded-[0_70%_0_0] py-8 px-10 shadow-[0px_4px_26px_#00000040] text-title_color text-left text-[18px]
              hover:bg-primary_hover hover:text-white`}
              onClick={() => Back(i)}>
              <FontAwesomeIcon icon={faAngleLeft}/> Prev
            </button>
          } 

          {/* Boton de Siguiente */}
          {
            i != 0 &&
            <button
              className={`
              ${ !canFollow && "opacity-[50%] pointer-events-none"}
              transition-all fixed bottom-0 right-0 z-[90] bg-white rounded-[70%_0_0_0] py-8 px-10 shadow-[0px_4px_26px_#00000040] text-title_color text-right text-[18px]
              hover:bg-primary_hover hover:text-white`}
              onClick={() => Forward(i)}>
              Next <FontAwesomeIcon icon={faAngleRight}/> 
            </button>
          }

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

                  {/* PopUp de Dialogos */}
                  {c.type === 'popup' &&
                    <div className={style[c.className]}> <p dangerouslySetInnerHTML={{ __html: c.value }}></p></div>
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

                    {/* Caja de Oraciones */}
                    {c.type === 'sentence-box' &&
                    <div className={style[c.className]}><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div>}
                    
                    {/* Drag Box */}
                    {c.type === 'dragable-box' &&
                    <DragablesBox allowFollow={allowFollow} options={c.value}/>}
                    
                    {/* Parrafo */}
                    {c.type === 'paragraph' &&
                    <p className={style[c.className]} dangerouslySetInnerHTML={{ __html: c.value }}></p>}
                    
                    
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
                    
                    {/* PopUp de Dialogos */}
                    {c.type === 'popUp-dialogues' &&
                    <div className={style[c.className]} dangerouslySetInnerHTML={{ __html: c.value }}></div>
                    }
                    
                    
                    {c.type === 'complete-li' &&
                    <div className={style[c.className]}><PARAGGRAPHCOMPLETE data={c}/> </div> }
                    
                    {c.type === 'complete-li-personal' &&
                    <div className={style[c.className]}><PARAGGRAPHCOMPLETE data={c}/> </div> }
                    
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
