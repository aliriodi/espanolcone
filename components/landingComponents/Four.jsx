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
    <div className='grid grid-cols-4 gap-4 mt-[250px] mb-[250px]'>
      {images2.map((image, index) => (
        <div key={index} className='col-span-1 my-10 mx-20 '>
          <Image alt={image.name} src={image.image} width={300} height={200} />
          <h2 className='mx-5 flex justify-center items-center text-center font-bold mb-5 h-10'>{image.name}</h2>
          <div className='mx-5 flex justify-center items-center'>
            <p className='flex justify-center items-center text-center'>{image.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
