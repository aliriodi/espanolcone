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
      {/* Titulo */}
      <div className='flex justify-center items-center flex-col'>
        <h2 className='flex justify-center items-center my-5' style={{fontSize:'30px', color: '#323030'}}>
          Nuestro Equipo
        </h2>

        <span className='bg-secondary flex' style={{height:'2px', width:'80.8px'}}></span>
      </div>

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
