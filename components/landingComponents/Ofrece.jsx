import Image from 'next/image'
import React from 'react'

export default function Ofrece() {
  return (
    <>
      <div className='h-auto bg-[#F6F7FF] mb-[100px]'>

        {/* Titulo */}
        <div className=' mt-[150px] mb-[50px] flex flex-col justify-center items-center'>

          {/* Titulo */}
          <div className='flex justify-center items-center flex-col'>
            <h2 className='flex justify-center items-center my-5' style={{fontSize:'30px', color: '#323030'}}>
              Lo que ofrecemos
            </h2>

            <span className='bg-secondary flex' style={{height:'2px', width:'80.8px'}}></span>
          </div>

          {/* Subtitulo */}
          <p className='flex justify-center items-center my-5 text-center font-medium' style={{fontSize:'18px', color:'#5E6063', maxWidth:'535px'}}>
            Descubre los servicios que diseñamos especialmente para tu aprendizaje
          </p>
        </div>


        <div className="flex justify-center">

          {/* Nuestros Programas */}
          <div
          className="bg-white shadow-lg rounded-lg "
          style={{width:"500px", minHeight:'646px', marginRight:'19px', padding: '66px 33px', boxShadow:'0px 4px 26px #00000040'}}>

            {/* Encabezado */}
            <div className="flex items-center" style={{borderBottom: '1px #DEDEDE solid', paddingBottom:'1.2em'}}>

              {/* Imagen */}
              <div className=" flex justify-center items-center p-1">
                <Image
                  src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437860/images/icons-05_xkbram.png"
                  alt="Personas"
                  width={400}
                  height={200}
                />
              </div>
              
              {/* Titulo */}
              <div style={{minWidth:'260px', marginLeft:'10px'}}>

                <h2
                className="font-semibold"
                style={{fontSize:'20px'}}
                >
                  NUESTROS PROGRAMAS
                </h2>

                <p 
                className='font-medium' 
                style={{color:'#6E6B7B', marginTop:'10px', fontSize:'16px'}}>
                  Explora nuestros programas y amplía tu perspectiva
                </p>

              </div>

            </div>

            {/* Contenido */}
            <div className='flex justify-center flex-col pb-3 mt-8 text-violet_dark items-start px-6'>

              <p className='flex justify-center items-start text-left' >
                Alcanza la fluidez en español con cursos adaptados a tu nivel y metas. Disfruta lecciones interactivas con profesores apasionados por la cultura y el idioma.
              </p>

              <p className='flex justify-center items-start text-left my-6'>
                Nuestros programas te ofrecen:
              </p>

              
              {/* Lista */}
              <p className='flex justify-center items-center text-left mb-5'>
                <span className='bg-primary rounded-full mr-2'style={{width:'18px', height:'18px'}}></span>

                Cursos personalizados según tu nivel de español.
              </p>

              <p className='flex justify-center items-center text-left mb-5'>
                <span className='bg-primary rounded-full mr-2'style={{width:'18px', height:'18px'}}></span>

                Lecciones comunicativas y prácticas.
              </p>

              <p className='flex justify-center items-center text-left mb-5'>
                <span className='bg-primary rounded-full mr-2'style={{width:'18px', height:'18px'}}></span>

                Profesores certificados y nativos.
              </p>

              <p className='flex justify-center items-center text-left'>
                <span className='bg-primary rounded-full mr-2'style={{width:'18px', height:'18px'}}></span>

                Inmersión cultural en países hispanohablantes.

              </p>

            </div>

          </div>

          {/* Conoce Cordoba */}
          <div
          className="bg-white rounded-lg"
          style={{width:"500px", minHeight:'646px', marginLeft:'19px', padding: '66px 33px', boxShadow:'0px 4px 26px #00000040'}}>

            {/* Encabezado */}
            <div className="flex items-center" style={{borderBottom: '1px #DEDEDE solid', paddingBottom:'1.7em'}}>

              {/* Imagen */}
              <div className="flex justify-center items-center p-1" style={{height:'101px'}}>
                <Image
                  src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437864/images/icons-06_ihevx7.png"
                  alt="montaña"
                  width={300}
                  height={100}
                />
              </div>
              
              {/* Titulo */}
              <div style={{minWidth:'260px', marginLeft:'10px'}}>
                <h2
                className="font-semibold"
                style={{fontSize:'20px'}}
                >
                  CONOCE CÓRDOBA
                </h2>
                <p
                className='font-medium' 
                style={{color:'#6E6B7B', marginTop:'10px', fontSize:'16px'}}>
                  Descubre la belleza de Córdoba  con nuestros paquetes de viajes
                </p>
              </div>
            </div>

            {/* Contenido */}
            <div className='flex justify-center flex-col pb-3 mt-8 text-violet_dark items-start px-6'>

              <p className='flex justify-center items-start text-left'>
                Descubre la cultura cordobesa mientras perfeccionas tu español. Experimenta una fusión de aprendizaje y turismo en esta hermosa provincia de Argentina.
              </p>

              <p className='flex justify-center items-start text-left my-6'>
                Tendrás la oportunidad de:
              </p>
              
              {/* Lista */}
              <div className='flex justify-center items-center text-left mb-5'>
                <span className='bg-primary rounded-full mr-2'style={{width:'18px', height:'18px'}}></span>
                <p style={{maxWidth: '353px'}}>
                  Descubrir lugares emblemáticos a través de la Inmersión en la cultura local.
                </p>
              </div>

              <div className='flex justify-center items-center text-left mb-5'>
                <span className='bg-primary rounded-full mr-2'style={{width:'18px', height:'18px'}}></span>
                <p style={{maxWidth: '353px'}}>
                  Contratar guías turísticos certificados.
                </p>
              </div>

              <div className='flex justify-center items-center text-left mb-5'>
                <span className='bg-primary rounded-full mr-2'style={{width:'18px', height:'18px'}}></span>
                <p style={{maxWidth: '353px'}}>
                  Disfrutar de eventos y actividades exclusivas propias de Español con E.
                </p>
              </div>

              <div className='flex justify-center items-center text-left mb-5'>
                <span className='bg-primary rounded-full mr-2'style={{width:'18px', height:'18px'}}></span>
                <p className='break-normal' style={{maxWidth:'353px'}}>
                  Practicar el español con hablantes nativos y conocer nuevas personas.
                </p>
              </div>


            </div>

          </div>

        </div>
      </div>
    </>
  )
}

// "mountain2": "",
//   "peopleTalking": "",
