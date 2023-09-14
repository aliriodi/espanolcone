import React from 'react';
import Slider from "react-slick";
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { experts } from '../../public/imgs/images.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Experts() {
  const { t } = useTranslation('index');
  const experts2= [
                   {name:t("card5.0.p1.name"),image:experts[0].image,job:t("card5.0.p1.function"),namePerson:t("card5.0.p1.name")},
                   {name:t("card5.0.p2.name"),image:experts[1].image,job:t("card5.0.p2.function"),namePerson:t("card5.0.p2.name")},
                   {name:t("card5.0.p3.name"),image:experts[2].image,job:t("card5.0.p3.function"),namePerson:t("card5.0.p3.name")},
                   {name:t("card5.0.p4.name"),image:experts[3].image,job:t("card5.0.p4.function"),namePerson:t("card5.0.p4.name")}
                  ];

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
      <h2 className='underlined-subtitle'>
        {t("card5.0.title1")}
        </h2>

      <div className='mt-5'>
        <Slider {...settings}>
          {experts2.map((image, index) => (
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
