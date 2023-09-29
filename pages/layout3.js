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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius, velit eu accumsan ullamcorper, elit quam vehicula orci, sed vulputate urna erat eu ante. nec finibus risus felis ut arcu. Vivamus non nulla in nulla feugiat vestibulum. Nunc nec dui ac justo convallis posuere.
        </div>
        <div className="mx-[400px] text-2xl font-bold mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius, velit eu accumsan ullamcorper, elit quam vehicula orci, sed vulputate urna erat eu ante. Nullam non metus vel sapien vestibulum consequat. Fusce nec tincidunt lectus, nec ullamcorper neque. Nulla facilisi. Sed eget dui vel elit egestas bibendum id vel neque. Cras rhoncus, tortor nec auctor laoreet, turpis quam dignissim ante, nec finibus risus felis ut arcu. Vivamus non nulla in nulla feugiat vestibulum. Nunc nec dui ac justo convallis posuere.
        </div>
        <div className="flex flex-col items-center">
          <Image alt="sr" src={dummysr} />
          <div className="mt-1 font-bold text-lg">titulo imagen</div>
          <div className="mt-1 text-sm">texto imagen</div>
        </div>
      </div>


    </div>
  );
};
