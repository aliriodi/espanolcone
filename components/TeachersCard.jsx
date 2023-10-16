// import React, { useState } from 'react';
// import { StarSVG } from './../public/texts/svgConst';
// import Image from 'next/image';
// // import { cardsTeachers } from '../public/imgs/images';
// import { useRouter } from 'next/router';

// export function TeachersCard() {
//   const [selectedStars, setSelectedStars] = useState(0);

//   const TeachersList = () => {
//     const cards = useSelector((state) => state.datos.cards);
//   }
//   const router = useRouter();


//   const handleButtonClick = () => {
//     router.push(`/teachers/${card.id}`);
//   };

//   const handleStarClick = (starNumber) => {
//     setSelectedStars(starNumber);
//   };

//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <svg
//           style={{ zIndex: -1 }}
//           key={i}
//           fill={i <= selectedStars ? 'yellow' : 'none'}
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-4 h-4 cursor-pointer transition-colors duration-300 ease-in-out transform hover:scale-125"
//           onClick={() => handleStarClick(i)}
//         >
//           <StarSVG />
//         </svg>
//       );
//     }
//     return stars;
//   };
//   // prueba push
//   return (
//     <>
//       <div className=" ml-[200px] bg-gray-100 p-8 max-w-lg rounded-lg shadow-md"
//         style={{ position: 'relative', zIndex: 0 }}
//       // style={{ position: 'relative', zIndex: -1 }}

//       >
//         <p>{card.id}</p>
//         <div className="w-full flex items-center space-x-4">
//           <Image
//             alt="photo"
//             width={160}
//             height={160}
//             src={card.image}
//             style={{ zIndex: -1 }}
//             className="
//               w-[30%]
//               rounded-full
//               object-cover
//               mr-4
//               drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)]
//               dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]
//               "
//           />
//           <div>
//             <div className="flex items-center space-x-1 text-green-500">
//               {renderStars()}
//             </div>
//             <p className="mt-1 text-xl font-semibold text-gray-700">{card.name}</p>
//           </div>
//         </div>

//         <p className="mt-4 truncate text-gray-500">
//           {card.content}
//         </p>
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-10"
//           onClick={handleButtonClick}
//         >
//           more
//         </button>
//       </div>
//     </>
//   );
// }

// const Teachers = () => {
//   return (
//     <>
//       {cardsTeachers.map((card, index) => (
//         <TeachersCard
//           key={index}
//           card={card}
//         // name={card.namePerson}
//         // content={card.content}
//         // image={card.image}
//         />
//       ))}
//     </>
//   );
// };

// export default Teachers;


// import React, { useState } from 'react';
// import { StarSVG } from './../public/texts/svgConst';
// import Image from 'next/image';
// import { useSelector } from 'react-redux';
// import { useRouter } from 'next/router';

// export function TeachersCard() {
//   const [selectedStars, setSelectedStars] = useState(0);
//   const router = useRouter();

//   const handleStarClick = (starNumber) => {
//     setSelectedStars(starNumber);
//   };

//   const cards = useSelector((state) => state.datos.cards);

//   const handleButtonClick = (card) => {
//     router.push(`/teachers/${card.id}`);
//   };

//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <svg
//           style={{ zIndex: -1 }}
//           key={i}
//           fill={i <= selectedStars ? 'yellow' : 'none'}
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-4 h-4 cursor-pointer transition-colors duration-300 ease-in-out transform hover:scale-125"
//           onClick={() => handleStarClick(i)}
//         >
//           <StarSVG />
//         </svg>
//       );
//     }
//     return stars;
//   };

//   return (
//     <>
//       {cards.map((card, index) => (
//         <div key={index}>
//           <div className=" ml-[200px] bg-gray-100 p-8 max-w-lg rounded-lg shadow-md">
//             <div className="w-full flex items-center space-x-4">
//               <Image
//                 alt="photo"
//                 width={160}
//                 height={160}
//                 src={card.image}
//                 style={{ zIndex: -1 }}
//                 className="w-[30%] rounded-full object-cover mr-4 drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]"
//               />
//               <div>
//                 <div className="flex items-center space-x-1 text-green-500">
//                   {renderStars()}
//                 </div>
//                 <p className="mt-1 text-xl font-semibold text-gray-700">{card.namePerson}</p>
//               </div>
//             </div>
//             <p className="mt-4 truncate text-gray-500">{card.content}</p>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               onClick={() => handleButtonClick(card)}
//             >
//               more
//             </button>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }


import React, { useState } from 'react';
import { StarSVG } from './../public/texts/svgConst';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import { cardsTeachers } from '../public/imgs/images';
import { useEffect } from 'react';
import { fetchTeachers } from '../redux/ECEActions'


export function TeachersCard() {
  const [selectedStars, setSelectedStars] = useState(0);

  const router = useRouter();

  const handleStarClick = (starNumber) => {
    setSelectedStars(starNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers())

  }, []);

  // Obtén la información de cards desde Redux
  const cards = useSelector((state) => state.datos.cards);

  const handleButtonClick = (card) => {
    router.push(`/teachers/${card.id}`);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          style={{ zIndex: -1 }}
          key={i}
          fill={i <= selectedStars ? 'yellow' : 'none'}
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 cursor-pointer transition-colors duration-300 ease-in-out transform hover:scale-125"
          onClick={() => handleStarClick(i)}
        >
          <StarSVG />
        </svg>
      );
    }
    return stars;
  };

  return (
    <>
      {/* Verifica si hay datos en cards, si no, muestra "Cargando" */}
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <div key={index}>
            <div className="ml-[200px] bg-gray-100 p-8 max-w-lg rounded-lg shadow-md">
              <div className="w-full flex items-center space-x-4">
                <Image
                  alt="photo"
                  width={160}
                  height={160}
                  src={card.image}
                  style={{ zIndex: -1 }}
                  className="w-[30%] rounded-full object-cover mr-4 drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]"
                />
                <div>
                  <div className="flex items-center space-x-1 text-green-500">
                    {renderStars()}
                  </div>
                  <p className="mt-1 text-xl font-semibold text-gray-700">{card.namePerson}</p>
                </div>
              </div>
              <p className="mt-4 truncate text-gray-500">{card.content}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleButtonClick(card)}
              >
                more
              </button>
            </div>
          </div>
        ))
      ) : (

        < Spinner />
      )}
    </>
  );
}
