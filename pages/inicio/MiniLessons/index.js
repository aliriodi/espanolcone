import axios from "axios"
import { useEffect, useRef, useState } from "react"
import BodyGeneric from "../../../components/GenericsElements/BodyGeneric";
import Link from 'next/link';
import Spinner from "../../../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function MiniLessons() {
  const [miniLessons, setMiniLessons] = useState(null)
  const [loadMiniLessons, setLoadMiniLessons] = useState(false)
  
  ///// Filtrado

  // Nivel
  const [currentLevel, setCurrentLevel] = useState(null)
  const [openLevel, setOpenLevel] = useState(false)
  const selectLevel = useRef(null); 

  // Formato
  const [currentFormat, setCurrentFormat] = useState(null)
  const [optionsFormats, setOptionsFormats] = useState(["articulo", "libro", "leccion", "video", "lectura", "podcast"])
  const [openFormat, setOpenFormat] = useState(null) 
  const selectFormat = useRef(null); 

  // Topico
  const [currentTopic, setCurrentTopic] = useState(null)
  const [optionsTopics, setOptionsTopics] = useState(["viajes y turismo", "noticias actuales", "países y cultura", "salud y medicina", "negocios y economía", "tecnología", "estilos de vida","entretenimiento", "literatura"])

  const [openTopic, setOpenTopic] = useState(null) 
  const selectTopic = useRef(null); 
  
  useEffect(()=>{
    // Obtiene las mini lecciones 
    getMiniLesson()

    // Agrega los eventos listener a los filtros
    function handleClickOutside(event) {

      // Select de Topicos
      if (selectLevel.current && !selectLevel.current.contains(event.target)) setOpenLevel(false)

      // Select de Topicos
      if (selectFormat.current && !selectFormat.current.contains(event.target)) setOpenFormat(false)

      // Select de Topicos
      if (selectTopic.current && !selectTopic.current.contains(event.target)) setOpenTopic(false)
    }

    // Agregar un event listener al documento para detectar clics
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Remover el event listener al desmontar el componente
      document.removeEventListener('click', handleClickOutside);
    };
  },[])

  //useEffect(()=> console.log(miniLessons),[miniLessons])

  async function getMiniLesson(){
    setLoadMiniLessons(true)

    let lessons;
    
    try{
      
      lessons = await axios.get(`/api/ulessons/get?level=${currentLevel ? currentLevel : ""}&formats=${currentFormat ? currentFormat : ""}&topics=${currentTopic ? currentTopic : ""}&inReview=${0}`)
     // console.log( lessons )
      setLoadMiniLessons(false)
    }
    catch(e){
      console.log(e)
      setLoadMiniLessons(false)
    }

    setMiniLessons(lessons?.data?.ulessons)
  }

  useEffect(()=>{
    getMiniLesson()
  },[currentLevel, currentFormat, currentTopic])

  return (
    <BodyGeneric>
      
      <div className="mt-[50px]">

        {/*////////////////// Filtros //////////////////*/}
        <div className=" mb-3 flex
        md:flex-col">

          {/* Filtrado por Nivel */}
          <div className="relative mr-1 w-fit
          md:w-full md:my-1">

            {/* Nivel actual */}
            <label
            ref={selectLevel}
            onClick={()=> setOpenLevel(!openLevel)}
            className={`
            ${currentLevel ? `bg-${currentLevel} text-white` : "bg-white text-violet_dark"}
            flex items-center text-[18px] px-6 py-4 w-fit rounded-[7px] cursor-pointer font-medium shadow-[0px_4px_24px_#18292F1A]
            md:w-full md:justify-between
            `}>

              <p className=" pr-3">
                {
                  currentLevel ?
                  `Nivel ${currentLevel}`
                  :
                  <>Todos los <b>niveles</b></>
                }
              </p>

              { 
              openLevel ? 
              <FontAwesomeIcon className="ml-3" icon={faAngleUp}/>
              :
              <FontAwesomeIcon className="ml-3" icon={faAngleDown}/>
              }
            </label>

            {/* Niveles */}
            {
              openLevel &&
              <ul
              onClick={()=>setOpenLevel(false)}
              className=" absolute flex flex-col w-full rounded-[7px] overflow-hidden bg-white shadow-[0px_4px_35px_#00000040] left-[30%] top-[90%] z-[60]
              md:left-0">

                {/* Todos */}
                <li
                onClick={()=>setCurrentLevel(null)}
                className="bg- text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Todos
                </li>

                {/* A1 */}
                <li
                onClick={()=>setCurrentLevel("A1")}
                className="bg- text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Nivel <b className=" text-primary">A1</b>
                </li>

                {/* A2 */}
                <li
                onClick={()=>setCurrentLevel("A2")}
                className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Nivel <b className="bg-gradient-to-b from-primary to-success text-transparent bg-clip-text">A2</b>
                </li>

                {/* B1 */}
                <li
                onClick={()=>setCurrentLevel("B1")}
                className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Nivel <b className="text-success">B1</b>
                </li>

                {/* B2 */}
                <li
                onClick={()=>setCurrentLevel("B2")}
                className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Nivel <b className="bg-gradient-to-b from-success to-warning text-transparent bg-clip-text">B2</b>
                </li>
                
                {/* C1 */}
                <li
                onClick={()=>setCurrentLevel("C1")}
                className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Nivel <b className="text-warning">C1</b>
                </li>
                
                {/* C2 */}
                <li
                onClick={()=>setCurrentLevel("C2")}
                className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Nivel <b className="bg-gradient-to-b from-warning to-info text-transparent bg-clip-text">C2</b>
                </li>
                
              </ul>
            }

          </div>
          
          {/* Filtrado por Formato */}
          <div className="relative mx-1 w-fit
          md:w-full md:m-0 md:my-1">

            {/* Formato actual */}
            <label
            ref={selectFormat}
            onClick={()=> setOpenFormat(!openFormat)}
            className={`bg-white text-violet_dark flex items-center text-[18px] px-6 py-4 w-fit rounded-[7px] cursor-pointer font-medium shadow-[0px_4px_24px_#18292F1A]
            md:w-full md:justify-between
            `}>

              <p className=" pr-3">
                {
                  currentFormat ?
                  <>Formato: <b>{currentFormat}</b></>
                  :
                  <>Todos los <b>formatos</b></>
                }
              </p>

              { 
              openFormat ? 
              <FontAwesomeIcon className="ml-3" icon={faAngleUp}/>
              :
              <FontAwesomeIcon className="ml-3" icon={faAngleDown}/>
              }
            </label>

            {/* Formatos */}
            {
              openFormat &&
              <ul
              onClick={()=>setOpenFormat(false)}
              className=" absolute flex flex-col w-full min-w-[150px] rounded-[7px] overflow-hidden bg-white shadow-[0px_4px_35px_#00000040] left-[30%] top-[90%] z-[60]
              md:left-0">

                {/* Todos */}
                <li
                onClick={()=>setCurrentFormat(null)}
                className="text-violet_dark text-[18px] py-3 font-medium text-center cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Todos
                </li>

                {
                  optionsFormats?.map((format, index)=>
                    
                    <li
                    key={index}
                    onClick={()=>setCurrentFormat(format)}
                    className="text-violet_dark text-[18px] py-3 font-medium text-center cursor-pointer transition-all
                    hover:bg-primary_flat_hover">
                      {format}
                    </li>

                  )
                }
                
              </ul>
            }

          </div>
          
          {/* Filtrado por Topico */}
          <div className="relative mx-1 w-fit
          md:w-full md:m-0 md:my-1">

            {/* Topico actual */}
            <label
            ref={selectTopic}
            onClick={()=> setOpenTopic(!openTopic)}
            className={`bg-white text-violet_dark flex items-center text-[18px] px-6 py-4 w-fit rounded-[7px] cursor-pointer font-medium shadow-[0px_4px_24px_#18292F1A]
            md:w-full md:justify-between
            `}>

              <p className=" pr-3">
                {
                  currentTopic ?
                  <>Topico: <b>{currentTopic}</b></>
                  :
                  <>Todos los <b>topicos</b></>
                }
              </p>

              { 
              openTopic ? 
              <FontAwesomeIcon className="ml-3" icon={faAngleUp}/>
              :
              <FontAwesomeIcon className="ml-3" icon={faAngleDown}/>
              }
            </label>

            {/* Topicos */}
            {
              openTopic &&
              <ul
              onClick={()=>setOpenTopic(false)}
              className=" absolute flex flex-col w-full min-w-[150px] rounded-[7px] overflow-hidden bg-white shadow-[0px_4px_35px_#00000040] left-[30%] top-[90%] z-[60]
              md:left-0">

                {/* Todos */}
                <li
                onClick={()=>setCurrentTopic(null)}
                className="text-violet_dark text-[18px] py-3 font-medium text-center cursor-pointer transition-all
                hover:bg-primary_flat_hover">
                  Todos
                </li>

                {
                  optionsTopics?.map((format, index)=>
                    
                    <li
                    key={index}
                    onClick={()=>setCurrentTopic(format)}
                    className="text-violet_dark text-[18px] py-3 font-medium text-center cursor-pointer transition-all
                    hover:bg-primary_flat_hover">
                      {format}
                    </li>

                  )
                }
                
              </ul>
            }

          </div>

        </div>

        {/*////////////////// Mini Lesiones //////////////////*/}
        <div
        className="grid grid-cols-3 gap-7 relative
        lg:grid-cols-2
        md:grid-cols-1">

          
          {
            miniLessons ?
            <>

              {
                miniLessons?.length > 0 ?

                // Encontro las Mini leciones
                miniLessons?.map((lesson, index)=>
                  <Link
                  key={index}
                  href={`/inicio/MiniLessons/${lesson?._id}`}
                  className="min-w-[300px] h-[270px] bg-dark rounded-[14px] relative overflow-hidden shadow-[0px_4px_24px_#18292F1A] flex items-end
                  md:w-full">
                    
                    {/* Nivel */}
                    <p
                    className={`text-[21px] font-semibold w-14 h-14 text-white flex justify-center items-center bg-${ lesson?.level } absolute top-0 left-0 z-20 rounded-[0_0_100%_0]`}>
                      {lesson?.level}
                    </p>

                    <div
                    className="w-full bg-gradient-to-t from-[#000] to-transparent z-20 text-white p-4">

                      {/* Descripcion */}
                      <p className=" text-[31px] relative font-bold">{lesson?.description}</p>

                      {/* Formatos */}
                      <p className="relative">{lesson?.formats} | {lesson?.topics}</p>

                    </div>

                    {/* Imagen */}              
                    <img 
                    className="absolute w-full h-full object-cover bg-light z-10 top-0 left-0"
                    src={lesson?.image}/>
                  </Link>            
                )

                :
                // No encontro las Mini leciones
                <div className=" absolute top-0 left-0 w-full my-[100px] font-semibold text-[18px] text-light flex justify-center items-center z-50">
                  No se encontraron Minilesiones
                </div>
              }

              {/* Cargador en caso de estar buscando leciones */}
              {
                loadMiniLessons &&
                <div className={`w-full h-full bg-[#fff8] top-0 left-0 absolute flex justify-center items-center ${ miniLessons?.length <= 0  && "my-[100px]"} z-50`}>
                  <Spinner/>
                </div>
              }
            </>
            :

            // Cargador
            <div className=" absolute top-0 left-0 flex justify-center items-center h-screen w-screen">
              <Spinner/>
            </div>
          }
        </div>
        
      </div>
    </BodyGeneric>
  )
}