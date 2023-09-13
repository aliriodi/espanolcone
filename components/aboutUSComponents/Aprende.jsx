import Image from 'next/image'
import React from 'react'

export default function Aprende() {
  return (
    <div className='h-[800px] flex items-center justify-center flex-col'>
      <div className="flex items-center justify-center">

        <div className="w-1/2 flex items-center justify-center pl-[200px]">
          <Image
            src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366404/images/banner-3_x1yvhd.png"
            alt="Teléfono"
            width={600}
            height={300}
            className='mr-[200px]'
          />
        </div>
        <div className="w-1/2 flex flex-col" >
          <div className='flex flex-col items-center justify-center mx-[250px]'>
            <h1 className='text-4xl mb-[100px]'>
              Aprende español con
              nosotros
            </h1>
            <p className='mb-[50px]'>
              Español con E es un proyecto diseñado para ayudarte a alcanzar tus objetivos de una manera entretenida y eficaz. Además de aprender el idioma, conocerás la cultura de los países hispanohablantes en persona.
            </p>
            <p>
              Los programas están adaptados y personalizados de acuerdo a tus necesidades y deseos, garantizando que el aprendizaje sea gratificante y atractivo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
