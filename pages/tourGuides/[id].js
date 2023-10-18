import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cardsTouristDetail } from './../../redux/ECEActions';
import Image from 'next/image';

export default function TeacherDetailPage() {


  const cardDetail = useSelector((state) => state.datos.cardsTouristDetaill);
  const [isCardAvailable, setIsCardAvailable] = useState(false);

  useEffect(() => {
    if (cardDetail) {
      setIsCardAvailable(true);
    }
  }, [cardDetail]);

  if (!isCardAvailable) {
    return <div>Cargando...</div>;
  }
  // pueba
  return (
    <>
      <div>hols</div>
      <div>{cardDetail.name}</div>
      <Image
        alt="photo"
        width={160}
        height={160}
        src={cardDetail.image}
        // style={{ zIndex: -1 }}
        className="w-[30%] rounded-full object-cover mr-4 drop-shadow-[2px_3px_2px_rgba(255,255,255,.4)] dark:drop-shadow-[2px_3px_2px_rgba(0,0,0,.4)]"
      />
    </>
  );
}
