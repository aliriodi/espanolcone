import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Conoce() {
  
  const { t } = useTranslation('index');
  const {push} = useRouter();

  return (
    <>
      <section className='flex h-[860px] px-[173px] bg-primary justify-between 
      md:px-[20px]'>

        <div className='mt-[137px] text-white w-[460px]
        md:min-w-full '>

          {/* Titulo */}
          <h2 className='flex justify-start text-4xl text-white font-bold ' style={{textShadow: '0px 1px 2px #00000040'}}>
           {t("card3Title")}
          </h2>

          {/* Texto */}
          <p className='mt-[40px] flex justify-start text-xl font-semibold
          md:my-[32px] md:text-[16px] md:drop-shadow-[0px_1px_2px_#00000040]'
          style={{textShadow: '0px 1px 2px #00000040'}}>
          {t("card3Text")}
          </p>

          {/* Lista */}
          <ul className='flex flex-col justify-start text-[20px] font-semibold my-4
          md:text-[16px] md:drop-shadow-[0px_1px_2px_#00000040]'
          style={{textShadow: '0px 1px 2px #00000040'}}>
          
            <li className='flex items-center'> <p className='bg-white w-2 h-2 rounded-full mx-2 shadow-[0px_1px_2px_#00000040]'></p> {t("card3List.0")}</li>

            <li className='flex items-center'> <p className='bg-white w-2 h-2 rounded-full mx-2 shadow-[0px_1px_2px_#00000040]'></p> {t("card3List.1")}</li>

            <li className='flex items-center'> <p className='bg-white w-2 h-2 rounded-full mx-2 shadow-[0px_1px_2px_#00000040]'></p> {t("card3List.2")}</li>

            <li className='flex items-center'> <p className='bg-white w-2 h-2 rounded-full mx-2 shadow-[0px_1px_2px_#00000040]'></p> {t("card3List.3")}</li>

          </ul>

          {/* Texto Inferior */}
          <p className='mb-[54px] flex justify-start text-xl font-semibold
          md:my-[32px] md:text-[16px] md:drop-shadow-[0px_1px_2px_#00000040]'
          style={{textShadow: '0px 1px 2px #00000040'}}>
          {t("card3Text2")}
          </p>

          {/* Iniciar secion */}
          <Link
            type="button"
            className="text-primary bg-white rounded-full w-[305px] h-[57px] text-center text-[20px] font-semibold flex items-center justify-center  active:bg-primary active:text-white focus:outline-none"
            style={{ boxShadow: '0px 2px 8px 0px #00000040'}}   
            href={'/aboutus'}
            >
            {t("card3Button")}
          </Link>

        </div>

        {/* Imagen Celular */}
        <div className=' flex justify-center items-center
        lg:hidden'>
          <Image
            src="https://res.cloudinary.com/dfddh08q8/image/upload/v1707245411/images/r5wp8viaocuxmtgcpn8s.png"
            alt="Teléfono"
            width={562.99}
            height={697.72}
          />
        </div>


      </section>
    </>
  )
}
