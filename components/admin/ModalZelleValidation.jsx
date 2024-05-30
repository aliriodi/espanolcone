"use client"
import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../public/imgs/logo-gradient.png';
import Image from 'next/image';
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ModalPagoABLE({ open, setOpen,InvalidZeller,validZeller,user,setOpenMenu }) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
    setOpenMenu(false)
  }

  useEffect(() => {
    setIsOpen(open)
    
  }, [open])

  return (
    <>

      {isOpen &&
        <>
          <div
            onClick={closeModal}
            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

            <div
              onClick={(e) => {e.stopPropagation()}}
              className='bg-white rounded-md p-5 relative
          md:w-full md:px-0 md:rounded-none'>

              {/* Logo */}
              <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>
                {/* X de cierre */}
                <FontAwesomeIcon
                  onClick={closeModal}
                  icon={faX}
                  className='absolute right-5 top-5 text-violet_dark' />
                <Image src={Logo} className='mb-6' style={{ width: '100px' }} alt="Logo" />

                <p className='text-[18px] text-light font-medium absolute bottom-[-13px] bg-white px-2'>Modal Generico</p>
              </div>

              {/* Metodo de pago */}
              <div
                className='w-[750px] max-h-[70vh] flex-col flex justify-center p-3 mt-7
                overflow-y-scroll modal-paypal
                md:w-full'>
                <img src={
                  user.pendingPayments?.length && user.pendingPayments?.length > 0 ?
                  user.pendingPayments[0]?.image:
                  user.planSync[user.planSync.length-1].image.ImageZelle 
                } alt='pago zelle'/>

                <div className='flex mt-5'>
                  {/* Validar zeller */}
                  <button
                  className=' bg-primary text-white rounded-[7px] text-[18px] py-2 px-6 mr-2'
                  onClick={()=>{validZeller(user);closeModal()}}>
                    Validar Pago
                  </button>

                  {/* Invalidar zeller */}
                  <button
                  className=' border-danger border-2 text-danger rounded-[7px] text-[18px] py-2 px-6'
                  onClick={()=>{InvalidZeller(user);closeModal()}}>
                    Invalidar Pago
                  </button>
                </div>

              </div>

            </div>
          </div>
        </>
      }
    </>
  )
}