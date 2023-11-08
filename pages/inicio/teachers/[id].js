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

export default function TeacherDetailPage() {


  const cardDetail = useSelector((state) => state.datos.cardDetail);
  const [isCardAvailable, setIsCardAvailable] = useState(false);
  const router = useRouter();
  // Opciones de Youtube
  const iframeRef = useRef(null);

  useEffect(() => {
    if (cardDetail) {
      setIsCardAvailable(true);
    }
  }, [cardDetail]);

  if (!isCardAvailable) {
    return (
      <div class="flex justify-center items-center min-h-screen">
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
    <Menu />

    <div className="px-[60px] py-[119px] flex bg-slate-200">

      {/* Seccion de Datos */}
      <div className="w-3/4 mr-[13px]">

        <div className="flex flex-col">

          {/* Encabezado */}
          <div className='flex flex-row p-2 border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-[12px]'>

             {/*Imagen de Profesor  */}
            <div className="w-1/5 flex flex-col items-center ">
              {cardDetail.image ? (
                <Image
                alt="photo"
                width={160}
                  height={160}
                  src={cardDetail?.image?.url? cardDetail.image.url:cardDetail.image}
                  className="w-100% p-5 mb-2 rounded-full object-cover drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]"
                />
              ) : (
                <Image
                  alt='blanc photo'
                  width={160}
                  height={160}
                  src={blanc_profile}
                  className="w-100% p-5 mb-2 rounded-full object-cover drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]"
                />
              )}

              {/* Nivel de Español */}
              <div className='flex justify-evenly mt-2 text-violet_dark'>
                <p className='mr-[5px]'>Español:</p>
                {cardDetail.hablante ? (
                  <strong>{cardDetail.hablante}</strong>
                ) : (
                  <strong>No hay idioma detectado</strong>
                )}
              </div>
            </div>
            
            {/* Descripcion de Profesor */}
            <div className="w-4/5 flex flex-col">

              <div className='py-5'>
                {/* Nombre */}
                {cardDetail.first_name   ? (
                  <p className='pb-5 text-title_color font-semibold text-[28px]'>{cardDetail.first_name+' '+cardDetail.last_name}</p>
                ) : (
                  <p className='pb-5 text-title_color font-semibold text-[28px]'>No hay datos personales</p>
                )}

                {/* Descripcion */}
                <p className=' text-violet_dark'>{cardDetail.intro}</p>
              </div>
            </div>
          </div>
          
          {/* Habilidades */}
          <div className='px-[22px] py-[26px] border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-[12px]'>

            {/* Titulo */}
            <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Metodología:</p>

            {/* Metodologias */}
            {cardDetail.enfoquePedagogico ? (
              <p className='text-violet_dark py-2'>{cardDetail.enfoquePedagogico}</p>
            ) : (
              <p className='text-violet_dark py-2'>No hay metodología cargada</p>
            )}

            {/* Puntos */}
            <ul>
              {cardDetail.puntos && cardDetail.puntos.length > 0 ? (
                cardDetail.puntos.map((punto, index) => (
                  <li
                  className='text-violet_dark ml-2 mb-1'
                  key={index}>
                    <FontAwesomeIcon icon={faStar} className='mr-1'/>
                    {punto}
                  </li>
                ))
              ) : (
                <li className='text-violet_dark py-2'>No hay puntos importantes cargados</li>
              )}
            </ul>
            <p className='text-violet_dark py-2'>
              {cardDetail.despedida ? cardDetail.despedida : 'No hay despedida'}
            </p>
          </div>

          {/* Reseñas */}
          <div className='px-[22px] py-[26px] border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mb-[12px]'>
            {/* Titulo */}
            <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Reseñas:</p>
            
            <ul>
              {cardDetail.reseña && cardDetail.reseña.length > 0 ? (
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
                <li className='m-5 p-2 w-full flex justify-center text-light'>
                  No hay Reseñas
                </li>
              )}
            </ul>
          </div>

        </div>

      </div>

      {/* Seccion de Video */}
      <div className="w-1/4 ml-[13px]">
        
        <div className='bg-white  px-[8px] py-[14px] flex flex-col items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md'>
          <YouTube 
          ref={iframeRef}
          opts={opts}
          videoId={cardDetail.youtube}
          className='w-full flex justify-center youtube h-[175px] relative rounded-[5px] overflow-hidden'/>
          
          {/* Estrellas */}
          <p className='my-10'>estrellas</p>

          {/* Reservar Cita */}
          <button
            className="btn-primary py-2 px-[26px] rounded"
            onClick={handleButton}
          >
            Reservar Cita
          </button>
        </div>

      </div>
    </div>
    </>
  );
}


