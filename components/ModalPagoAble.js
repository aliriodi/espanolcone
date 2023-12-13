"use client"
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../public/imgs/logo-gradient.png';
import Image from 'next/image';

export default function ModalPagoABLE(props) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    
    setIsOpen(false)
  }

  useEffect(()=>{
    setIsOpen(props.open)
  },[props.open])

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
                <button
                    type="button"
                    onClick={() => {props.open1(),props.close()}}
                    className='btn-primary px-5 py-2.5 mb-2 w-full text-[16px]'>
                      Paypal
                      </button>
                      <button
                    type="button"
                    onClick={() => {props.open2(),props.close()}}
                    className='btn-primary px-5 py-2.5 mb-2 w-full text-[16px]'>
                      Zelle
                      </button>
              <div className='w-full m-auto'>
              </div>
            </div>

          </div>
        </div>
      </>
      }
    </>
  )
}