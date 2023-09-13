import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next';
export default function Aprende() {
  const { t } = useTranslation('aboutus')
  return (
    <div className='h-[800px] flex items-center justify-center flex-col'>
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
    </div>
  )
}
