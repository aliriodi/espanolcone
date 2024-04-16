import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { cardDetail } from '../../../redux/ECEActions';
import Image from 'next/image';
import YouTube from 'react-youtube';
import blanc_profile from '../public/imgs/blank-profile-picture.png'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from "./Menu";
import Spinner from './Spinner';
import Head from 'next/head'
import Copyright from './Class/Copyright';

export default function Base({id, child,child2}) {
  
  
  const [isCardAvailable, setIsCardAvailable] = useState(false);
  const [cardDetail, setcardDetail] = useState(null);
  const [calendarEnabled, setCalendarEnabled] = useState(true)
  const router = useRouter();
  // const { id } = router.query;
  // Opciones de Youtube
  const iframeRef = useRef(null);


  
  useEffect(() => {
    
      if(!cardDetail) {
      async function carDet() {
        try {

          const details = await fetch('/api/users/'+id ).then(response => response.json());
          setcardDetail(await details?.userid);

        } catch (error) {

          console.error('Error fetching user details:', error);
          
        }
      }
      carDet()  
    }
  }, [id]);

  if (!cardDetail||cardDetail.length===0 || Object.keys(cardDetail).length===0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  } 
//NAHUEL ACA VA TU RUTA Y DE ALLI CREO 
//Que debes ver como creas y halas de la BD los chats
  function  handleButton  () {
    router.push('/inicio/chat');
  }
  const opts = {
    playerVars: {
      rel: 0, // Evitar videos relacionados al final
      autoplay: 1, // Desactivar la reproducción automática
      modestbranding: 1, // Ocultar el logotipo de YouTube
      fs: 1, // Oculto el boton de maximizar video fs FullScreen
      color: "#000"
    }
  }
  return (
    <>
    <Head>
        <title>{cardDetail?.first_name+' '+cardDetail?.last_name} | Español con E</title>
        <meta name="teachers" content="teachers list" />
    </Head>
    
    <Menu />

    <div
    className="px-[60px] py-[119px] flex bg-slate-200 min-h-[100vh]
    md:px-[25px] md:flex-col">

      {/* Seccion de Datos */}
      <div className="w-3/4 mr-[13px]
      md:w-full md:mr-0">

        <div className="flex flex-col">

          {/* Encabezado */}
          <div className='flex flex-row p-2 border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-[12px] flex-wrap'>

             {/*Imagen de Profesor  */}
            <div className="w-1/5 flex flex-col items-center 
            md:w-2/5">
              {cardDetail?.image ? (
                
                <Image
                alt="photo"
                width={160}
                  height={160}
                  src={cardDetail?.image?.url? cardDetail.image.url:cardDetail.image}
                  className="w-100% p-5 mb-2 rounded-[25px] object-cover drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]
                  md:p-0 md:rounded-[5px]"
                />
              ) : (
              null&&  <Image
                  alt='blanc photo'
                  width={160}
                  height={160}
                  src={blanc_profile}
                  className="w-100% p-5 mb-2 rounded-[25px] object-cover drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]
                  md:p-0 md:rounded-[5px]"
                />
              )}

            </div>
            
            {/* Descripcion de Profesor */}
            <div className="w-4/5 flex flex-col relative
            md:w-3/5 md:px-2">

              <div className='py-5
              md:py-1'>
                {/* Nombre */}
                {cardDetail?.first_name   ? (
                  <p className='pb-5 text-title_color font-semibold text-[28px]
                  md:text-[21px] md:pb-0'>{cardDetail.first_name+' '+cardDetail.last_name}</p>
                ) : (
                  <p className='pb-5 text-title_color font-semibold text-[28px]
                  md:text-[21px] md:pb-0'>No hay datos personales</p>
                )}

                
              </div>
            </div>

            
          </div>
          
          {/* Habilidades */}
          <div className='px-[22px] py-[26px] border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-[12px] text-[14px]
          md:px-2'>

          {/* child = Presupuesto */}
            {child}

            
          </div>

        </div>

      </div>

      {/* Seccion de Video */}
      <div className="w-1/4 ml-[13px]
      md:w-full md:ml-0">
        
        <div className='bg-white  px-[8px] py-[14px] flex flex-col items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md'>
          {/* CHAT*/}
          {child2}
          {
            <button
              id='reservar'
              className="btn-primary py-2 px-[26px] rounded"
              onClick={handleButton}
            >
              CHAT
            </button>
          }
        </div>


      </div>
      
    </div>
    
    <div className='bg-slate-200'>
      <Copyright/>
    </div>

    </>
  );
}

