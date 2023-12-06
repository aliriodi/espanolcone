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
import { faAngleLeft, faAngleRight, faAngleUp, faCheck } from '@fortawesome/free-solid-svg-icons';
import DragablesBox from './DragableBox/DragablesBox';
import Selectsimple from './Selectsimple';
import { useSpring, animated } from 'react-spring';
import { useSession } from 'next-auth/react';
import ImagesGrid from './ImagesGrid/ImagesGrid';

export default function Class(props) {
  //elemento a renderizar  
  const [data, setData] = useState(null);

  // Las paginas que hay en la seccion
  const [sheetsOfSection, setSheetsOfSection] = useState([])

  //numero de pagina
  const [i, setI] = useState(0);

  //cantidad de paginas de la leccion
  const [length, setL] = useState(1);

  // Botones de paginado
  const [canFollow, setCanFollow] = useState(true)
  const [canBack, setCanBack] = useState(true)

  // listado de actividades que estan en la hoja
  const [typeActivitys, setTypeActivitys] = useState([])

  const [successActivitys, setSuccessActivitys] = useState(false)

  // Opciones de Youtube
  const iframeRef = useRef(null);

  const [currentUnitDone, setCurrentUnitDone] = useState(true)
  
  const {data: session,status, update} = useSession();

  // Segundos usados para las actividades dificiles
  const [seconds, setSeconds] = useState(60);

  const [activeChronometer, setActiveChronometer] = useState(false)

  const opts = {
    playerVars: {
      rel: 0, // Evitar videos relacionados al final
      autoplay: 1, // Desactivar la reproducción automática
      modestbranding: 1, // Ocultar el logotipo de YouTube
      fs: 1, // Oculto el boton de maximizar video fs FullScreen
      color: "#000"
    }
  }

  // Tests
  const [isTest, setIsTest] = useState(false)

  useEffect(() => {
    //me traigo todas las clase de base de datos por _id trida por props.id
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
        setData(response.class1);
        setL(response.class1.sheets.length)
        // props.updateTitle(`${response.class1?.level} - ${response.class1?.unit}`)

      })
      .catch((error) => {
        // Handle any errors
        console.error('Fetch error:', error);
      });

      // Comprueba si session.user.position tiene asignada la clase correcta
      let currentUnit = {};
      session?.user?.classes?.map((level)=>{
          level?.units?.find((unit)=>{
              if(unit?.unitID == props.id){
                  currentUnit = unit;
              }
          })
      })

      // En caso de que la unidad actual no este echa se va indicar en "currentUnitDone"
      if(!currentUnit?.done && currentUnit?.enable) setCurrentUnitDone(false)
  }, [props.id]);
  
  useEffect(()=>{
    
    // En caso de estar en una lo posiciona en el ultimo lugar al que llego
    if(session && props?.id && session?.user?.position?.id == props?.id && data?.sheets[props.page].section?.number == 5){
      
      setI(session?.user?.position?.index - data?.sheets.filter((sheet)=> sheet?.section?.number != data?.sheets[props.page].section?.number).length)

    }

    // Se asignan las paginas segun la seccion indicada en "props.page"
    setSheetsOfSection(data?.sheets.filter((sheet)=> sheet?.section?.number == data?.sheets[props.page].section?.number))
    
    // En caso de estar en la Evaluacion comprueba la cantidad de actividades que hay
    if(data?.sheets && data?.sheets[props.page].section?.number == 5){
      
      setIsTest(true)

      let cantOfActivitys = 0
      
      data?.sheets?.map((sheet)=>{

        if(sheet.section?.number == 5){

          // Busca actividades
          let activityFound = sheet?.data?.find((date)=> {
            if(
              date.type == "selectsimple" ||
              date.type == "paragraph-complete" ||
              date.type == "complete-li-personal" ||
              date.type == "complete-li" ||
              date.type == "dragable-box" ||
              date.type == 'videoi-youtube'
            ) return true;  
          })
          
          // Suma 1 a "cantOfActivitys" en caso de haber una actividad en esta "activityFound" 
          activityFound != undefined ? cantOfActivitys = cantOfActivitys + 1 : null

        }
      })

      // Se actualiza el "maxPoints" de la unidad actual
      let updates = { ...session?.user }

      let currentUnit;
      updates?.classes?.map((level)=>{
        let newUnit = level?.units?.find((unit)=> unit?.unitID == props?.id)
        if(newUnit) currentUnit = newUnit;
      })

      currentUnit.maxPoints = cantOfActivitys

      updateUser(updates)
    }
    
  },[data, props])

  async function updateUser(updates) {
    // Esta funcion se encarga de actualizar las "classes" del usuario
    // en funcion de lo que se le pase por el parametro "updates"
    try {
        
        const response = await fetch('/api/users/update', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:session?.user?.email, updates: updates}),
        });
  
        if (response.ok) {
            const data = await response.json();

            if (data.message) {
                // Se Actualiza el usuario
                await update({
                    ...session?.user,
                    accessToken:"dddd"
                })

                console.log('Usuario actualizado con éxito');
            } else {
                console.error('Error al actualizar el usuario:', data.error);
            }
        } else {
            console.error('Error al realizar la solicitud:', response.status);
        }

    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
  }

  //#region Pagination
  //como son n sheets avanzo con el boton de forward
  function Forward(i) {
    if (data) {
      if (data) { if (sheetsOfSection) { if (sheetsOfSection.length) setL(sheetsOfSection.length) } }
      if (i < sheetsOfSection.length - 1) setI(++i)
    }
  }
  //como son n sheets retrocedo con el boton de forward
  function Back(i) {
    if (data) {
      if (data) { if (sheetsOfSection) { if (sheetsOfSection.length) setL(sheetsOfSection.length) } }
      if (i > 0) setI(--i)
    }
  }

  async function updateIndexPosition(nextIndex){

    // En caso de que la actual unidad este echa o el indice actual en menor al indice indicad en "position"
    // no hay necesidad de actualizar el "position"
    if(currentUnitDone || data?.sheets?.indexOf(sheetsOfSection[i]) < session?.user?.position?.index) return
    
    let newIndex = data?.sheets.indexOf(sheetsOfSection[i])

    newIndex = nextIndex && newIndex + nextIndex <= session?.user?.position?.maxpages ? 
    newIndex + nextIndex :
    newIndex

    let updates = {
      ...session?.user,
      position:{
          ...session?.user.position,
          index:newIndex 
      }
    }
    console.log("POSICION ACTUALIZADA ", updates)

    updateUser(updates)
  }
  //#endregion
  
  //#region Verificacion de Actividades
  useEffect(()=>{
    console.log(data?.sheets)
    console.log("Type ",data?.sheets[i].type)
    console.log("Section pages ",sheetsOfSection)

    window.scrollTo({top: 0});
    setCanFollow(true)
    stopChronometer()

    // Se Asigna los tipos de actividades a "typeActivitys"
    let newTypeActivitys = [];

    sheetsOfSection[i]?.data?.map((date,index)=>{

      if(date.type == "selectsimple" ||
        date.type == "paragraph-complete" ||
        date.type == "complete-li-personal" ||
        date.type == "complete-li" ||
        date.type == "dragable-box" ||
        date.type == 'videoi-youtube'
      ){

        // Va a activar el cronometro en caso de que no sea alguno de estos tipos de elementos
        (
          date.type == "paragraph-complete" ||
          date.type == "complete-li-personal" ||
          date.type == "complete-li" ||
          date.type == 'videoi-youtube') &&
        data?.sheets[props.page].section?.number != 5 &&
        startChronometer() 
        
        // Se agrega la actividad a "typeActivitys"         
        newTypeActivitys.push({
          id:index,
          type:data.type,
          done:false
        })
        
        setCanFollow(false)
      }
      
    })

    // Se asignan las nuevas actividades
    setTypeActivitys(newTypeActivitys)

    // En caso de estar en una Evaluacion
    if(data?.sheets[props.page].section?.number == 5){
      // setCanFollow(true)
      setCanBack(false)
    }
    else setCanBack(true)

  },[i])
  
  useEffect(() => {
    let interval;

    if(activeChronometer){
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds <= 0 ? 0 : prevSeconds - 1);
      }, 1000);
    }

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);

  }, [activeChronometer]); 

  useEffect(()=>{
    if(activeChronometer && seconds == 0){
      stopChronometer()
      allowFollow()
    }
  },[seconds])

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const remainingSeconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  function startChronometer(){
    // Esta funcion se encarga de iniciar el cronometro
    setSeconds(30)
    setActiveChronometer(true)    
  }
  function stopChronometer(){
    // Esta funcion se encarga de parar el cronometro
    setActiveChronometer(false)
    if(seconds != 0) setSeconds(0)
  }

  function allowFollow(){
    // Esta funcion es usada desde los componentes actividades para activar el boton de follow
    setCanFollow(true)
  }
  //#endregion

  //#region Actividades
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

    // Se actualiza el "maxPoints" de la unidad actual
    let updates = { ...session?.user }

    let currentUnit;
    updates?.classes?.map((level)=>{
      let newUnit = level?.units?.find((unit)=> unit?.unitID == props?.id)
      if(newUnit) currentUnit = newUnit;
    })

    currentUnit.points = currentUnit.points ? currentUnit.points + 1 : 1

    updateUser(updates)
  }

  
  async function updateClasses(updates) {
    // Esta funcion se encarga de actualizar las "classes" del usuario
    // en funcion de lo que se le pase por el parametro "updates"

    setLoading(true);

    try {
        
       let newUpdates = {...session?.user, classes: updates}

        const response = await fetch('/api/users/update', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:session?.user?.email, updates: newUpdates}),
        });
  
        if (response.ok) {
            const data = await response.json();

            if (data.message) {
                // Se Actualiza el usuario
                await update({
                    ...session?.user,
                    accessToken:"dddd"
                })

                console.log('Usuario actualizado con éxito');
            } else {
                console.error('Error al actualizar el usuario:', data.error);
            }
        } else {
            console.error('Error al realizar la solicitud:', response.status);
        }

        setLoading(false)
    } catch (error) {
        setLoading(false)
        console.error('Error al realizar la solicitud:', error);
    }
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
    config: { duration: 150 },
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

  function sectionDone(){
    updateIndexPosition(1)

    window.history.back()
  }
  
  useEffect(()=> {

    if(typeActivitys.length > 0 && allActivitysDone()) activitysDone()

    console.log(typeActivitys)
  },[typeActivitys])
  //#endregion


  
  useEffect(()=>{

  },[isTest])
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

          {/* Boton de Empezemos */}
          {
            sheetsOfSection &&  data?.sheets[0] == sheetsOfSection[i]  &&
            <button
            className='bg-gradient-to-r from-primary to-secondary z-50 absolute bottom-[20%] text-white text-[28px] right-[30%] p-3 rounded-[5px] transition-all
            hover:shadow-[0px_4px_26px] hover:shadow-primary'
            onClick={() => Forward(i)}>
              ¡Empezemos!
            </button>
          }

          {/* Boton de Finalizar */}
          {
            
            <button
            onClick={()=> {
              sectionDone()
            }}
            className={`
            ${sheetsOfSection &&  (sheetsOfSection.length - 1) == i && canFollow ? "bottom-0" : "bottom-[-25%]" }
            ${ successActivitys ? "bg-secondary text-white" : "bg-white"}
            z-50 fixed  text-title_color text-[18px] left-1/2 translate-x-[-50%] px-10 py-8 rounded-[70%_70%_0_0] transition-all shadow-[0px_4px_26px_#00000040] flex flex-col items-center
            hover:bg-primary_hover hover:text-white
            md:text-[16px] md:px-7`}>
              <FontAwesomeIcon icon={faAngleUp}/>
              Finalizar
            </button>
          }

          {/* Boton de Previo */}
          {
            i != 0 &&
            <button
              className={`
              ${ !canBack && "opacity-[50%] pointer-events-none"}
              transition-all fixed bottom-0 left-0 z-[90] bg-white rounded-[0_70%_0_0] py-8 px-10 shadow-[0px_4px_26px_#00000040] text-title_color text-left text-[18px]
              hover:bg-primary_hover hover:text-white
              md:text-[16px] md:px-7`}
              onClick={() => Back(i)}>
              <FontAwesomeIcon icon={faAngleLeft}/> Prev
            </button>
          } 

          {/* Boton de Siguiente */}
          {
            i != sheetsOfSection?.length - 1 && sheetsOfSection && data?.sheets[0] != sheetsOfSection[i]  &&
            <button
              className={`
              ${ !canFollow && "opacity-[50%] pointer-events-none"}
              ${ successActivitys ? "bg-secondary text-white" : "bg-white"}
              transition-all fixed bottom-0 right-0 z-[90]  rounded-[70%_0_0_0] py-8 px-10 shadow-[0px_4px_26px_#00000040] text-title_color text-right text-[18px]
              hover:bg-primary_hover hover:text-white
              md:text-[16px] md:px-7`}
              onClick={() => {
                Forward(i);
                updateIndexPosition()
              }}>
              { activeChronometer ? formatTime(seconds) : <>Next <FontAwesomeIcon icon={faAngleRight}/></>}  
            </button>
          }
        {
          data && sheetsOfSection ?

          
          sheetsOfSection.template && i == 0 ||
          sheetsOfSection.template && (i + 1) == sheetsOfSection.length?

          // En caso de que sea la primera o ultima sheets
          sheetsOfSection[i]?.data?.map((c, index) =>
          <>

            {/* Fondo */}
            <div style={{width:80,heigth:40}}>
              <Image
                key={index+1}
                src={sheetsOfSection[i].template}
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
            <div className={style[sheetsOfSection[i]?.template]}>

              {/* Titulo */}
              <div className={style['title']}>
                {
                sheetsOfSection[i]?.data?.map((c, index) =>
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
                sheetsOfSection[i]?.data?.map((c, index) =>
                  <>
                    {/* Level */}
                    {c.type === 'level' &&
                    <p className={style[c.className]} dangerouslySetInnerHTML={{ __html: c.value }}></p> }
                    
                    {/* Imagen */}
                    {c.type === 'image' &&<Image width='100' height='100' className={style[c.className]} src={c.value} alt={c.alt} />}

                    {/* Cuadricula de Imagenes */}
                    {c.type === 'image-grid' &&
                    <ImagesGrid images={c.value}/>}
                    
                    {/* Video Youtube */}
                    {c.type === 'video-youtube' &&
                    <div className={`${style[c.className]} youtube`}> <YouTube ref={iframeRef} opts={opts} videoId={c.value} className='youtube' /> </div>}
                    
                    {/* Video Youtube con PopUps */}
                    {c.type === 'videoi-youtube' &&
                    <div className={`${style[c.className]}`}><YOUTUVEPOPUP titlep={null} popups={c.popups} videoId={c.value} className='youtube' /></div> }

                    {/* Box? */}
                    {c.type === 'options-box' &&
                      <div className={styles['box']}>
                      <div className='className'>
                        {c.type === 'options-box' ? c.value.map(value => <BOXMOMVE key={c.id} option={value} id={c.id}  />): null}
                      </div></div>
                    }

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
                    
                    {/* Parrafo a Completar de lista */}
                    {c.type === 'complete-li' &&
                    <div className={style[c.className]}><PARAGGRAPHCOMPLETE id={index} onChangeActivityDone={handleChangeActivityDone} data={c}/> </div> }
                    
                    {/* Parrafo a Completar de lista con persona*/}
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
