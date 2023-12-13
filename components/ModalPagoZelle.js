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
          { idUser: props.renders.user._id,
            idPlan:'plansync',
            qty: props.dates.qty,
            ammount: props.dates.cost,
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
          className='bg-white rounded-md p-5'>

            {/* Logo */}
            <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>

              <Image  src={Logo} className='mb-6' style={{ width: '100px' }} alt="Logo" />

              <p className='text-[18px] text-light font-medium absolute bottom-[-13px] bg-white px-2'>Métodos de pago:</p>
            </div>

            {/* Metodo de pago */}
            <div
            className='w-[750px] max-h-[70vh]  flex justify-center p-3 mt-7
            overflow-y-scroll modal-paypal'>
              
              <div className='w-full m-auto'>
              <Image  src={Zelle} className='mb-6' style={{ width: '100px' }} alt="Zelle" />
               {/* <p>{'Cantidad de clases:'+ qty}</p> */}
               <p>{'Cantidad de clases:'+ props?.dates?.qty}</p>
               {/* <p>{'Monto a transferir:'+ammount}</p> */}
               <p>{'Monto a transferir:'+props?.dates?.cost}</p>
               <span>Cuenta Zelle: <strong>aliriodi@gmail.com</strong></span>
               <Cloudinary imageurl={imageurl}/>

               {/* aca deberia ser que se esclarezca el estilo mientras no haya imagen cargada */}

               {ImageUrl &&<button className='btn-primary px-5 py-2.5 mb-2  text-[16px]' onClick={()=>sendBD()}>Enviar pago</button>}
              </div>
            </div>

          </div>
        </div>
      </>
      }
    </>
  )
}