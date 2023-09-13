import React from 'react'
import Image from 'next/image'
import { experts } from '../../public/imgs/images.js';

export default function Experts() {
  return (
    <>
      <div>
        <p className=' flex items-center justify-center text-4xl'>Meet our team experts</p>
      </div>
      <div className='grid grid-cols-4 gap-4 '>
        {experts.map((image, index) => (
          <div key={index} className='col-span-1 my-10 mx-20'>
            <Image alt={image.name} src={image.image} width={300} height={200} />
            <div className='flex items-center justify-center flex-col'>
              <p className='text-xl font-semibold'>{image.namePerson}</p>
              <p>{image.job}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
