import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next';
import ellipse from '../../public/imgs/ellipse-2.png'
export default function Aprende() {
  const { t } = useTranslation('aboutus')
  return (
    <>
    {/* <div className='h-[800px] flex items-center justify-center flex-col'>
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
            {t("card2.title1")}
            </h1>
            <p className='mb-[50px]'>
            {t("card2.paragraph1")}
            </p>
            <p>
            {t("card2.paragraph2")}
            </p>
          </div>
        </div>
      </div>
    </div> */}
    
    <section className='flex items-center justify-center flex-col bg-white px-[170px] min-h-screen  relative
    md:p-[20px]'>
      
          <div className="flex items-center justify-center z-10
          md:flex-col-reverse">

            {/* Imagen */}
            <div className="w-1/2 flex items-center justify-center mr-[25px] relative
            md:w-full md:mr-0">
              
              {/* Ellipse 1 */}
              <span className='rounded-full h-[30px] w-[30px] bg-success z-20 absolute top-[50px] left-[50px]
              md:w-[17.31px] md:h-[17.31px] md:top-[25px] md:left-[25px]'></span>

              {/* Ellipse 2 */}
              <span className='rounded-full h-[41px] w-[41px] bg-secondary z-20 absolute top-[50%] right-0
              md:w-[24.47px] md:h-[24.47px]'></span>

              {/* Ellipse 3 */}
              <span className='rounded-full h-[17px] w-[17px] bg-warning z-20 absolute bottom-[50px]
              md:w-[10.15px] md:h-[10.15px] md:bottom-0'></span>

              {/* Imagen */}
              <Image
                src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366404/images/banner-3_x1yvhd.png"
                alt="Teléfono"
                width={600}
                height={300}
                style={{filter:'drop-shadow( 0px 4px 43px #00000026)'}}
                className=''
                
              />
            </div>

            {/* Contenido */}
            <div className="w-[532px] flex flex-col ml-[25px]
            md:w-full" >

              {/* Subtitulo */}
              <h2 className='subtitle'>{t("card2.title1")}</h2>

              {/* Texto */}
              <div className='mt-10'>

                <p className='text-header mb-[50px]'>{t("card2.paragraph1")}</p>
                <p className='text-header '>{t("card2.paragraph2")}</p>

              </div>
              
            </div>
          </div>

          {/* Ellipse */}
          <Image
          className='absolute left-0 bottom-0 z-0'
          src={ellipse}
          width={600}
          height={600}
          alt='ellipse'
          />
          
          {/* Ellipse Con Borde */}
          <span
          className='rounded-full h-[149px] w-[149px] z-20 absolute left-[-75px] bottom-[50%] border-warning
          md:hidden'
          style={{border: '27px solid #ff7438'}}></span>

          
          {/* Ellipse Responsive */}
          <span
          className='hidden rounded-full z-20 absolute w-[26px] h-[26px] left-[-13px] bottom-[27%] border-none bg-warning
          md:block'
          ></span>

        </section>
    </>
  )
}
