import { useEffect, useRef, useState } from "react";
import AdminPage from "../../../../../components/GenericsElements/Admin/AdminPage";
import BodyGeneric from "../../../../../components/GenericsElements/BodyGeneric";
import ActivityTemplate from "../../../../../components/GenericsElements/Activity/ActivityTemplate";
import ActivityTemplateEdit from "../../../../../components/GenericsElements/Activity/ActivityTemplateEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faCloudArrowUp, faRotate } from "@fortawesome/free-solid-svg-icons";
import axios  from "axios";
import { useRouter } from "next/router";

export default function EditExpress() {

    // Mini leccion 
    const [currentSheets, setCurrentSheets] = useState([
        {
          level:"A2",
          description:"",
          topics:"tecnología",
          formats:["video"],
          template: "mini-1",
          sheets: [
            {
              type: "title",
              value: "Titulo por Defecto",
              className: "subtitle-default",
            },
            {
              type: "separator",
              className: "separator"
            },
            {
              type: "paragraph",
              value: "Las microlecciones son módulos o piezas de aprendizaje de consumo rápido que se enfocan en un determinado contenido. Las microlecciones no se desarrollan “porque el estudiante no tiene capacidad de atención” o porque “se quiere ahorrar tiempo durante la sesión”",
              className: "paragraph-default"
            },
            {
              type: "separator",
              className: "separator-transparent"
            },
            {
              type: "selectsimple",
              value: "1.Las microlecciones son...",
              option: "3. Todas las anteriores",
              options: [
                "1. Módulos o piezas de aprendizaje",
                "2. Son de consumo rápido",
                "3. Todas las anteriores",
                "4. Ninguna de las anteriores"
              ],
              className: "selector-simple"
            },
            {
              type: "selectsimple",
              value: "2. ¿Por qué se desarrollan las microlecciones?",
              option: "1. Para ahorrar tiempo en la sesion de clases",
              options: [
                "1. Para ahorrar tiempo en la sesion de clases",
                "2. Para que el estudiante no practique",
                "3. Para no motivar al estudiante a profundizar su conocimiento"
              ],
              className: "selector-simple"
            }
          ],
          image:"https://res.cloudinary.com/dfddh08q8/image/upload/v1704251435/images/wt4cjf02o621j15pdxoe.png"
        }
    ])

    const [load, setLoad] = useState(false)
    const router = useRouter();
    const { id } = router.query;

    // Nivel
    const [openLevel, setOpenLevel] = useState(false)
    const selectLevel = useRef(null); 

    // Formato
    const [optionsFormats, setOptionsFormats] = useState(["articulo", "libro", "leccion", "video", "lectura", "podcast"])
    const [openFormat, setOpenFormat] = useState(null) 
    const selectFormat = useRef(null); 

    // Topico
    const [optionsTopics, setOptionsTopics] = useState(["viajes y turismo", "noticias actuales", "países y cultura", "salud y medicina", "negocios y economía", "tecnología", "estilos de vida","entretenimiento", "literatura"])
    const [openTopic, setOpenTopic] = useState(null) 
    const selectTopic = useRef(null);

    useEffect(()=>{
      
      getMinilesson()
      
    },[id])

    function handleChangeSheet(sheet){
      try{
        setCurrentSheets([sheet])
      }
      catch(e){
        alert("se produjo un error")
      }
    }

    async function getMinilesson(){

      if(id){

        let response = await axios.get(`/api/ulessons/${id}`)

        setCurrentSheets([
          {
            level:response?.data?.ulesson.level,
            description: response?.data?.ulesson?.description,
            topics: response?.data?.ulesson?.topics,
            formats: response?.data?.ulesson?.formats,
            template: "mini-1",
            sheets: response?.data?.ulesson?.sheets[0]?.data,
            image: response?.data?.ulesson?.image
          }
        ])

      }
    }
    
    async function uploadMinilesson(){
      let finalMini = currentSheets[0];

      
      finalMini = {
        ...finalMini,
        sheets:[
          {
            template: "mini-1",
            data:[...finalMini.sheets]  
          }
        ],
        _id:id
      } 
      
      setLoad(true)
      await axios.post('/api/ulessons/update',finalMini)


      setLoad(false)
    }

    return (
        <BodyGeneric>

            <AdminPage>

              {/* Edicion de Mini */}
              <div
              className="mt-10 mb-7">

                {/* Descripcion */}
                <div
                className="flex flex-col text-violet_dark my-6">

                  <label className="font-medium">Descripcion</label>

                  <input
                  placeholder="Escribe una descripcion"
                  className="w-1/2 rounded-[7px] border-2 px-2 py-1  outline-primary"
                  onChange={(e)=>handleChangeSheet({...currentSheets[0], description: e.target.value})}
                  value={currentSheets[0]?.description}/>

                </div>

                
                {/* Imagen */}
                <div
                className="flex flex-col text-violet_dark my-6">

                  <label className="font-medium">Imagen</label>

                  <input
                  placeholder="Escribe un URL"
                  className="w-1/2 rounded-[7px] border-2 px-2 py-1  outline-primary"
                  onChange={(e)=>handleChangeSheet({...currentSheets[0], image: e.target.value})}
                  value={currentSheets[0]?.image}/>

                </div>

                {/* Selectores */}
                <div className=" my-3 flex
                md:flex-col">

                  {/* Selecion por Nivel */}
                  <div className="relative mr-1 w-fit
                  md:w-full md:my-1">

                    {/* Nivel actual */}
                    <label
                    ref={selectLevel}
                    onClick={()=> setOpenLevel(!openLevel)}
                    className={`
                    ${currentSheets[0].level ? `bg-${currentSheets[0].level} text-white` : "bg-white text-violet_dark"}
                    flex items-center text-[18px] px-6 py-4 w-fit rounded-[7px] cursor-pointer font-medium shadow-[0px_4px_24px_#18292F1A]
                    md:w-full md:justify-between
                    `}>

                      <p className=" pr-3">
                        {
                          currentSheets[0].level ?
                          `Nivel ${currentSheets[0].level}`
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
                        onClick={()=>handleChangeSheet({...currentSheets[0],level:null})}
                        className="bg- text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Todos
                        </li>

                        {/* A1 */}
                        <li
                        onClick={()=>handleChangeSheet({...currentSheets[0],level:"A1"})}
                        className="bg- text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Nivel <b className=" text-primary">A1</b>
                        </li>

                        {/* A2 */}
                        <li
                        onClick={()=>handleChangeSheet({...currentSheets[0],level:"A2"})}
                        className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Nivel <b className="bg-gradient-to-b from-primary to-success text-transparent bg-clip-text">A2</b>
                        </li>

                        {/* B1 */}
                        <li
                        onClick={()=>handleChangeSheet({...currentSheets[0],level:"B1"})}
                        className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Nivel <b className="text-success">B1</b>
                        </li>

                        {/* B2 */}
                        <li
                        onClick={()=>handleChangeSheet({...currentSheets[0],level:"B2"})}
                        className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Nivel <b className="bg-gradient-to-b from-success to-warning text-transparent bg-clip-text">B2</b>
                        </li>
                        
                        {/* C1 */}
                        <li
                        onClick={()=>handleChangeSheet({...currentSheets[0],level:"C1"})}
                        className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Nivel <b className="text-warning">C1</b>
                        </li>
                        
                        {/* C2 */}
                        <li
                        onClick={()=>handleChangeSheet({...currentSheets[0],level:"C2"})}
                        className=" text-violet_dark text-[18px] px-10 py-3 font-medium cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Nivel <b className="bg-gradient-to-b from-warning to-info text-transparent bg-clip-text">C2</b>
                        </li>
                        
                      </ul>
                    }

                  </div>
            
                  {/* Selecion por Formato */}
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
                          currentSheets[0].formats ?
                          <>Formato: <b>{currentSheets[0].formats}</b></>
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
                        onClick={()=>handleChangeSheet({...currentSheets[0],formats:null})}
                        className="text-violet_dark text-[18px] py-3 font-medium text-center cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Todos
                        </li>

                        {
                          optionsFormats?.map((format, index)=>
                            
                            <li
                            key={index}
                            onClick={()=>handleChangeSheet({...currentSheets[0],formats:[format]})}
                            className="text-violet_dark text-[18px] py-3 font-medium text-center cursor-pointer transition-all
                            hover:bg-primary_flat_hover">
                              {format}
                            </li>

                          )
                        }
                        
                      </ul>
                    }

                  </div>
                  
                  {/* Selecion por Topico */}
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
                          currentSheets[0].topics ?
                          <>Topico: <b>{currentSheets[0].topics}</b></>
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
                        onClick={()=>handleChangeSheet({...currentSheets[0],topics:null})}
                        className="text-violet_dark text-[18px] py-3 font-medium text-center cursor-pointer transition-all
                        hover:bg-primary_flat_hover">
                          Todos
                        </li>

                        {
                          optionsTopics?.map((topics, index)=>
                            
                            <li
                            key={index}
                            onClick={()=>handleChangeSheet({...currentSheets[0],topics:topics})}
                            className="text-violet_dark text-[18px] py-3 font-medium text-center cursor-pointer transition-all
                            hover:bg-primary_flat_hover">
                              {topics}
                            </li>

                          )
                        }
                        
                      </ul>
                    }

                  </div>

                </div>

              </div>
              
              {/* Edicion de Templade */}
              <div
              className="relative">

                {/* Fondo Imagen */}
                <img 
                className="absolute top-0 left-0 w-full h-full object-cover grayscale-[100] opacity-50 z-10 rounded-[15px] blur-md"
                src={currentSheets[0]?.image}/>
                
                {/* Fondo Gradiente */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-success z-0 rounded-[15px]"/>

                {/* Editar Template */}
                <div className="z-50 relative py-2">

                  <ActivityTemplateEdit
                  sheetsOfSection={currentSheets[0]}
                  handleChangeSheet={handleChangeSheet} 
                  />

                </div>

              </div>

              {/* Subir Microlession */}
              <div className="mt-5 flex">

                <button
                onClick={uploadMinilesson}
                className={`btn-primary px-[50px] py-2 font-medium text-[18px] flex justify-center items-center mr-2 ${load && "opacity-1/2 pointer-events-none"}`}>
                  {
                    load ?
                    <>Actualizando. . .</>
                    :
                    <>Actualizar <FontAwesomeIcon className="ml-3" icon={faRotate}/></>
                  }
                </button>

                {/* <button
                onClick={uploadMinilesson}
                className={`btn-success px-[50px] py-2 font-medium text-[18px] flex justify-center items-center ${load && "opacity-1/2 pointer-events-none"}`}>
                  {
                    load ?
                    <>Actualizando. . .</>
                    :
                    <>Actualizar <FontAwesomeIcon className="ml-3" icon={faRotate}/></>
                  }
                </button>
                 */}
              </div>
                
            </AdminPage>

        </BodyGeneric>
    )
}
