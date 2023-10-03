import React, { useState } from 'react';
import { StarSVG } from './../public/texts/svgConst';
import Image from 'next/image';
import { cardsTeachers } from '../public/imgs/images';

export function TeachersCard({ index, name, content, image }) {
  const [selectedStars, setSelectedStars] = useState(0);

  const handleStarClick = (starNumber) => {
    setSelectedStars(starNumber);
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
  // prueba push
  return (
    <>
      <div className=" ml-[200px] bg-gray-100 p-8 max-w-lg rounded-lg shadow-md"
        style={{ position: 'relative', zIndex: -1 }}
      >
        <div className="w-full flex items-center space-x-4">
          <Image
            alt="photo"
            width={160}
            height={160}
            src={image}
            style={{ zIndex: -1 }}
            className="
              w-[30%]
              rounded-full
              object-cover
              mr-4
              drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)]
              dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]
              "
          />
          <div>
            <div className="flex items-center space-x-1 text-green-500">
              {renderStars()}
            </div>
            <p className="mt-1 text-xl font-semibold text-gray-700">{name}</p>
          </div>
        </div>

        <p className="mt-4 truncate text-gray-500">
          {content}
        </p>
      </div>
    </>
  );
}

const Teachers = () => {
  return (
    <>
      {cardsTeachers.map((card, index) => (
        <TeachersCard
          key={index}
          name={card.namePerson}
          content={card.content}
          image={card.image}
        />
      ))}
    </>
  );
};

export default Teachers;
