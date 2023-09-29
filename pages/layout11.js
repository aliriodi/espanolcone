import React from 'react';
import blanco2 from '../public/imgs/blanco2.png';
import morado2 from '../public/imgs/morado2.png';
import morado3 from '../public/imgs/morado3.png';
import naranja1 from '../public/imgs/naranja1.png';
import dummysr from '../public/imgs/dummysr.png';
import Image from 'next/image';

export default function layout3() {

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Image alt="1" src={blanco2} className="w-[400px] h-[400px] absolute top-0 left-0 z-10" />
      <Image alt="2" src={morado3} className="w-[400px] h-[400px] absolute top-0 right-0 z-10" />
      <Image alt="3" src={morado2} className="w-[500px] h-[300px] absolute bottom-0 left-0 z-10" />
      <Image alt="4" src={naranja1} className="w-[400px] h-[400px] absolute bottom-0 right-0 z-10" />

      <div className="w-[80%] h-full bg-white absolute top-0 right-0 flex flex-col items-center"></div>
      <div className="w-[20%] h-full bg-primary absolute top-0 left-0 ">
        <div className='w-full h-full top-0 right-0 flex flex-col items-center '>
          <div className='text-black text-3xl font-bold pt-[200px] pb-[50px] px-3'>Lorem ipsum dolor sit amet,</div>
          <div className='text-white text-3xl font-bold py-12 px-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
        </div>
      </div>

      <div className="  absolute top-0 right-0 flex flex-col  justify-between px-8 ">
        <div className=" mx-[400px] mt-8 mb-5 text-2xl font-bold ">
          Los estudiantes que hablan en el video son de:
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5 hover:text-orange-500">
          a. Perú, Colombia y Brazil
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5 hover:text-orange-500">
          b. Colombia, Brazil y México
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5 hover:text-orange-500">
          c. Brazil, Venezuela y Estados Unidos
        </div>
        <div className=" mx-[400px] mt-8 mb-5 text-2xl font-bold ">
          A los estudiantes les gusta:
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5 hover:text-orange-500">
          a. La gente y la comida.
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5 hover:text-orange-500">
          b. El clima y los rios.
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5 hover:text-orange-500">
          c. Las plazas y la comida
        </div>
        <div className=" mx-[400px] mt-8 mb-5 text-2xl font-bold ">
          Todos los estudiantes del video estudian la misma carrera universitaria.
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5 hover:text-orange-500">
          a. Verdadero
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5 hover:text-orange-500">
          b. Falso
        </div>
      </div>
    </div>
  );
};
