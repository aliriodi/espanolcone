import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next';

export default function Four() {
  const { t } = useTranslation('aboutus')
  let images2=[
              {name: (t("cards5.0.title")),image:(t("cards5.0.img")),text:(t("cards5.0.paragraph"))},
              {name: (t("cards5.1.title")),image:(t("cards5.1.img")),text:(t("cards5.1.paragraph"))},
              {name: (t("cards5.2.title")),image:(t("cards5.2.img")),text:(t("cards5.2.paragraph"))},
              {name: (t("cards5.3.title")),image:(t("cards5.3.img")),text:(t("cards5.3.paragraph"))}
               ];
  
  return (
    <div className='grid grid-cols-4 gap-4 mt-[250px] mb-[250px]'>
      {images2.map((image, index) => (
        <div key={index} className='col-span-1 my-10 mx-20 '>
          <Image alt={image.name} src={image.image} width={300} height={200} />
          <h2 className='mx-5 flex justify-center items-center text-center font-bold mb-5 h-10'>{image.name}</h2>
          <div className='mx-5 flex justify-center items-center text-center'>
            <p className='flex justify-center items-center'>{image.text}</p>
          </div>
        </div>
      ))}
      {/* {images.map((image, index) => (
        <div key={index} className='col-span-1 my-10 mx-20 '>
          <Image alt={image.name} src={image.image} width={300} height={200} />
          <h2 className='mx-5 flex justify-center items-center text-center font-bold mb-5 h-10'>{image.name}</h2>
          <div className='mx-5 flex justify-center items-center text-center'>
            <p className='flex justify-center items-center'>{image.text}</p>
          </div>
        </div>
      ))} */}
    </div>
  )
}
