import Image from 'next/image'
import React from 'react'
import { images } from '../../public/imgs/images.js';

export default function Four() {
  return (
    <div className='grid grid-cols-4 gap-4 mt-[250px] mb-[250px]'>
      {images.map((image, index) => (
        <div key={index} className='col-span-1 my-10 mx-20'>
          <Image alt={image.name} src={image.image} width={300} height={200} />
          <p>{image.name}</p>
          <p>{image.text}</p>
        </div>
      ))}
    </div>
  )
}
