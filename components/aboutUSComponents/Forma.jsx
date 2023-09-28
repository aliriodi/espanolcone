import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import Ellipse2 from '../../public/imgs/ellipse-3.png'

export default function Forma() {
  const { t } = useTranslation('aboutus');
  return (
    <>
      <section className='flex items-center justify-center px-[170px] py-[125px] relative
      md:flex-col md:px-[20px] md:py-[58px]'>

          {/* Contenido */}
          <div className="w-[532px] flex flex-col z-10
          md:w-full" >

            <div className='flex flex-col items-start justify-center'>

              {/* Titulo */}
              <h2 className='subtitle mb-[34px]'>
                {t("card4.title1")}
              </h2>

              {/* Texto */}
              <p className='mb-[22px] font-medium text-[#5F5A5A] leading-[21.94px] text-[18px]
              md:text-[16px] md:leading-[19.5px]'>
              {t("card4.paragraph1")}
              </p>
              
              <p className='mb-[58px] font-medium text-[#5F5A5A] leading-[21.94px] text-[18px]
              md:text-[16px] md:leading-[19.5px]'>
              {t("card4.paragraph2")}
              </p>

              
              {/* Que encontraras */}
              <h3 className='text-[#505050] mb-[30px] text-[30px]
              md:text-[20px]'> 
               {t("card4.title2")}
              </h3>

              {/* Lista */}
              <ul className="pl-4 mb-[26px] text-[#5F5A5A] font-medium list-none" style={{lineHeight: '29.05px', fontSize:'18px'}}>
                <li><span className='font-bold mx-2
                md:text-[16px] md:leading-[19.5px]'>.</span> {t("card4.sentece.0")}</li>
                <li><span className='font-bold mx-2
                md:text-[16px] md:leading-[19.5px]'>.</span> {t("card4.sentece.1")}</li>
                <li><span className='font-bold mx-2
                md:text-[16px] md:leading-[19.5px]'>.</span> {t("card4.sentece.2")}</li>
                <li><span className='font-bold mx-2
                md:text-[16px] md:leading-[19.5px]'>.</span> {t("card4.sentece.3")}</li>
                <li><span className='font-bold mx-2
                md:text-[16px] md:leading-[19.5px]'>.</span> {t("card4.sentece.4")}</li>
              </ul>

              <p className='mb-[58px] font-medium text-[#5F5A5A]
              md:text-[16px] md:leading-[19.5px]'
              style={{lineHeight:'21.94px', fontSize:'18px'}}>
              {t("card4.paragraph3")}
              </p>

             
              {/* Unirse */}
              <button
                type="button"
                className="
                  w-[326px] h-[48px] text-white bg-[#A97EEE] font-bold rounded-md transition-all
                 hover:bg-success hover:h-[50px] hover:w-[328px]
                 md:w-[90%] md:m-auto"
                style={{textShadow: '0px 0.9133211970329285px 1.826642394065857px #00000040', boxShadow:'box-shadow: 0px 1px 2px #00000026'}}
                onClick={()=> window.open('https://discord.com/invite/QeC9mCShnm', '_blank', 'noopener, noreferrer')}
              >
               {t("card4.button")}
              </button>
              
            </div>
          </div>

          {/* Imagen */}
          <div className="w-1/2 flex items-center justify-center z-10
          md:w-full">
            <Image
              src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366389/images/banner-discord_gx3eqy.png"
              alt="discord"
              width={800}
              height={400}
              style={{filter:'drop-shadow( 0px 4px 43px #00000026)'}}
            />
          </div>

          {/* Ellipse */}
          <Image
          className='absolute z-0 left-[-50px] top-0
          md:hidden'
          style={{ transform: 'scaleX(-1)' }}
          width={145}
          height={296}
          src='https://res.cloudinary.com/dfddh08q8/image/upload/v1694366401/images/ellipse-70_s1vmal.png'
          alt='curva izquierda'
          />

          {/* Ellipse 2 */}
          <Image
          className='absolute z-0 right-0 min-h-screen w-1/2 top-[125px]
          md:w-full md:h-auto md:min-h-auto md:top-auto md:bottom-0'
          // style={{ transform: 'scaleX(-1)' }}
          width={1011}
          height={690}
          src={Ellipse2}
          alt='ELLIPSE2'
          />
      </section>
    </>
  )
}
