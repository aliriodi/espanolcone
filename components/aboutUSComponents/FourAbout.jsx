import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next';
import { SwiperSlide, Swiper} from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import 'swiper/swiper-bundle.css';
import 'swiper/css';

export default function Four() {
  const { t } = useTranslation('aboutus')
  let images=[
              {name: (t("cards5.0.title")),image:(t("cards5.0.img")),text:(t("cards5.0.paragraph"))},
              {name: (t("cards5.1.title")),image:(t("cards5.1.img")),text:(t("cards5.1.paragraph"))},
              {name: (t("cards5.2.title")),image:(t("cards5.2.img")),text:(t("cards5.2.paragraph"))},
              {name: (t("cards5.3.title")),image:(t("cards5.3.img")),text:(t("cards5.3.paragraph"))}
               ];
  
  return (
    <>
      <section className='flex justify-between px-[170px] pt-[125px] pb-[189px] relative
      md:hidden'>

        {/* Cartas */}
        {images.map((image, index) => (
          <div key={index} className='flex flex-col items-center w-[193px]'>

            {/* Imagen */}
            <Image alt={image.name} src={image.image} width={300} height={200} />

            {/* Titulo */}
            <h4
            className='flex items-center text-center font-bold text-[#3F3D3D] my-[19px]'
            style={{fontSize: '22px', lineHeight: '26.82px'}}>
              {image.name}
            </h4>

            {/* Texto */}
            <p
            className='flex justify-center items-center text-[#5F5A5A] font-medium text-center'
            style={{lineHeight:'19.5px', fontSize:'16px'}}>
              {image.text}
            </p>
          </div>
        ))}

        <span className='absolute w-[108px] h-[108px] bg-success rounded-full left-[-41px] top-[45%]'></span>
      </section>

      {/* Carrucel del Responsive */}
      <section className='justify-center mt-[90px] mb-[250px] px-[20px] relative hidden
      md:flex'>
        <Swiper 
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (

          // Cart
          <SwiperSlide key={index+1} className=''>
            <div key={index} className='flex flex-col items-center'>

              {/* Icono */}
              <Image alt={image.name} src={image.image} width={200} height={200} className='mx-[82px]' />

              {/* Titulo */}
              <h2
              className='flex justify-center items-center text-center font-bold mb-5 h-10 text-[#3F3D3D]'
              style={{fontSize:'22px', lineHeight:"26.82px"}}>{image.name}</h2>

              {/* Texto */}
              <p
              className='flex justify-center font-medium text-[#5F5A5A] items-center text-center'
              style={{fontSize:'16px'}}>{image.text}</p>
            </div>
          </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  )
}
