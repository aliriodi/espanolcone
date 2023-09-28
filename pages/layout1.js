import React from 'react';
import Image from 'next/image';
import inicio from '../public/imgs/inicio.png';
import logo from '../public/imgs/logo-primary.png';

export default function layout1() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Image
        src={inicio}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0"
      />
      <div className="text-white pl-[200px] pt-20 z-10 top-0 right-0">
        <Image
          alt="Logo"
          src={logo}
          width={250}
          height={250}
        />
      </div>
      <div className="text-white flex justify-end text-8xl z-10 font-bold text-center ml-[800px] absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
        TITULO DE LA CLASE AQUI!!
      </div>
      <div className="text-white text-left text-4xl pb-20 relative z-10 ml-[20px] mt-auto">
        hola alirio
      </div>
    </div>
  );
};
