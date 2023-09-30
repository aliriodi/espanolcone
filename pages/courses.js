import React, { useState } from 'react';
import Menu from '../components/Menu'
import Link from 'next/link'
import { faAngleLeft, faAngleRight, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Class from '../components/Class/Class'


export default function Courses() {
  const [mostrarComponenteA, setMostrarComponenteA] = useState(false)
  const toggleComponenteA = () => {
    setMostrarComponenteA(!mostrarComponenteA);
    setMostrarComponenteB(false);
    setMostrarComponenteC(false);
  };
  const [mostrarComponenteB, setMostrarComponenteB] = useState(false)
  const toggleComponenteB = () => {
    setMostrarComponenteB(!mostrarComponenteB);
    setMostrarComponenteA(false);
    setMostrarComponenteC(false);
  };
  const [mostrarComponenteC, setMostrarComponenteC] = useState(false)
  const toggleComponenteC = () => {
    setMostrarComponenteC(!mostrarComponenteC);
    setMostrarComponenteB(false);
    setMostrarComponenteA(false);
  };


  return (
    <>
      <Menu />

      <div className='ml-[80px]'>
        **hacer esto al menu desplegable

        {/* <a onClick={(e) => { e.preventDefault(); showHideClass(); }}>Curso */}
        <div onClick={toggleComponenteA}
          className="flex items-center justify-start mb-5 self-center ">
          <FontAwesomeIcon icon={faChalkboardUser} className="mr-[10px]" />
          <i class="fa-duotone "></i>
          <p>clase 1</p>


        </div>
        <div>  {mostrarComponenteA && <Class id={0} />}</div>


        <div
          onClick={toggleComponenteB}
          className="flex items-center justify-start mb-5 self-center ">
          <FontAwesomeIcon icon={faChalkboardUser} className="mr-[10px]" />
          <i class="fa-duotone "></i>
          <p>clase2</p>
        </div>
        {mostrarComponenteB && <Class id={1} />}



        <div
          onClick={toggleComponenteC}
          className="flex items-center justify-start mb-5 self-center ">
          <FontAwesomeIcon icon={faChalkboardUser} className="mr-[10px]" />
          <i class="fa-duotone "></i>
          <p>clase 3</p>

        </div>
        {mostrarComponenteC && <Class id={2} />}

      </div>
    </>
  )
}


