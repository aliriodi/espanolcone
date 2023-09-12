import React from 'react'
import Image from 'next/image'
import { experts } from '../../public/imgs/images.js';

export default function Experts() {
  return (
    <>
      <div>
        <p>Meet our team experts</p>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {experts.map((image, index) => (
          <div key={index} className='col-span-1 my-10 mx-20'>
            <Image alt={image.name} src={image.image} width={300} height={200} />
            <p>{image.namePerson}</p>
            <p>{image.job}</p>
          </div>
        ))}
      </div>
    </>
  )
}
