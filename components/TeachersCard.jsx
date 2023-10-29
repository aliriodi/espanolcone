import React, { useState, useEffect } from 'react';
import { StarSVG } from './../public/texts/svgConst';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import YouTube from 'react-youtube';
import { cardsTeachers } from '../public/imgs/images';
import { cardDetail, fetchTeachers } from '../redux/ECEActions'


export function TeachersCard() {
  const [selectedStars, setSelectedStars] = useState(0);

  const router = useRouter();

  const handleStarClick = (starNumber) => {
    setSelectedStars(starNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachers())
    dispatch(cardDetail())


  }, [dispatch]);

  


  // Obtén la información de cards desde Redux
  const cards = useSelector((state) => state.datos.cards);

  const handleButtonClick = (card) => {
    dispatch(cardDetail(card))
    router.push(`/teachers/${card._id}`);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          style={{ zIndex: 1 }}
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
      <div className='bg-gray-200'>
        <div className='flex flex-col my-5'>

          <p className='font-extrabold'>Encontrá tu profesor</p>
          <p className='my-2 flex flex-row'>
            ¡Bienvenido a &nbsp;<span className='font-bold italic'>Español con E</span>, nuestra plataforma de profesores particulares!
          </p>
          <p> Nuestra plataforma es fácil de usar y te va a permitr buscar profesores según tus preferencias</p>
        </div>

        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={index} className="w-screen mb-4 g-white">
              <div className="grid grid-cols-6 gap-4  border border-gray-400 b rounded mr-2">
                <div className="col-span- flex items-center justify-center p-4">
                  <div className="w-24 h-24">
                    <Image
                      alt="photo"
                      width={160}
                      height={160}
                      src={ card ?  // ¿Existe la variable 'card'?
                      card.image ?  // ¿Existe la propiedad 'image' en 'card'?
                        card.image.url ? card.image.url : card.image // ¿Existe la propiedad 'url' en 'card.image'? Si es cierto, usa 'card.image.url'; de lo contrario, usa 'card.image'.
                      : card.image // Si no existe 'card.image', usa 'card.image'.
                    : null}
                      className="w-full h-full rounded-lg object-cover mb-5"
                    />
                   
                    <div className="flex items-center space-x-1 text-green-500">
                    {/* {console.log(card)} */}
                      {renderStars()}
                    </div>
                  </div>
                </div>
                <div className="col-span-4 ">
                  <div className="flex-1 p-4">
                    <div className="text-xl font-semibold text-gray-700 mb-2">{card.first_name+' '+card.last_name}</div>
                    <p className="text-gray-500">{card.content}</p>
                  </div>
                </div>
                <div className="col-span-1  flex items-end justify-center p-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleButtonClick(card)}
                  >
                    Ver más
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

