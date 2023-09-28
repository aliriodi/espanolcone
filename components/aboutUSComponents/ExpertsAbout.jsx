
import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { experts } from '../../public/imgs/images.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SwiperSlide, Swiper} from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import 'swiper/swiper-bundle.css';

import 'swiper/css';

export default function Experts() {
  const { t } = useTranslation('index')

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className='relative overflow-hidden px-[170px]  pt-[61px] mb-[400px]
    md:p-[20px] md:mb-[200px]'>

      <span
      className='absolute h-full w-[100%] bg-[#F5F6FC] z-0 top-0 scale-x-[2] left-0 right-0
      md:scale-x-[3]'
      style={{borderRadius:' 0 0 50% 50% /0 0 100% 100%'}}></span>

      {/* Titulo */}
      <h2 className='underlined-subtitle z-10 relative'>{t("card5.0.title")}</h2>

      {/* Carrusel Swiper */}
      <div className='my-[100px] w-[100%] relative
      md:hidden'>
        <Swiper 
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        >
          {experts.map((image, index) => (
          <SwiperSlide key={index}>
            <div key={index} className='relative flex flex-col items-center'>
                {/* Imagen */}
                <Image alt={image.name} src={image.image} width={162} height={162} />

                {/* Nombre */}
                <p className='text-center font-semibold mt-[15px] mb-[5px]'>{image.namePerson}</p>

                {/* Trabajo */}
                <p className='text-center'>{image.job}</p>
            </div>
          </SwiperSlide>

          ))}
        </Swiper>
      </div>
      
      {/* Carrusel Responsive Swiper */}
      <div className='my-[100px] w-[100%] relative hidden
      md:block'>
        <Swiper 
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        >
          {experts.map((image, index) => (
          <SwiperSlide key={index}>
            <div key={index} className='relative flex flex-col items-center'>
                {/* Imagen */}
                <Image alt={image.name} src={image.image} width={162} height={162} />

                {/* Nombre */}
                <p className='text-center font-semibold mt-[15px] mb-[5px]'>{image.namePerson}</p>

                {/* Trabajo */}
                <p className='text-center'>{image.job}</p>
            </div>
          </SwiperSlide>

          ))}
        </Swiper>
      </div>

    </section>
  );
}
