import React, { useState, useEffect } from 'react';

export default function TeacherDetailPage({ card }) {

  const [isCardAvailable, setIsCardAvailable] = useState(false);

  useEffect(() => {
    if (card) {
      setIsCardAvailable(true);
    }
  }, [card]);

  if (!isCardAvailable) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div>hols</div>
      <div>{card.name}</div>
    </>
  );
}
