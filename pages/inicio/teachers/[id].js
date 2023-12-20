import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cardDetail } from '../../../redux/ECEActions';
import Image from 'next/image';
import YouTube from 'react-youtube';
import blanc_profile from '../../../public/imgs/blank-profile-picture.png'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from "../../../components/Menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../components/Spinner';
import { parseISO, isAfter, isEqual ,addDays, startOfDay} from 'date-fns';
import Head from 'next/head'

export default function TeacherDetailPage() {
  // const cardDetail2 = useSelector((state) => state.datos.cardDetail);
  const [isCardAvailable, setIsCardAvailable] = useState(false);
  const [cardDetail, setcardDetail] = useState(null);
  const [calendarEnabled, setCalendarEnabled] = useState(true)
  const router = useRouter();
  const { id } = router.query;
  // Opciones de Youtube
  const iframeRef = useRef(null);

  useEffect(()=>{
    const tomorrow = startOfDay(addDays(new Date(), 1));
    setCalendarEnabled(cardDetail?.calendar?.some(calendar1 => (
      (isAfter(parseISO(calendar1?.startDatetime), tomorrow) || isEqual(parseISO(calendar1?.startDatetime), tomorrow)) && !calendar1.assigned
    )))
  },[cardDetail])
  
  useEffect(() => {
    
    // if (cardDetail2?.length!==0) {
    //   setIsCardAvailable(true);
    //   setcardDetail(cardDetail2)
    // }

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

  function  handleButton  () {
    router.push('/inicio/schedule/'+cardDetail._id);
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
    className="px-[60px] py-[119px] flex bg-slate-200
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
                <Image
                  alt='blanc photo'
                  width={160}
                  height={160}
                  src={blanc_profile}
                  className="w-100% p-5 mb-2 rounded-[25px] object-cover drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]
                  md:p-0 md:rounded-[5px]"
                />
              )}

              {/* Nivel de Español */}
              <div className='flex justify-evenly mt-2 text-violet_dark flex-wrap 
              md:hidden'>
                <p className='mr-[5px]'>Español: </p>
                {cardDetail?.hablante ? (
                  <strong>{cardDetail.hablante}</strong>
                ) : (
                  <strong>Ninguno</strong>
                )}
              </div>
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

                {/* Descripcion */}
                <p className=' text-violet_dark
                md:hidden'>
                  {cardDetail?.content}
                </p>
                
                {/* Nivel de Español Responsive */}
                <div className='text-violet_dark flex-wrap hidden
                md:flex'>
                  <p className='text-[14px] mr-1'>Español: </p>
                  {cardDetail?.hablante ? (
                    <strong>{cardDetail.hablante}</strong>
                  ) : (
                    <strong className='text-[14px]'>Ninguno</strong>
                  )}
                </div>
                
                {/* Reservar Responsive */}
                {
                  calendarEnabled &&
                  <div className='hidden
                  md:flex'>
                    <Link
                      className="py-2 px-[26px] rounded absolute bottom-2 left-2 w-[90%] btn-primary"
                      href={"#reservar"}
                    >
                      Reservar
                    </Link>
                  </div>
                }
              </div>
            </div>

            
            {/* Descripcion Responsive */}
            <p className=' hidden text-violet_dark text-[14px] py-4 mt-4 border-t-2
            md:flex'>
              {cardDetail?.content}
            </p>
          </div>
          
          {/* Habilidades */}
          <div className='px-[22px] py-[26px] border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-[12px] text-[14px]
          md:px-2'>

            {/* Titulo */}
            <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Enfoque de Español con E</p>

            {/* Metodologias */}
            {cardDetail?.enfoquePedagogico ? (
              <p className='text-violet_dark py-2'>{cardDetail.enfoquePedagogico}</p>
            ) : (
              <p className='text-violet_dark py-2'>No hay metodología cargada</p>
            )}

            {/* Puntos */}
            <ul>
              {cardDetail?.puntos && cardDetail?.puntos.length > 0 && (
                cardDetail?.puntos.map((punto, index) => (
                  <li
                  className='text-violet_dark ml-2 mb-1'
                  key={index}>
                    <FontAwesomeIcon icon={faStar} className='mr-1'/>
                    {punto}
                  </li>
                ))
              ) 
            }
            </ul>
            {cardDetail?.despedida &&
              <p className='text-violet_dark py-2'>
                {cardDetail.despedida}
              </p>
            }
          </div>

          {/* Reseñas */}
          <div className='px-[22px] py-[26px] border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-[12px] text-[14px]
          md:px-2'>
            {/* Titulo */}
            <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Reseñas:</p>
            
            <ul>
              {cardDetail?.reseña && cardDetail.reseña.length > 0 ? (
                cardDetail.reseña.map((item, index) => (
                  <li className='m-2 p-2 border border-black rounded-md flex flex-row' key={index}>
                    <Image
                      alt='blanc photo'
                      width={40}
                      height={40}
                      src={item.img ? item.img : blanc_profile}
                      className=" m-3 rounded-full object-cover drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]"
                    />
                    {/* <strong>{item.nombre}:</strong> {item.reseña} */}
                    <strong>
                      {item.first_name&&item.last_name ? item.first_name+' '+item.last_name : 'Nombre no especificado'}:
                    </strong>
                    {item.reseña ? item.reseña : 'Reseña no disponible'}
                  </li>
                ))
              ) : (
                <li className='m-5 p-2 w-full flex justify-center text-light
                md:m-0'>
                  No hay Reseñas
                </li>
              )}
            </ul>
          </div>

        </div>

      </div>

      {/* Seccion de Video */}
      <div className="w-1/4 ml-[13px]
      md:w-full md:ml-0">
        
        <div className='bg-white  px-[8px] py-[14px] flex flex-col items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md'>
          <YouTube 
          ref={iframeRef}
          opts={opts}
          videoId={cardDetail?.youtube}
          className='w-full flex justify-center youtube h-[175px] relative rounded-[5px] overflow-hidden'/>
          
          {/* Estrellas */}
          <p className='my-10'>estrellas</p>

          {/* Reservar Cita */}
          {
            calendarEnabled &&
            <button
              id='reservar'
              className="btn-primary py-2 px-[26px] rounded"
              onClick={handleButton}
            >
              Reservar Cita
            </button>
          }
        </div>

      </div>
    </div>
    </>
  );
}


