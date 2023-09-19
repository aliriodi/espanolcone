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
      <section className='grid grid-cols-10 gap-4 h-[600px] px-[173px] bg-primary'>

        <div className='col-span-7 mt-[100px] text-white min-w-[644px]  mr-[117px]'>

          {/* Titulo */}
          <h2 className='flex justify-start text-4xl text-white font-bold ' style={{textShadow: '0px 1px 2px #00000040'}}>
           {t("card3Title")}
          </h2>

          {/* Texto */}
          <p className='mt-[40px] mb-[120px] flex justify-start text-xl font-semibold'
          style={{textShadow: '0px 1px 2px #00000040', fontSize:'20px'}}>
          {t("card3Text")}
          </p>

          {/* Iniciar secion */}
          <Link
            type="button"
            className="text-primary bg-white font-medium rounded-md text-sm px-5 py-2.5  active:bg-primary active:text-white focus:outline-none"
            style={{fontSize:'20px',padding: '18px 28px', boxShadow: '0px 2px 8px 0px #00000040'}}   
            href={'/aboutus'}
            >
            {t("card3Button")}
          </Link>

        </div>

        <div className='col-span-3 flex justify-start items-end'>
          <Image
            src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437853/images/Group_14.4_nzv8eu.png"
            alt="Teléfono"
            width={405.17}
            height={695.72}
            className='absolute right-[122px]'
          />
        </div>


      </section>
    </>
  )
}
