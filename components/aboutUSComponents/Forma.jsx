import Image from 'next/image'
import React from 'react'

export default function Forma() {
  return (
    <>
      <div className=' flex items-center justify-center flex-col'>
        <div className="flex items-center justify-center">

          <div className="w-1/2 flex flex-col" >
            <div className='flex flex-col items-center justify-center mx-[250px]'>
              <h2 className='text-4xl mb-[100px]'>
                Forma parte de la comunidad
              </h2>
              <p className='mb-[50px]'>
                Forma parte de nuestra comunidad de &apos;viajeros&apos; en nuestro servidor Discord y aprende español en compañía
              </p>
              <p className='mb-[50px]'>
                Nunca estarás solo en este emocionante viaje de aprender un nuevo idioma y explorar culturas lejanas. Tendrás apoyo, ya sea en forma de guía, compañero o mapa.
              </p>

              <h3 className='text-xl mb-[20px]'>
                ¿Qué encontrarás allí?
              </h3>
              <ul className="list-disc pl-4 mb-5">
                <li>Expresiones idiomáticas</li>
                <li>Frases y refranes</li>
                <li>Citas en español</li>
                <li>Actividades para cada nivel</li>
                <li>Clases mensuales de conversación en grupo</li>
              </ul>
              <button
                type="button"
                className="w-full text-white bg-[#A97EEE] font-bold rounded-md text-sm px-10 py-2.5 mr-2 mb-2 focus:outline-none active:bg-white active:text-[#A97EEE] "
              >
                Descubre más
              </button>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366389/images/banner-discord_gx3eqy.png"
              alt="discord"
              width={800}
              height={400}
              className='mr-[200px]'
            />
          </div>
        </div>
      </div>
    </>
  )
}
