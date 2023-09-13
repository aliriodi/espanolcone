import React from 'react';
import Slider from "react-slick";
import Image from 'next/image';
import { experts } from '../../public/imgs/images.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Experts() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <p className='flex items-center justify-center text-4xl'>Nuestro Equipo</p>
      <div className='mt-5'>
        <Slider {...settings}>
          {experts.map((image, index) => (
            <div key={index} className='px-2'>
              <div className='my-10 mx-20'>
                <Image alt={image.name} src={image.image} width={300} height={200} />
                <div className='flex items-center justify-center flex-col'>
                  <p className='text-xl font-semibold'>{image.namePerson}</p>
                  <p>{image.job}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
