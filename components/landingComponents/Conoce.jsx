import Image from 'next/image'
import React from 'react'

export default function Conoce() {
  return (
    <>
      <div className='grid grid-cols-10 gap-4 h-[600px] bg-primary '>
        <div className='col-span-7 mx-[100px] mt-[100px] text-white'>
          <p className='flex justify-start text-4xl font-extrabold text-white '>
            Conoce Español con E

          </p>
          <p className='mt-10 mb-[100px] flex justify-start text-xl font-extrabold mr-[200px]'>
            Aprender español no se trata solo de lecciones y gramática. Sumérgete en la cultura de los países hispanohablantes. Así, lograrás hablar con fluidez mientras disfrutas de experiencias únicas.
          </p>
          <button
            type="button"
            className="text-primary bg-white font-bold rounded-md text-sm px-5 py-2.5 mr-2 mb-2 active:bg-primary active:text-white focus:outline-none"
          >
            Descubre más
          </button>
        </div>
        <div className='col-span-3 flex justify-start items-end'>
          <Image
            src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437853/images/Group_14.4_nzv8eu.png"
            alt="Teléfono"
            width={400}
            height={200}
            className='mt-[-350px]'
          />
        </div>


      </div>
    </>
  )
}
