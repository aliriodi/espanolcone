import Image from "next/image";
import { StarSVG } from './../public/texts/svgConst';
import Spinner from './Spinner';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsTouristDetail, fetchTouristGuides } from './../redux/ECEActions';



export function TourCard() {

  const [selectedStars, setSelectedStars] = useState(0);

  const router = useRouter();

  const handleStarClick = (starNumber) => {
    setSelectedStars(starNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTouristGuides())

  }, []);

  // Obtén la información de cards desde Redux
  const cards = useSelector((state) => state.datos.cardsTourist);

  const handleButtonClick = (card) => {
    dispatch(CardsTouristDetail(card))
    router.push(`/tourGuides/${card.id}`);
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
  // prueba
  return (
    <>
      <div className='bg-gray-200'>
        <div className='flex flex-col my-5'>

          <p className='font-extrabold'>Turismo en Córdoba</p>
          <p className='my-2 flex flex-row'>Aquí encontrarás información detallada sobre nuestros servicios, perfiles de nuestros guías y testimonios de otros viajeros satisfechos. Tambien podrás reservar tu visita guiada de amnera fácil y rápida.</p>
          <p> ¡Explora la ciudad de una manera única y sumérgete en su rica cultura y belleza natural!</p>
        </div>

        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index} className="w-screen mb-4 bg-white">
              <div className="grid grid-cols-6 gap-4  border-solid border-[1px] border-gray-400 rounded mr-2">
                <div className="col-span- flex items-center justify-center p-4">
                  <div className="w-24 h-24">
                    <Image
                      alt="photo"
                      width={160}
                      height={160}
                      src={card.image}
                      className="w-full h-full rounded-full object-cover mb-5"
                    />
                    <div className="flex items-center space-x-1 text-green-500">
                      {renderStars()}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 ">
                  <div className="flex-1 p-4">
                    <div className="text-xl font-semibold text-gray-700 mb-2">{card.namePerson}</div>
                    <p className="text-gray-500">{card.content}</p>
                  </div>
                </div>
                <div className="col-span-1  flex items-end justify-center p-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleButtonClick(card)}
                  >
                    more
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
