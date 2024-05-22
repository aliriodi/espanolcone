import React, { useEffect, useRef, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import Logo from '../../../public/imgs/logo-gradient.png';
import Image from 'next/image';

export default function ModalPayPal({ open, onCloseModal, onCloseAllModal, onPaymentCancel, onPaymentSuccess, date }) {
    const [isOpen, setIsOpen] = useState(false)
  
    const closeModal = () => {
      onCloseModal()
      setIsOpen(false)
    }

    function closeAllModal(){
      onCloseAllModal()
      setIsOpen(false)
    }

    function handlerPaymentCancel(){
    }

    function handlerPaymentSuccess(data){
      onPaymentSuccess({
        ...data,
        type:"PAYPAL"
      })
    }
  
    useEffect(()=>{
      setIsOpen(open)
      console.log("///////////////////// open ",open)
    },[open])
    
  
    return (
      <>
  
        {isOpen &&
        <>
          <div
          onClick={closeAllModal}
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
                        
                        "clientId": "AbiW1YMxkNhMNWVlU-3RYuEgQxuHwzMooeRJxnZg1JQYDO8rQYZBVGdXd4ebKXk9259vRY9949D9abU-" //process.env.PAYPAL_CLIENT_ID,
                        
                      }}
                      >
                        <PayPalButtons
                          style={{
                            color: "blue",
                          }}

                          createOrder={
                            (data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: date?.amount, // El monto de la transacción
                                    currency_code: date?.currency // La moneda de la transacción
                                  },
                                  description: date?.description // Descripción de la compra
                                }
                              ]
                            });
                          }
                          }

                          onApprove={(data, actions) => {
                            handlerPaymentSuccess(data)

                            return actions.order.capture().then(function(details) {
                              // Handle successful capture
                              console.log(details);
                            });
                          }}

                          onCancel={(data) => {
                            // alert("cancelado")
                            // Handle cancellation
                            console.log(data);
                          }}

                          onError={(err) => {
                            alert("ERROR")
                            // Handle errors
                            console.error(err);
                          }}
                          
                        />
                    </PayPalScriptProvider>
                    ||
                    <p>Loading...</p>
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
