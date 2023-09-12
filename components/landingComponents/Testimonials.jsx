import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      <div className='h-[1000px]'>
        <div className=' flex flex-col justify-center items-center'>
          <h1 className='m-10'>Don&apos;t take our word for it</h1>
          <p>Read what our students have to say about their experience with us.</p>
        </div>
        <div className="overflow-hidden" style={{ marginBottom: "-6px" }}>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-screen min-h-[200px] md:min-h-[400px] relative cursor-pointer bg-red-500 mx-[40px]"
                onClick={() => setCurrentSlide(index)}
              >
                <div className="text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center p-2 text-lg font-semibold">
                  &quot;{testimonial.text}&quot;
                  <p className="text-sm mt-2">- {testimonial.author}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};




const testimonials = [
  {
    id: 1,
    text: "Excelente servicio al cliente, siempre dispuestos a ayudar.",
    author: "Juan Pérez",
  },
  {
    id: 2,
    text: "Los productos son de alta calidad y a precios muy competitivos.",
    author: "María González",
  },
  {
    id: 3,
    text: "La entrega fue rápida y el producto llegó en perfecto estado.",
    author: "Luis Rodríguez",
  },
  {
    id: 4,
    text: "Recomiendo esta empresa a todos mis amigos y familiares.",
    author: "Ana Martínez",
  },
];



export default TestimonialsSlider;

