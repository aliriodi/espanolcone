"use client"
import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'

export default function ModalPago(open) {

  if (!open) return null;


  return (
    <div className=' w-[400px] h-[200px] flex flex-col justify-left items-left ;'>
    {/* <p>precios prueba</p> */}
    <PayPalScriptProvider
    options={{
        "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    }}
    >
        <PayPalButtons
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
                  }
                })
                return res.data.id
              } catch{
                console.log(error)
              }
            }} 
            onCancel={(data) => {
              console.log("Canceled order:", data)
            }}
            onApprove={(data, actions)=>{
              console.log(data)
              actions.order.capture()
            }}
        />
    </PayPalScriptProvider>
    </div>
  )
}