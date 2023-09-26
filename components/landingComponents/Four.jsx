import Image from 'next/image'
import React from 'react'
import { images } from '../../public/imgs/images.js';
import { useTranslation } from 'next-i18next';

export default function Four() {
  const { t } = useTranslation('index')
  const images2 = [ {name:t("card2.0.title"),image:images[0].image,text:t("card2.0.paragraph")},
                    {name:t("card2.1.title"),image:images[1].image,text:t("card2.1.paragraph")},
                    {name:t("card2.2.title"),image:images[2].image,text:t("card2.2.paragraph")},
                    {name:t("card2.3.title"),image:images[3].image,text:t("card2.3.paragraph")},];

  return (

    <section className='flex justify-between mt-[90px] mb-[250px] px-[172px] relative
    md:px-[20px]'>
      {images2.map((image, index) => (

        // Cart
        <div key={index} className='col-span-1 w-[193px]'>

          {/* Icono */}
          <Image alt={image.name} src={image.image} width={300} height={200} />

          {/* Titulo */}
          <h2
          className='flex justify-center items-center text-center font-bold mb-5 h-10 text-[#3F3D3D]'
          style={{fontSize:'22px', lineHeight:"26.82px"}}>{image.name}</h2>

          {/* Texto */}
          <p
          className='flex justify-center font-medium text-[#5F5A5A] items-center text-center'
          style={{fontSize:'16px'}}>{image.text}</p>
        </div>
      ))}

      {/* Bola Naranja */}
      <span className='bg-warning h-[159px] w-[159px] absolute rounded-full left-[-100px] bottom-[-10%]'/>
    </section>

  )
}
