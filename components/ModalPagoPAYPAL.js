"use client"
import React, { useEffect, useRef, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import Logo from '../public/imgs/logo-gradient.png';
import Image from 'next/image';

export default function ModalPagoPAYPALL(props) {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    props.modalPaypal(false)
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
          className='bg-white rounded-md p-5
          md:w-full md:rounded-none'>

            {/* Logo */}
            <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>

              <Image  src={Logo} className='mb-6' style={{ width: '100px' }} alt="Logo" />

              <p className='text-[18px] text-light font-medium absolute bottom-[-13px] bg-white px-2'>Métodos de pago:</p>
            </div>

            {/* Metodo de pago */}
            <div
            className='w-[750px] max-h-[70vh]  flex justify-center p-3 mt-7
            overflow-y-scroll modal-paypal
            md:w-full md:px-0'>
              
              <div className='w-full m-auto'>
                {
                  <PayPalScriptProvider
                    style={{
                      width: "100%",
                    }}
                    options={{
                        "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                    }}
                    >
                      <PayPalButtons
                      className=''
                          style={{
                              color:"blue",
                              
                          }}
                          createOrder={async()=>{
                            try{
                            const res =  await axios({
                                url:"/api/payment",
                                method: "POST",
                                headers:{
                                  "Content-Type": "application/json"
                                },
                                data: props?.dates
                              })
                              return res.data.id
                            } catch (error){
                              console.log(error)
                            }
                          }} 
                          onCancel={(data) => {
                            console.log("Canceled order:", data);
                            props.onPaymentCancel();
                          }}
                          onApprove={(data, actions)=>{
                            console.log("Data ",data)
                            actions.order.capture().then((response) => {
                            props.onPaymentSuccess(data,response); 
                            closeModal();
                            });
                          }}
                      />
                  </PayPalScriptProvider>
                  ||
                  <p>Loadin...</p>
                }
              </div>
            </div>

          </div>
        </div>
      </>
      }
    </>
  )
}