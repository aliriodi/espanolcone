import Image from "next/image";
import { StarSVG } from './../public/texts/svgConst';
import Spinner from './Spinner';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsTouristDetail, fetchTouristGuides } from './../redux/ECEActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonHiking } from '@fortawesome/free-solid-svg-icons';



export default function TourCard() {

  const [selectedStars, setSelectedStars] = useState(0);

  const router = useRouter();

  const handleStarClick = (starNumber) => {
    setSelectedStars(starNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTouristGuides())
    dispatch(CardsTouristDetail())

  }, [dispatch]);

  // Obtén la información de cards desde Redux
  const cards = useSelector((state) => state.datos.cardsTourist);

  const handleButtonClick = (card) => {
    dispatch(CardsTouristDetail(card))
    router.push(`/inicio/tourGuides/${card._id}`);
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
     {/* Encabezado */}
    <div
          className='flex justify-center py-[30px] rounded-[8.12px] items-center flex-col w-full mb-[20px]'
          style={{ background: 'linear-gradient(38.12deg, #7834E4 40.17%, #0E98B6 122.83%)' }}>

          {/* Icono */}
          <FontAwesomeIcon
            icon={faPersonHiking}
            className='text-[28px] text-white p-[21px] bg-primary rounded-full mb-[28px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
          />

          <h1 className="text-white text-[28px]
          md:text-[24px]">Turismo en Córdoba</h1>

          {/* Texto */}
          <p className='text-white text-[21px] mt-[21px] text-center md:text-[14px]'>
          Aquí encontrarás información detallada sobre nuestros servicios, perfiles de nuestros guías y testimonios de otros viajeros satisfechos. Tambien podrás reservar tu visita guiada de manera fácil y rápida.
          </p>
          <p className='text-white text-[21px] mt-[21px] text-center md:text-[14px]'>
          ¡Explora la ciudad de una manera única y sumérgete en su rica cultura y belleza natural!
          </p>
      </div>

    {/* Profesores */}
    {cards.length > 0 ? (
      cards.map((card, index) => (
        <>
        <div key={index} className='w-full flex p-[18px] bg-white rounded-[5px] shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] mb-[24px]'>
          
          {/* Imagen de perfil */}
          <div className='flex flex-col items-center w-auto'>

            {/* Imagen */}
            <Image
              alt="photo"
              width={160}
              height={160}
              src={ card ?  // ¿Existe la variable 'card'?
              card.image ?  // ¿Existe la propiedad 'image' en 'card'?
                card.image.url ? card.image.url : card.image // ¿Existe la propiedad 'url' en 'card.image'? Si es cierto, usa 'card.image.url'; de lo contrario, usa 'card.image'.
              : card.image // Si no existe 'card.image', usa 'card.image'.
            : null}
              className="w-[134px] h-[126px] rounded-lg object-cover mb-5"
            />

            {/* Estrellas */}
            <div className="flex items-center space-x-1 text-success">
              {renderStars()}
            </div>
          </div>

          {/* Contenido */}
          <div className='relative ml-[20px] w-[100%] flex flex-col  justify-between'>

            {/* Nombre */}
            <p className='text-title_color font-semibold text-[21px]'>{card.namePerson}</p>
            
            {/* Descripcion */}
            <p className='text-violet_dark'>{card.content}</p>

            {/* Boton */}
            <div className='w-full flex justify-end'>
              <button
                  className=" py-[10px] px-[48px] btn-primary"
                  onClick={() => handleButtonClick(card)}>
                  Ver más
              </button>
            </div>
          </div>

        </div>
        </>
      ))
    ) : (
      <Spinner />
    )}
  </>
  );
}
