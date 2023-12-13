"use client"
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../public/imgs/logo-gradient.png';
import Image from 'next/image';
import Zelle from '../public/imgs/zelle-logo-0.png';

export default function ModalPagoABLE(props) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    props.modalPay(false)
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
            className='w-[750px] max-h-[70vh] flex-col flex justify-center p-3 mt-7
            overflow-y-scroll modal-paypal'>
                <button
                    type="button"
                    onClick={() => {props.open1(),props.close()}}
                    className='rounded-[5px] text-white px-5 py-2.5 mb-4 w-full text-[21px] italic font-semibold bg-gradient-to-r from-[#253b80] to-[#2997d8]  flex justify-center
                    hover:shadow-[0px_4px_14px_#253b80]'>
                    {/* <Image src={Zelle} alt='zelle' className='w-[60px]'/>  */}
                      PayPal
                      </button>
                    <button
                    type="button"
                    onClick={() => {props.open2(),props.close()}}
                    className='rounded-[5px] text-white px-5 py-2.5 w-full mb-4 text-[16px] font-semibold bg-[#7422e0] flex justify-center
                    hover:shadow-[0px_4px_14px_#7422e0]'>
                      <Image src={Zelle} alt='zelle' className='w-[60px]'/> 
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