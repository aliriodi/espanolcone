import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation('index');
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: setCurrentSlide,
  };

  return (
    <>
      <section className='h-[1000px] mt-[100px] relative overflow-hidden'>
        {/* Titulo */}
        <div className='flex justify-center items-center flex-col mb-6 text-[#5E6063] z-10'>
          <h2 className='flex justify-center items-center my-5' style={{fontSize:'30px', color: '#323030'}}>
            {t("card6.0.title")}
           </h2>

          <span className='bg-secondary flex' style={{height:'2px', width:'80.8px'}}></span>
        </div>

        <p className='mb-12 text-center z-10'>
           {t("card6.0.sentence")}
         </p>

        <div className="overflow-hidden relative z-10" style={{ marginBottom: "-6px" }}>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-screen min-h-[300px] md:min-h-[500px] relative cursor-pointer z-10"
                onClick={() => setCurrentSlide(index)}
              >
                <div className="text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-2 text-lg font-semibold ">
                  <p className="mt-2 text-2xl mb-1">- {testimonial.author}</p>
                  <p className='text-md mb-8 text-[#5E6063] font-medium'>{testimonial.place}</p>
                  <p className='text-[#5E6063] font-medium'>&quot;{testimonial.text}&quot;</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Ellipse */}
        <Image
        src='https://res.cloudinary.com/dfddh08q8/image/upload/v1695144962/images/imagen_2023-09-19_143603099_zp393z.png'
        height={628}
        width={1440}
        className='bottom-0 absolute w-full z-0'
        />

        
        {/* Ellipse Naranja */}
        <span
        className='rounded-full h-[110px] w-[110px] z-20 absolute  border-warning right-[-43px] bottom-1/2'
        style={{border: '20px solid #ff7438'}}></span>
      </section>
    </>
  );
};


const testimonials = [
  {
    id: 1,
    text: "My experience with Español con E has been excelente!  The learning is targeted to meet the needs of each individual student.  There is always a focus on keeping it fun.  During my on-line session Eucaris is always cheerful, patient, and encouraging.  I've been studying Spanish as a personal interest for years, and this is the best class experience I have had.  I am able to utilize the skills in everyday life in Houston, TX and also during my time as a volunteer.  In addition, I think learning a second language is good exercise for the brain.  Te lo recomiendo mucho Español con E.",
    place: " Houston - Estados Unidos",
    author: "Tom C."
  },
  {
    id: 2,
    text: "My daughters and I have been studying Spanish with Eucaris for more than two years now, and we have all improved so much. I think we've stuck with our studies this long because Eucaris offers lessons that consider our individual interests and language needs. She has pushed me to work toward goals to use my Spanish skills in my job, and she supports me in reaching those goals through relevant activities, assignments, and feedback. Español with E is helping my family become truly bilingual!",
    place: " Florida - Estados Unidos",
    author: "Kayla D."
  },
  {
    id: 3,
    text: "It has been almost two years that I have been learning Spanish with Español Con E (Señora Rodríguez). I had some basic knowledge of Spanish, however ever since I started with Español con E my Spanish skills have incredibly improved. It has been a long time dream of mine to be able to speak, and write Spanish. I can honestly say that it has been a wonderful experience. At times very challenging, but we’ve worked through it all with her patience, professionalism, honesty, and most of all her sincerity. I have the outmost respect for her and her organization.Thank you.",
    place: "Oklahoma City - Estados Unidos",
    author: "Dave B."
  },
  {
    id: 4,
    text: "Before studying with Espanol con E, I had an intermediate level of Spanish. However, since I have been studying with them, I feel my Spanish skills have remarkably improved.  As a physician, my goal was and is to be able to communicate with my Spanish speaking patients.  Thanks to Espanol con E, I am much more fluent and confident in my Spanish communication skills.  ¡Muchísimas gracias a Espanol con E!",
    place: "Oklahoma City - Estados Unidos",
    author: "Lisa J.",
  },
];


export default TestimonialsSlider;

