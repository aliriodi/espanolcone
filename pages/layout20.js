// import React from 'react';
// import Image from 'next/image';
// import final from '../public/imgs/final.png';
// import logo from '../public/imgs/logo.png';

// const Layout20 = () => {
//   return (
//     <div className="min-h-screen flex flex-col relative">
//       <Image
//         src={final}
//         alt="Background Image"
//         layout="fill"
//         objectFit="cover"
//         objectPosition="center"
//         className="z-0"
//       />
//       <div className="text-white text-4xl pt-20 z-10 text-center absolute top-0 left-0 right-0">
//         Texto Arriba
//       </div>
//       <div className="text-white text-4xl z-10 text-center absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
//         Texto en Medio
//       </div>
//       <Image
//         alt="Logo"
//         src={logo}
//         className="z-10 absolute bottom-0 right-0"
//         width={100}
//         height={100}
//       />
//     </div>
//   );
// };

// export default Layout20;
import React from 'react';
import Image from 'next/image';
import final from '../public/imgs/final.png';
import logo from '../public/imgs/logo.png';

const Layout20 = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Image
        src={final}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0"
      />
      <div className="text-white text-7xl font-bold pt-20 z-10 text-center absolute top-0 left-0 right-0">
        layout 20 final
      </div>
      <div className="text-black mx-[300px] text-9xl z-10 font-extrabold text-center absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
        ¡Gracias por tu atención!
      </div>
      <div className="z-10 absolute bottom-0 right-0 pr-[150px] pb-[100px]">
        <Image
          alt="Logo"
          src={logo}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default Layout20;
