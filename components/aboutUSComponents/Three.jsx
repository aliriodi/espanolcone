import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next';


 export default function Three() {
  
  const { t } = useTranslation('aboutus')
  return (
    <>
      <section className='bg-white relative pb-[203px] overflow-hidden
      md:hidden'>

        {/* Titulos */}
        <div className="flex justify-evenly  bg-primary_light py-[29px]">

          {/* Objetivo */}
          <div className="w-[240px] text-center relative flex flex-col items-start">
            
            {/* Icono */}
            <div className='w-[32px] h-[32px] inline-block rounded-full relative' style={{border: '1px #fff solid'}}>
              <Image
              src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694715401/images/imagen_2023-09-14_151642568_btjevx.png'
              width={15}
              height={15}
              // layout="fill"
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              alt='estrella'
              />
            </div>

            {/* Titulo */}
            <h2 className="mt-[6px] font-medium text-white text-left" style={{fontSize:'36px'}}>{t("card3.0.title.0")}</h2>

          </div>

          {/* Mision */}
          <div className="w-[240px] text-center relative flex flex-col items-start">
            
            {/* Icono */}
            <div className='w-[32px] h-[32px] inline-block rounded-full relative' style={{border: '1px #fff solid'}}>
              <Image
              src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694717223/images/imagen_2023-09-14_154704800_velmqf.png'
              width={15}
              height={15}
              alt='cohete'
              // layout="fill"
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              />
            </div>

            {/* Titulo */}
            <h2 className="mt-[6px] font-medium text-white text-left" style={{fontSize:'36px'}}>{t("card3.0.title.1")}</h2>
          </div>

          {/* Compromiso */}
          <div className="w-[240px] text-center relative flex flex-col items-start">
            
            {/* Icono */}
            <div className='w-[32px] h-[32px] inline-block rounded-full relative' style={{border: '1px #fff solid'}}>
              <Image
              src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694717360/images/imagen_2023-09-14_154921728_yvkn6e.png'
              width={15}
              height={15}
              alt='manitas'
              // layout="fill"
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              />
            </div>

            {/* Titulo */}
            <h2 className="mt-[6px] font-medium text-white text-left" style={{fontSize:'36px'}}>{t("card3.0.title.2")}</h2>
          </div>

        </div>

        {/* Texto */}
        <div className="flex justify-evenly bg-[#F6F7FF] py-[62px] relative">

          {/* Objetivo Texto */}
            <p className='w-[240px] text-left font-medium text-[#5F5A5A]' style={{fontSize: '20px'}}>{t("card3.0.paragraph.0")}</p>

          {/* Mision Texto */}
            <p className='w-[240px] text-left font-medium text-[#5F5A5A]' style={{fontSize: '20px'}}>{t("card3.0.paragraph.1")}</p>

          {/* Compromis Texto */}
            <p className='w-[240px] text-left font-medium text-[#5F5A5A]' style={{fontSize: '20px'}}>{t("card3.0.paragraph.2")}</p>

          {/* Imagen */}
          <div className='inline-block absolute right-[15%] top-[200px]'>
            <Image
              src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366429/images/icon_desc_about_wxyaz9.png"
              alt="Teléfono"
              width={161}
              height={271}
              className=' w-[161px] h-[271px]'
            />
          </div>

          {/* Ellipse */}
          <span className='absolute w-[50px] h-[50px] bg-warning rounded-full bottom-[50%] right-[-25px]'></span>
        </div>
      </section>

      {/* Responsive */}
      <section className='bg-white relative pb-[203px] overflow-hidden mt-[43px] hidden
      md:block md:pb-[58px] md:pt-[29px]'>
         
        <div className="flex justify-evenly flex-col">

          {/* Objetivo */}
          <div>

            {/* Titulo */}
            <div className="w-full text-center relative flex flex-col items-center  bg-primary pt-[13px] pb-[19px] text-[26px]"
            style={{boxShadow: "0px 2px 10px #00000040"}}>
              
              {/* Icono */}
              <div className='w-[32px] h-[32px] inline-block rounded-full relative' style={{border: '1px #fff solid'}}>
                <Image
                src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694715401/images/imagen_2023-09-14_151642568_btjevx.png'
                width={15}
                height={15}
                // layout="fill"
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                alt='estrella'
                />
              </div>

              {/* Titulo */}
              <h2 className="mt-[6px] font-medium text-white text-left" style={{fontSize:'36px'}}>{t("card3.0.title.0")}</h2>

            </div>
            
            {/* Texto */}
            <p className='w-full font-medium text-[#5F5A5A] mt-[34px] mb-[86px] text-center text-[20px]
            md:text-[18px]'>{t("card3.0.paragraph.0")}</p>
          </div>

          {/* Mision */}
          <div>

            {/* Titulo */}
            <div className="w-full text-center relative flex flex-col items-center  bg-primary pt-[13px] pb-[19px] text-[26px]"
            style={{boxShadow: "0px 2px 10px #00000040"}}>
              
              {/* Icono */}
              <div className='w-[32px] h-[32px] inline-block rounded-full relative' style={{border: '1px #fff solid'}}>
                <Image
                src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694717223/images/imagen_2023-09-14_154704800_velmqf.png'
                width={15}
                height={15}
                alt='cohete'
                // layout="fill"
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                />
              </div>

              {/* Titulo */}
              <h2 className="mt-[6px] font-medium text-white text-left" style={{fontSize:'36px'}}>{t("card3.0.title.1")}</h2>
            </div>
            
            {/* Texto */}
            <p className='w-full font-medium text-[#5F5A5A] mt-[34px] mb-[86px] text-center text-[20px]
            md:text-[18px]'>{t("card3.0.paragraph.1")}</p>
          </div>

          {/* Compromiso */}
          <div>

            {/* Titulo */}
            <div className="w-full text-center relative flex flex-col items-center  bg-primary pt-[13px] pb-[19px] text-[26px]"
            style={{boxShadow: "0px 2px 10px #00000040"}}>
              
              {/* Icono */}
              <div className='w-[32px] h-[32px] inline-block rounded-full relative' style={{border: '1px #fff solid'}}>
                <Image
                src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694717360/images/imagen_2023-09-14_154921728_yvkn6e.png'
                width={15}
                height={15}
                alt='manitas'
                // layout="fill"
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                />
              </div>

              {/* Titulo */}
              <h2 className="mt-[6px] font-medium text-white text-left" style={{fontSize:'36px'}}>{t("card3.0.title.2")}</h2>
            </div>
            
            {/* Texto */}
            <p className='w-full font-medium text-[#5F5A5A] mt-[34px] mb-[86px] text-center text-[20px]
            md:text-[18px]'>{t("card3.0.paragraph.2")}</p>
          </div>

        </div>
      </section>
    </>
  )
}


