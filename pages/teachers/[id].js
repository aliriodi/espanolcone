import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cardDetail } from './../../redux/ECEActions';
import Image from 'next/image';
import blanc_profile from '../../public/imgs/blank-profile-picture.png'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TeacherDetailPage() {


  const cardDetail = useSelector((state) => state.datos.cardDetail);
  const [isCardAvailable, setIsCardAvailable] = useState(false);
  const router = useRouter()


  useEffect(() => {
    if (cardDetail) {
      setIsCardAvailable(true);
    }
  }, [cardDetail]);

  if (!isCardAvailable) {
    return <div>Cargando...</div>;
  }

  const handleButton = () => {
    router.push(`/inicio/schedule`);
  }

  return (
    <>
      <div className="flex bg-slate-200">
        <div className="w-3/4  mx-5 ">
          <div className="flex flex-col">
            <div className='flex flex-row m-5 p-2 border bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
              <div className="w-1/5 flex flex-col items-center ">
                {cardDetail.image ? (
                  <Image
                    alt="photo"
                    width={160}
                    height={160}
                    src={cardDetail.image}
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

                <p className='my-3'>svg&apos;s</p>
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
                  {cardDetail.namePerson ? (
                    <p className='pb-5'>{cardDetail.namePerson}</p>
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
                        {item.nombre ? item.nombre : 'Nombre no especificado'}:
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
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            className=" w-full h-full mt-5"
          ></iframe>
          <p className='my-10'>estrellas</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onAuxClick={handleButton}
          >
            Reservar Cita
          </button>
        </div>
      </div>
    </>
  );
}


