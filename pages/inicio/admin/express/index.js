import React from 'react'
import BodyGeneric from '../../../../components/GenericsElements/BodyGeneric'
import AdminPage from '../../../../components/GenericsElements/Admin/AdminPage'
import NavBarAdmin from '../../../../components/admin/NavBarAdmin'
import Link from 'next/link';
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import Spinner from '../../../../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons';

export default function Express() {
  const [miniLessons, setMiniLessons] = useState(null)
  const [loadMiniLessons, setLoadMiniLessons] = useState(false)
  
  const [postLessons, setPostLessons] = useState(null)
  const [loadPostLessons, setLoadPostLessons] = useState(false)
  
  useEffect(()=>{
    // Obtiene las mini lecciones 
    getMiniLesson()

  },[])

  useEffect(()=> console.log(miniLessons),[miniLessons])

  async function getMiniLesson(){
    setLoadMiniLessons(true)
    setLoadPostLessons(true)

    let lessons;
    let newPostLessons;
    
    try{
      
      lessons = await axios.get(`/api/ulessons/get?inReview=${1}`)
      setLoadMiniLessons(false)

      newPostLessons = await axios.get(`/api/ulessons/get?inReview=${0}`)
      setLoadPostLessons(false)
    }
    catch(e){
      console.log(e)
      setLoadMiniLessons(false)
    }

    setMiniLessons(lessons?.data?.ulessons)
    setPostLessons(newPostLessons?.data?.ulessons)
  }

  async function handlechangeInReview(lesson){
    setLoadMiniLessons(true)
    setLoadPostLessons(true)
    
    let finalLesson = {
      ...lesson,
      inReview: !lesson?.inReview 
    }

    console.log(finalLesson)
    await axios.post('/api/ulessons/update',finalLesson)

    getMiniLesson()
  }

  return (
    <BodyGeneric>
        <AdminPage>

            <NavBarAdmin/>
            <div>
                <Link
                className=' text-success font-medium'
                href={"/inicio/admin/express/create"}>
                    <u>Crear un nuevo Express</u>
                </Link>    
            </div>

            {/*////////////////// En Revision //////////////////*/}
            <div className='mt-10'>

              <h3 className='mb-6 font-semibold text-[31px]'>En revision <FontAwesomeIcon icon={faEye}/></h3>

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
                        <div
                        key={index}
                        className="min-w-[300px] h-[270px] bg-dark rounded-[14px] relative overflow-hidden shadow-[0px_4px_24px_#18292F1A] flex items-end
                        md:w-full">
                          
                          {/* Publicar */}
                          <button
                          onClick={(e)=>{
                            e.stopPropagation()
                            handlechangeInReview(lesson)
                          }}
                          className='absolute bg-white border-2 border-violet_dark top-2 right-2 z-50 rounded-full h-8 w-8 shadow-[0px_4px_24px_#18292F6A] flex items-center overflow-hidden transition-all
                          hover:w-[100px]'>

                            {/* Icono */}
                            <div className='h-7 w-7 absolute top-0 left-0 flex justify-center items-center'>
                              <FontAwesomeIcon className='text-violet_dark' icon={faCheck}/>
                            </div>

                            {/* Texto */}
                            <p className='ml-7 text-violet_dark font-medium'>Publicar</p>

                          </button>
                          

                          <Link
                          href={`/inicio/admin/express/edit/${lesson?._id}`}>

                            {/* Nivel */}
                            <p
                            className={`text-[21px] font-semibold w-14 h-14 text-white flex justify-center items-center bg-${ lesson?.level } absolute top-0 left-0 z-20 rounded-[0_0_100%_0]`}>
                              {lesson?.level}
                            </p>


                            {/* Descripcion */}
                            <div
                            className="w-full bg-gradient-to-t from-[#000] to-transparent z-20 text-white p-4 relative">

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
                        </div>            
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
            
            {/*////////////////// Publicados //////////////////*/}
            <div className='mt-[140px]'>
              <h3 className='mb-6 font-semibold text-[31px]'>Publicados <FontAwesomeIcon icon={faCheck}/></h3>

              <div
              className="grid grid-cols-3 gap-7 relative
              lg:grid-cols-2
              md:grid-cols-1">

                
                {
                  postLessons ?
                  <>

                    {
                      postLessons?.length > 0 ?

                      // Encontro las Mini leciones
                      postLessons?.map((lesson, index)=>
                        <div
                        key={index}
                        href={`/inicio/admin/express/edit/${lesson?._id}`}
                        className="min-w-[300px] h-[270px] bg-dark rounded-[14px] relative overflow-hidden shadow-[0px_4px_24px_#18292F1A] flex items-end
                        md:w-full">

                          
                          {/* Publicar */}
                          <button
                          onClick={(e)=>{
                            e.stopPropagation()
                            handlechangeInReview(lesson)
                          }}
                          className='absolute bg-white border-2 border-secondary top-2 right-2 z-50 rounded-full h-8 w-8 shadow-[0px_4px_24px_#18292F6A] flex items-center overflow-hidden transition-all
                          hover:w-[190px]'>

                            {/* Icono */}
                            <div className='h-7 w-7 absolute top-0 left-0 flex justify-center items-center '>
                              <FontAwesomeIcon className='text-secondary' icon={faCheck}/>
                            </div>

                            {/* Texto */}
                            <p className='ml-7 text-secondary font-medium '>Poner en revision</p>

                          </button>
                          
                          <Link
                          href={`/inicio/admin/express/edit/${lesson?._id}`}>
                            {/* Nivel */}
                            <p
                            className={`text-[21px] font-semibold w-14 h-14 text-white flex justify-center items-center bg-${ lesson?.level } absolute top-0 left-0 z-20 rounded-[0_0_100%_0]`}>
                              {lesson?.level}
                            </p>

                            <div
                            className="w-full bg-gradient-to-t from-[#000] to-transparent z-20 text-white p-4 relative">

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

                        </div>            
                      )

                      :
                      // No encontro las Mini leciones
                      <div className=" absolute top-0 left-0 w-full my-[100px] font-semibold text-[18px] text-light flex justify-center items-center z-50">
                        No se encontraron Minilesiones
                      </div>
                    }

                    {/* Cargador en caso de estar buscando leciones */}
                    {
                      loadPostLessons &&
                      <div className={`w-full h-full bg-[#fff8] top-0 left-0 absolute flex justify-center items-center ${ postLessons?.length <= 0  && "my-[100px]"} z-50`}>
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

        </AdminPage>
    </BodyGeneric>
  )
}
