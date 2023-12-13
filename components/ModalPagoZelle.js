"use client"
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Logo from '../public/imgs/logo-gradient.png';
import Zelle from '../public/imgs/zelle-logo-0.png';
import Image from 'next/image';
import Cloudinary from './cloudinary/cloudinary';

export default function ModalPagoZELLE(props) {
  const [isOpen, setIsOpen] = useState(true)
  // const [isOpen, setIsOpen] = useState(props.open)
  const [ImageUrl, setImageurl] = useState(false)
  console.log('13 zelle modal de pagos')
console.log(props.dates)
//const qty =props.dates.qty;
//const ammount =props.dates.cost;

  const closeModal = () => {
    props.modalZelle(false)
    setIsOpen(false)
  }

  useEffect(()=>{
    setIsOpen(props.open)
    //setIsOpen(true)
  },[props.open])
  
  useEffect(()=>{
   
    if(ImageUrl){
     
      console.log(ImageUrl)
        //envio recibo a BD
            }

  },[ImageUrl])

//Paso por props a componente cloudinary para que me devuelva la imagen cargada  
  function imageurl(url){
    setImageurl({ImageZelle:url})    
  }

//Envio a BD el pago reportado
  async function  sendBD (){
    try{
      fetch('/api/receipt/add',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { idUser: 'props.renders.user._id',
            idPlan:'plansync',
            qty: qty,
            ammount: ammount,
            dates:{ImageUrl,type:'ZELLE'}}
        ),
      }).then(response => {
        alert('Su pago esta siendo procesado y analizado en un tiempo máximo de 4 horas su clase debe ser asiganda')
       console.log("Clase asignado ",response.json())
        
      })
        
      }catch (error) {
      
        
        console.error(error);
      }

  }

  return (
    <>

      {isOpen &&
      <>
        <div
        onClick={closeModal}
        className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

          <div
          onClick={(e)=>e.stopPropagation()}
          className='bg-white rounded-md'>

            {/* Logo */}
            {/* <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>

              <Image  src={Logo} className='mb-6' style={{ width: '100px' }} alt="Logo" />

              <p className='text-[18px] text-light font-medium absolute bottom-[-13px] bg-white px-2'>Métodos de pago:</p>
            </div> */}

            {/* Metodo de pago */}
            <div
            className='w-[750px] max-h-[70vh]  flex justify-center
            overflow-y-auto'>
              
              <div className='w-full m-auto'>
                {/* Zelle Logo */}
                <div className='bg-[#7422e0] py-3 px-6 mb-5 rounded-[5px_5px_0_0]'>
                  <Image  src={Zelle} className='' style={{ width: '100px' }} alt="Zelle" />
                </div>

                <div className='p-5 '>

                  {/* Cantidad de clases */}
                  <div className='flex justify-between text-violet_dark border-b-2 py-2'>
                    <p>Cantidad de clases:</p>
                    <b>{props?.dates?.qty}</b>
                  </div>

                  {/* Monto a Transferir */}
                  <div className='flex justify-between text-violet_dark border-b-2 py-2'>
                    <p>Monto a transferir:</p>
                    <b>{props?.dates?.ammount} USD</b>
                  </div>

                  {/* Cuenta Zelle */}
                  <div className='mt-2 flex justify-between text-violet_dark border-b-2 py-2'>
                    <p>Cuenta Zelle:</p>
                    <b>aliriodi@gmail.com</b>
                  </div>

                  {/* Carga de comprobante */}
                  <div className="my-5 border-2 border-gray_clear rounded-[5px]">

                    <b className='w-full bg-gray_clear flex p-2 text-violet_dark'>Cargue una imagen de su comprobante</b>

                    <div className='p-4'>
                      <Cloudinary imageurl={imageurl}/>
                    </div>

                  </div>

                  {/* aca deberia ser que se esclarezca el estilo mientras no haya imagen cargada */}

                  {ImageUrl &&<button className='btn-success px-5 py-2.5 mt-3 w-full  text-[16px]' onClick={()=>sendBD()}>Enviar pago</button>}
                </div>

              </div>
            </div>

          </div>
        </div>
      </>
      }
    </>
  )
}