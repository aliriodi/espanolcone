import Image from 'next/image';
import React from 'react';
import morado1 from '../public/imgs/morado1.png';
import blanco1 from '../public/imgs/blanco1.png';


const RectangleComponent = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="h-[35%] w-full bg-primary flex items-start justify-between z-10">
        <Image alt='1' width={400} height={400} src={blanco1}></Image>
        <Image alt='1' width={600} height={600} src={morado1}></Image>
        {/* <p className="w-full text-white text-4xl font-bold">Prueba 1</p> */}
      </div>
      <div className="h-[65%] w-full bg-white flex items-center justify-center">
        <p className="text-black text-4xl font-bold">Layout(2,5,6,8,9,10,14,16)</p>
      </div>
    </div >
  );
};

export default RectangleComponent;
