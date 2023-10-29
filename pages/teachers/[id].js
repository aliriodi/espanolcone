import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cardDetail } from './../../redux/ECEActions';
import Image from 'next/image';
import YouTube from 'react-youtube';
import blanc_profile from '../../public/imgs/blank-profile-picture.png'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from "../../components/Menu";

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
    return <div>Cargando...</div>;
  }

  function  handleButton  () {
    router.push('/inicio/schedule');
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
      <div className="pt-24 flex bg-slate-200">
        <div className="w-3/4  mx-5 ">
          <div className="flex flex-col">
            <div className='flex flex-row m-5 p-2 border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
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

                <p className='my-3'></p>
                <div className='flex  flex-col justify-evenly mt-2'>
                  <p>Español:</p>
                  {cardDetail.hablante ? (
                    <strong>{cardDetail.hablante}</strong>
                  ) : (
                    <strong>No hay idioma detectado</strong>
                  )}
                </div>
              </div>
              <div className="w-4/5 flex flex-col">
                <div className='py-5'>
                  {cardDetail.first_name   ? (
                    <p className='pb-5'>{cardDetail.first_name+' '+cardDetail.last_name}</p>
                  ) : (
                    <p className='pb-5'>No hay datos personales</p>
                  )}
                  <p>{cardDetail.intro}</p>
                </div>
              </div>
            </div>




            <div className='m-5 p-2 border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
              <div>Metodología:</div>
              {cardDetail.enfoquePedagogico ? (
                <p className='pb-2'>{cardDetail.enfoquePedagogico}</p>
              ) : (
                <p className='pb-2'>No hay metodología cargada</p>
              )}
              <ul>
                {cardDetail.puntos && cardDetail.puntos.length > 0 ? (
                  cardDetail.puntos.map((punto, index) => (
                    <li key={index}>{punto}</li>
                  ))
                ) : (
                  <li>No hay puntos importantes cargados</li>
                )}
              </ul>
              <p className='py-2'>
                {cardDetail.despedida ? cardDetail.despedida : 'No hay despedida'}
              </p>
            </div>

            <div className='m-2 p-2 border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
              <div>Reseñas:</div>
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
                  <li className='m-5 p-2 border border-black rounded-md'>
                    No hay Reseñas cargadas
                  </li>
                )}
              </ul>
            </div>

          </div>
        </div>
        <div className="w-1/4 h-[600px] bg-white mt-5 mr-5  mb-5 p-2 flex flex-col items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
         
        <YouTube ref={iframeRef} opts={opts} videoId={cardDetail.youtube}  />
        
          {/* <iframe
            src={cardDetail.youtube?"https://www.youtube.com/embed/dQw4w9WgXcQ":"https://www.youtube.com/embed/dQw4w9WgXcQ"}
            className=" w-full h-full mt-5"
          ></iframe> */}
          
          <p className='my-10'>estrellas</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleButton}
          >
            Reservar Cita
          </button>
        </div>
      </div>
    </>
  );
}


