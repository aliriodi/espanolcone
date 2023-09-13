import Image from 'next/image'
import React from 'react'

export default function Ofrece() {
  return (
    <>
      <div className='h-auto bg-[#F6F7FF] mb-[100px]'>
        <div className='mx-[700px]'>
          <h2 className='flex justify-center items-center my-5 mt-[150px]'>
            Lo que ofrecemos
          </h2>
          <p className='flex justify-center items-center my-5'>
            Descubre los servicios que diseñamos especialmente para tu aprendizaje
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 ">

          <div className="bg-white shadow-lg rounded-lg p-4 mx-[200px] h-[800px]  ">

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 p-4 flex justify-center items-center">
                <Image
                  src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437860/images/icons-05_xkbram.png"
                  alt="Personas"
                  width={400}
                  height={200}
                />
              </div>
              <div className="bg-gray-200 p-4">
                <h2 className="text-lg font-semibold my-4">
                  NUESTROS PROGRAMAS
                </h2>
                <p>
                  Explora nuestros programas y amplía tu perspectiva
                </p>
              </div>
            </div>
            <div className='flex justify-center items-center flex-col'>
              <p className='flex justify-center items-center'>
                Alcanza la fluidez en español con cursos adaptados a tu nivel y metas. Disfruta lecciones interactivas con profesores apasionados por la cultura y el idioma.
              </p>
              <p className='flex justify-center items-center'>
                Nuestros programas te ofrecen:
              </p>
              <p className='flex justify-center items-center'>
                Cursos personalizados según tu nivel de español.
              </p>
              <p className='flex justify-center items-center'>
                Lecciones comunicativas y prácticas.
              </p>
              <p className='flex justify-center items-center'>
                Profesores certificados y nativos.
              </p>
              <p className='flex justify-center items-center'>
                Inmersión cultural en países hispanohablantes.

              </p>

            </div>

          </div>

          <div className="bg-white shadow-lg rounded-lg p-4 mx-[150px]">

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 p-4 flex justify-center items-center">
                <Image
                  src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437864/images/icons-06_ihevx7.png"
                  alt="montaña"
                  width={400}
                  height={200}
                />
              </div>
              <div className="bg-gray-200 p-4">
                <h2 className="text-xl font-semibold my-4">
                  CONOCE CÓRDOBA
                </h2>
                <p>
                  Descubre la belleza de Córdoba  con nuestros paquetes de viajes
                </p>
              </div>
            </div>
            <div className='flex justify-center items-center flex-col'>
              <p className='flex justify-center items-center'>
                Descubre la cultura cordobesa mientras perfeccionas tu español. Experimenta una fusión de aprendizaje y turismo en esta hermosa provincia de Argentina.
              </p>
              <p className='flex justify-center items-center'>
                Tendrás la oportunidad de:

              </p>
              <p className='flex justify-center items-center'>
                Descubrir lugares emblemáticos a través de la Inmersión en la cultura local.
              </p>
              <p className='flex justify-center items-center'>
                Contratar guías turísticos certificados.
              </p>
              <p className='flex justify-center items-center'>
                Disfrutar de eventos y actividades exclusivas propias de Español con E.

              </p>
              <p className='flex justify-center items-center'>
                Practicar el español con hablantes nativos y conocer nuevas personas.
              </p>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

// "mountain2": "",
//   "peopleTalking": "",
