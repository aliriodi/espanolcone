import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Conoce() {
  
  const { t } = useTranslation('index');
  const {push} = useRouter();

  return (
    <>
      <div className='grid grid-cols-10 gap-4 h-[600px] bg-[#4CCFEB] '>

        <div className='col-span-7 mx-[100px] mt-[100px] text-white'>

          <p className='flex justify-start text-4xl text-white font-bold ' style={{textShadow: '0px 1px 2px #00000040'}}>
           {t("card3Title")}
          </p>

          {/* Texto */}
          <p className='mt-10 mb-[100px] flex justify-start text-xl mr-[200px] font-semibold' style={{textShadow: '0px 1px 2px #00000040'}}>
          {t("card3Text")}
          </p>

          {/* Iniciar secion */}
          <button
            type="button"
            className="text-primary bg-white font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 active:bg-primary active:text-white focus:outline-none"
            style={{fontSize:'20px',padding: '18px 28px', boxShadow: '0px 2px 8px 0px #00000040'}}   
            onClick={()=>push("/aboutus")}       >
            {t("card3Button")}
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
