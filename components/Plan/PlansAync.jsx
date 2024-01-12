import React, { useState } from 'react';
import style from '../../styles/plan.module.css'
import Image from 'next/image'
import Logo from '../../public/imgs/logo-gradient.png';
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
const plan = require('./planes.json');

export default function Plansync({ Confirm, closePlan }) {
  const [valorInput, setValorInput] = useState(4);
  const { data: session, status, update } = useSession();
  const plan1 = [];
  const numberPlans = Object.keys(plan).length;
  Object.keys(plan).map((planX) =>
    plan[planX].type.includes('Sinc') ? plan1.push(plan[planX]) : null
  );


  return (

    <div
      className="fixed bg-[#0009] w-screen h-screen top-0 left-0 flex justify-center items-center z-[900] overflow-hidden
    md:px-[25px]"
      onClick={() => closePlan(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-[5px] flex p-3 flex-col relative overflow-auto
      md:max-h-[90vh]'>

        {/* <FontAwesomeIcon
        onClick={closePlan}
        icon={faX}
        className='absolute right-5 top-5 text-violet_dark'/> */}

        {/* Titulo */}
        <div className='flex items-center mb-[30px] flex-col'>
          <Image src={Logo} alt={'Logo'} className='w-[123px] h-[78px] ' />
          <div className='relative top-5'>
            <h3 className=' font-medium text-[28px] bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text min-h-[28px] text-center'>
              Elige algunas de nuestras opciones promocionales</h3></div>
        </div>

        {/* Planes */}
        <div className="flex py-4
        md:flex-col">
          {/* Una Clase */}
          <div className='flex flex-col px-4 w-[400px] border-r-2 justify-between
          md:w-full md:py-10 md:border-b-2 md:border-r-0'>

            {/* Titulo */}
            <div className='w-full'>
              {/* Precio */}
              <p
                className='text-[49px] text-primary font-medium text-center'>
                <b>{25}$usd</b>
              </p>
              {/* Descripcion */}

              <p className=' text-violet_dark text-[16px]'>
                * <b>1</b> Clase individual personalizada.</p>
              <p className=' text-violet_dark text-[16px]'>
                * <b>1</b> <span className="italic">Master Class.</span> </p>
              <p className=' text-violet_dark text-[16px]'>
                * <b>1</b> Clase grupal.</p>
              <p className=' text-violet_dark text-[16px]'>
                * Acceso por <b>1 mes</b> a todo el contenido de la plataforma. </p>
              <p className='text-center'><b>Promoción valida hasta el 15 de febrero de 2024</b></p>
            </div>

            {/* Contenido */}
            <div className='py-4 flex flex-col justify-end h-full items-center'>
              {/* <p
              className=' text-violet_dark '>
                Solo <b>1</b> clase
              </p> */}

              <p
                className=' text-violet_dark '>
                Monto total: <b>{25}$usd</b>
              </p>
            </div>

            <button onClick={() => { Confirm({ qty: 1, cost: plan1[0].ammountUnit }); closePlan() }} className="bg-secondary p-2 rounded-[5px] text-white">Obtener</button>
          </div>


          {/* Combo de Clase 10 */}

          <div className='flex flex-col px-4 w-[400px] border-r-2 justify-between
          md:w-full md:py-10 md:border-b-2 md:border-r-0'>

            {/* Titulo */}
            <div className='w-full '>
              {/* Precio */}
              <p
                className='text-[49px] text-primary font-medium text-center'>
                <b>{plan1[2].ammountUnit}$usd</b>
              </p>
              {/* Descripcion */}
              <div className='relative top-4'>
                <p className='text-violet_dark text-[16px]'>
                * Acceso por <b>1 mes</b> a todo el contenido de la plataforma. </p>
                <p className='text-violet_dark text-[16px]'>
                * <b>1</b> <span className="italic">Master Class.</span> </p>
              </div>
            </div>
            {/* Contenido */}
            <div className='py-4 flex flex-col justify-end h-full items-center'>

              <p
                className=' text-violet_dark '>
                Monto total: <b>{10}$usd</b>
              </p>
            </div>

            <button onClick={() => { Confirm({ qty: plan1[2].qty, cost: plan1[2].qty * plan1[2].ammountUnit }); closePlan() }} className="bg-secondary p-2 rounded-[5px] text-white">Obtener</button>
          </div>

        </div>

      </div>


    </div>
  );
}
