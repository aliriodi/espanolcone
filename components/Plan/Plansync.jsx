import React, { useState } from 'react';
import style from '../../styles/plan.module.css'
import Image from 'next/image'
import Logo from '../../public/imgs/logo-gradient.png';
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
const plan = require('./planes.json');

export default function Plansync({ Confirm, closePlan}) {
  const [valorInput, setValorInput] = useState(4);
  const { data: session, status, update } = useSession();
  const plan1 = [];
  const numberPlans = Object.keys(plan).length;
  Object.keys(plan).map((planX) =>
    plan[planX].type.includes('Sinc') ? plan1.push(plan[planX]) : null
  );
  function validarEntrada(event) {
    // console.log(typeof(event.target.value))
    // console.log(typeof(parseInt(event.target.value, 10)))    
    // console.log(parseInt(event.target.value, 10))
    // console.log(isNaN(parseInt(event.target.value, 10)))
    if(isNaN(parseInt(event, 10))){setValorInput(parseInt(4,10))}
    else(setValorInput(parseInt(event,10)))
  }
  function aumentarClases(){
    validarEntrada(valorInput + 1)
  }
  function restarClases(){
    validarEntrada(valorInput - 1 >= 4 ? valorInput - 1 : 4)
  }

  return (

    <div
    className="fixed bg-[#0009] w-screen h-screen top-0 left-0 flex justify-center items-center z-[900] overflow-hidden
    md:px-[25px]"
    onClick={closePlan}>
      <div
      onClick={(e)=>e.stopPropagation()}
      className='bg-white rounded-[5px] flex p-3 flex-col relative overflow-auto
      md:max-h-[90vh]'>
        
        <FontAwesomeIcon
        onClick={closePlan}
        icon={faX}
        className='absolute right-5 top-5 text-violet_dark'/>

        {/* Titulo */}
        <div className='flex items-center mb-[30px] flex-col'>
          <Image src={Logo} className='w-[123px] h-[78px]'/>
           <h3 className=' font-medium text-[28px] bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text min-h-[28px] text-center'>Elige algunas de nuestras opciones</h3>
        </div>

        {/* Planes */}
        <div className="flex py-4
        md:flex-col">
          {/* Una Clase */}
          <div className='flex flex-col px-4 w-[400px] border-r-2 justify-between
          md:w-full md:py-10 md:border-b-2 md:border-r-0'>

            {/* Titulo */}
            <div className='w-full text-center'>
              {/* Precio */}
              <p
              className='text-[49px] text-primary font-medium'>
                <b>{plan1[0].ammountUnit}$usd</b> 
              </p>
              {/* Descripcion */}
              <p className=' text-violet_dark text-[16px]'>
                Solo <b>1</b> clase
              </p>
            </div>

            {/* Contenido */}
            <div className='py-4 flex flex-col justify-end h-full items-center'>
              {/* <p
              className=' text-violet_dark '>
                Solo <b>1</b> clase
              </p> */}
              
              <p
              className=' text-violet_dark '>
                Monto total: <b>{plan1[0].ammountUnit}$usd</b>
              </p>
            </div>

            <button onClick={()=>{Confirm({qty:1,cost:plan1[0].ammountUnit});closePlan()}} className="bg-secondary p-2 rounded-[5px] text-white">Obtener</button>
          </div>

          {/* Varias Clases */}
          <div className='flex flex-col px-4 w-[400px] justify-between
          md:w-full md:py-10'>

            {/* Titulo */}
            <div className='w-full text-center'>
              {/* Precio */}
              <p
              className='text-[49px] text-primary font-medium'>
                <b>{plan1[1].ammountUnit}$usd</b>
              </p>
              {/* Descripcion */}
              <p className=' text-violet_dark text-[16px]'>
                A partir de <b>4</b> clases
              </p>
            </div>


            {/* Contenido */}
            <div className='py-4 flex flex-col justify-between h-full items-center'>  
              {/* <p
              className=' text-violet_dark '>
                A partir de <b>4</b> clases <b>{plan1[1].ammountUnit}$usd</b>
              </p> */}
              
              <div className='flex my-7'>
                <p className=' text-violet_dark mr-3'>Cantidad de clases:</p>

                {/* Cantidad de clases */}
                <div className='flex'>
                  {/* Boton para restar clases */}
                  <button 
                  className='bg-primary w-[25px] h-[25px] text-white rounded-[5px]'
                  onClick={restarClases}>-</button>

                  {/* Cantidad de clases */}
                  <b className='mx-3 text-violet_dark'>{valorInput}</b>

                  {/* Boton para aumentar clases */}
                  <button 
                  className='bg-primary w-[25px] h-[25px] text-white rounded-[5px]'
                  onClick={aumentarClases}>+</button>
                </div>
              </div>

              <p
              className=' text-violet_dark '>
                Monto total: <b>{plan1[1].ammountUnit*valorInput}$usd</b>
              </p>
            </div>

            <button onClick={()=>{Confirm({qty:valorInput,cost:plan1[1].ammountUnit*valorInput});closePlan()}} className="bg-secondary p-2 rounded-[5px] text-white">Obtener</button>
          </div>
        </div>

      </div>
      
   
    </div>
  );
}
