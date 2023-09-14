import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'next-i18next';
export default function Forma() {
  const { t } = useTranslation('aboutus');
  return (
    <>
      <section className='flex items-center justify-center'>

          <div className="w-[532px] flex flex-col" >

            <div className='flex flex-col items-center justify-center'>

              <h2 className='subtitle mb-[100px]'>
                {t("card4.title1")}
              </h2>

              <p className='mb-[50px]'>
              {t("card4.paragraph1")}
              </p>
              
              <p className='mb-[50px]'>
              {t("card4.paragraph2")}
              </p>

              <h3 className='text-xl mb-[20px]'>
               {t("card4.title2")}
              </h3>

              <ul className="list-disc pl-4 mb-5">
                <li>{t("card4.sentece.0")}</li>
                <li>{t("card4.sentece.1")}</li>
                <li>{t("card4.sentece.2")}</li>
                <li>{t("card4.sentece.3")}</li>
                <li>{t("card4.sentece.4")}</li>
              </ul>
             
              <button
                type="button"
                className="w-full text-white bg-[#A97EEE] font-bold rounded-md text-sm px-10 py-2.5 mr-2 mb-2 focus:outline-none active:bg-white active:text-[#A97EEE] "
                onClick={()=> window.open('https://discord.com/invite/QeC9mCShnm', '_blank', 'noopener, noreferrer')}
              >
               {t("card4.button")}
              </button>
              {/* </Link> */}
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center">
            <Image
              src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694366389/images/banner-discord_gx3eqy.png"
              alt="discord"
              width={800}
              height={400}
              className='mr-[200px]'
            />
          </div>
      </section>
    </>
  )
}
