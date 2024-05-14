import React, { useState, useEffect, use } from 'react';
import Slider from "react-slick";
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { experts } from '../../public/imgs/images.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import 'swiper/swiper-bundle.css';

import 'swiper/css';

export default function Experts() {
  const { t } = useTranslation('index');
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    async function blog() {
      const devDotToPosts = await fetch(`/api/blog/posts/get`);
      const res = await devDotToPosts.json();
      setBlogs(res.posts.reverse())
    }
    blog()
  },
    [])
  const experts2 = [
    { name: t("card5.0.p1.name"), image: experts[0].image, job: t("card5.0.p1.function"), namePerson: t("card5.0.p1.name") },
    { name: t("card5.0.p2.name"), image: experts[1].image, job: t("card5.0.p2.function"), namePerson: t("card5.0.p2.name") },
    { name: t("card5.0.p3.name"), image: experts[2].image, job: t("card5.0.p3.function"), namePerson: t("card5.0.p3.name") },
    { name: t("card5.0.p4.name"), image: experts[3].image, job: t("card5.0.p4.function"), namePerson: t("card5.0.p4.name") },
    { name: t("card5.0.p5.name"), image: experts[4].image, job: t("card5.0.p5.function"), namePerson: t("card5.0.p5.name") },
    { name: t("card5.0.p5.name"), image: experts[5].image, job: experts[5].job, namePerson: experts[5].namePerson }
  ];
  console.log(blogs)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <section className='px-[170px] py-[150px]
    md:px-[20px]'>

      {/* Titulo */}
      <h2 className='underlined-subtitle'>
        {t("card7.0.title")}
      </h2>

      {/* Carrucel */}
      <div className='mt-[100px] w-[100%] relative
      md:hidden'>
        <Swiper
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >

          {blogs.map((blog, index) => (
            blog.publish &&
           
              <SwiperSlide key={index} >
              <a href={'/'+t('language')+'/blog/posts/post?slug='+blog.slug} className='hover:border-primary_hover'>
                <div key={index} className='relative flex flex-col items-center pl-2  hover:border-primary_hover'>
                  {/* Imagen */}
                  <Image alt={blog.social_image} src={blog.social_image} width={162} height={162} />

                  {/* Titulo */}
                  <p className='text-center font-semibold mt-[15px] mb-[5px]'>{t('language') == 'pt' ? blog.pt.title : null}
                    {t('language') == 'es' ? blog.es.title : null}
                    {t('language') == 'en' ? blog.en.title : null}
                  </p>

                  {/* Trabajo */}
                  {/* <p className='text-center'>{blog.job}</p> */}
                </div></a>
              </SwiperSlide>
           
          ))}
        </Swiper>
      </div>


      {/* Carrucel Responsive*/}
      <div className='mt-[100px] w-[100%] hidden
      md:block'>
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >

          {experts2.map((image, index) => (
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
