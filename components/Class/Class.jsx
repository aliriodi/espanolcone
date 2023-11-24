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
import { faAngleLeft, faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import DragablesBox from './DragableBox/DragablesBox';
import Selectsimple from './Selectsimple';
import { useSpring, animated } from 'react-spring';

export default function Class(props) {
  //elemento a renderizar  
  const [data, setData] = useState(null);

  //numero de pagina
  const [i, setI] = useState(0);

  //cantidad de paginas de la leccion
  const [length, setL] = useState(1);

  const [canFollow, setCanFollow] = useState(true)
  const [canBack, setCanBack] = useState(true)

  const [typeActivitys, setTypeActivitys] = useState([])

  const [successActivitys, setSuccessActivitys] = useState(false)

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

    window.scrollTo({top: 0});
    setCanFollow(true)
    // setSuccessActivitys(false)

    // Se Asigna los tipos de actividades a "typeActivitys"
    let newTypeActivitys = [];

    data?.sheets[i].data?.map((data,index)=>{

      if(data.type == "selectsimple" ||
        data.type == "paragraph-complete" ||
        data.type == "complete-li-personal" ||
        data.type == "complete-li" ||
        data.type == "dragable-box" ||
        data.type == 'videoi-youtube'
      ){

        // "allowFollow" va a permitir que el boton de forward este activo en caso de que no sea alguno de estos tipos de elementos
        let allowFollow = data.type == "paragraph-complete" || data.type == "complete-li-personal" || data.type == "complete-li" || data.type == 'videoi-youtube';

        newTypeActivitys.push({
          id:index,
          type:data.type,
          done:false
        })



        setCanFollow(allowFollow)
      }

    })

    // Se asignan las nuevas actividades
    setTypeActivitys(newTypeActivitys)

  },[i])

  function allowFollow(){
    // Esta funcion es usada desde los componentes actividades para activar el boton de follow
    setCanFollow(true)
  }

  //#endregion

  //#region Activity
  function allActivitysDone(){
    // Esta funcion devuelve un Boolean indicando si todas las actividades en "typeActivitys" estan echas
    let result = true;
    
    typeActivitys?.map((activity)=>{
      if(activity.done == false) result = false;
    })

    return result
  }

  function handleChangeActivityDone(id, value){
    // Esta funcion se encarga de cambiar el valor "done" de la actividad espesificada por "id",
    // que se encuentra en "typeActivitys"
    setTypeActivitys(typeActivitys=>{
      typeActivitys = typeActivitys.filter((activity)=>{

        if(activity.id == id){
          let newActivity = activity;
          newActivity.done = value;
          return newActivity
        }

        return activity

      })
      return typeActivitys
    })
  }

  function activitysDone(){
    setCanFollow(true)
    setSuccessActivitys(true)
    // alert("actividad completadas")
  }
  
  // Animaciones de Check 
  const [shakesCheck, setShakesCheck] = useState(false)

  const translateCheckAnimation =  useSpring({
    from: {
      top: -200, // Grados de rotación inicial
    },
    to: async (next) => {
      if(successActivitys){
        await next({ top: 100 });
        await next({ top: 120 });
        await next({ top: 125 }); 
  
        setShakesCheck(true)
  
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        await next({ top: -100 }); 
      }
      setSuccessActivitys(false)
    },
    config: { duration: 100 },
  })

  const successCheckAnimation = useSpring({
    from: {
      rotate: 0, // Grados de rotación inicial
    },
    to: async (next) => {
      if (shakesCheck) {

        await next({ rotate: 50 }); 
        await next({ rotate: -50 }); 
        
        await next({ rotate: 30 }); 
        await next({ rotate: -30 }); 
  
        await next({ rotate: 10 }); 
        await next({ rotate: -10 });           
        
        await next({ rotate: 2 }); 
        await next({ rotate: -2 });
        
        await next({ rotate: 0 });   
  
        await new Promise((resolve) => setTimeout(resolve, 100)); 

        
        setShakesCheck(true)
        }
      },

    config: { duration: 100 }, // Configuración de animación,
  }); 
  
  useEffect(()=> {

    if(typeActivitys.length > 0 && allActivitysDone()) activitysDone()

    console.log(typeActivitys)
  },[typeActivitys])
  //#endregion

  //https://docs.google.com/presentation/d/10lxVnbNdlLZ6OlsXJTU9-uZ3GDJPz140/edit#slide=id.g27c3e69a393_0_0
  //https://www.figma.com/file/JZZzrLkQhTDEuUPkAsacuB/ECE-%2F-Prototipos?type=design&node-id=403-9008&mode=design&t=RIjgbE4EDSxOXwZ9-0

  return (
    <>
        {/* Check */}
        <animated.div
        className='fixed left-1/2 translate-x-[-50%] rounded-full bg-white w-[100px] h-[100px] flex justify-center items-center border-solid border-[4px] border-secondary z-50'
          style={{
            top: translateCheckAnimation.top,
            translateX: "-50%",
            rotate:successCheckAnimation.rotate,
          }}
          >
            <FontAwesomeIcon className='w-[40%] h-[40%] p-[25%] rounded-full text-secondary text-[28px]' icon={faCheck}/>
        </animated.div>

        {/* Paginacion */}

          {/* Empezemos */}
          {
            i == 0 &&
            <button
            className='bg-gradient-to-r from-primary to-secondary z-50 absolute bottom-[20%] text-white text-[28px] right-[30%] p-3 rounded-[5px] transition-all
            hover:shadow-[0px_4px_26px] hover:shadow-primary'
            onClick={() => Forward(i)}>
              ¡Empezemos!
            </button>
          }

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
              ${ successActivitys ? "bg-secondary text-white" : "bg-white"}
              transition-all fixed bottom-0 right-0 z-[90]  rounded-[70%_0_0_0] py-8 px-10 shadow-[0px_4px_26px_#00000040] text-title_color text-right text-[18px]
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
                    <DragablesBox allowFollow={allowFollow} options={c.value} id={index} onChangeActivityDone={handleChangeActivityDone}/>}
                    
                    {/* Parrafo */}
                    {c.type === 'paragraph' &&
                    <p className={style[c.className]} dangerouslySetInnerHTML={{ __html: c.value }}></p>}
                    
                    
                    {/* SelectSimple */}
                    {c.type === 'selectsimple' &&
                    <div className={style[c.className]}><SELECTSIMPLE key={c.option} data={c} id={index} onChangeActivityDone={handleChangeActivityDone}/></div>}
                    
                    {/* Texto */}
                    {c.type === 'text' &&
                    <div className={style[c.className]}><p dangerouslySetInnerHTML={{ __html: c.value }}></p> </div>}
                    {/* En la siguiente linea falta destructurar el objeto como input form */}
                    
                    {/* Parrafo a Completar */}
                    {c.type === 'paragraph-complete' &&
                    <div className={style[c.className]}><PARAGGRAPHCOMPLETE id={index} onChangeActivityDone={handleChangeActivityDone} data={c}/></div> }
                    
                    {/* PopUp de Dialogos */}
                    {c.type === 'popUp-dialogues' &&
                    <div className={style[c.className]} dangerouslySetInnerHTML={{ __html: c.value }}></div>
                    }
                    
                    
                    {c.type === 'complete-li' &&
                    <div className={style[c.className]}><PARAGGRAPHCOMPLETE id={index} onChangeActivityDone={handleChangeActivityDone} data={c}/> </div> }
                    
                    {c.type === 'complete-li-personal' &&
                    <div className={style[c.className]}><PARAGGRAPHCOMPLETE id={index} onChangeActivityDone={handleChangeActivityDone} data={c}/> </div> }
                    
                    {/* <p dangerouslySetInnerHTML={{ __html: c.value }}></p> */}

                    
                  </>)
                  } 
              </div>
              
            </div>
          </>

          : <div className='fixed w-screen h-screen flex justify-center items-center'> <Spinner /></div>
        }
    </>
  )
}
