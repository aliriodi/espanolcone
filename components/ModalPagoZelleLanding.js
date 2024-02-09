"use client"
import React, { useEffect, Fragment, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import { useSession } from "next-auth/react"
import { useTranslation } from 'next-i18next';
import Logo from '../public/imgs/logo-gradient.png';
import Zelle from '../public/imgs/zelle-logo-0.png';
import Image from 'next/image';
import Cloudinary from './cloudinary/cloudinary';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isAfter,
  isBefore,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ModalPagoZELLE(props) {
  const { t } = useTranslation(['index','register'])
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status, update } = useSession();
  let today = startOfToday()
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(props.open)
  const [ImageUrl, setImageurl] = useState(false)
  console.log('13 zelle modal de pagos')
  console.log(props.dates)
  //const qty =props.dates.qty;
  //const ammount =props.dates.cost;

  const closeModal = () => {
    props?.modalClose(false)

    setIsOpen(false)
  }

  useEffect(() => {
    //console.log("/////// props ///////",props.open)
    setIsOpen(props.open)
  }, [props])

  useEffect(() => {
    if (ImageUrl) {

      console.log(ImageUrl)
      //envio recibo a BD
    }

  }, [ImageUrl])

  //Paso por props a componente cloudinary para que me devuelva la imagen cargada  
  function imageurl(url) {
    setImageurl({ ImageZelle: url })
  }

  //Envio a BD el pago reportado
  async function sendBD() {
    try {
      fetch('/api/receipt/add',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              idUser: props.User._id,
              idPlan: 'plansync',
              qty: props.dates.qty,
              ammount: props.dates.cost,
              dates: { ImageUrl, type: 'ZELLE', valid: false }
            }
          ),
        }).then(response => {
          alert('Su pago esta siendo procesado y analizado en un tiempo máximo de 4 horas su clase debe ser asiganda')
          closeModal()

        })

    } catch (error) {
      console.error(error);
    }

  }

  //si el pago es ok envio a la BD el pago
  async function PAYOK() {
    console.log(props.User)
    //alert('265 entre en payok()')
    try {
      fetch('/api/users/update',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              email: props.User.email,
              updates: {
                planSync: [...props.User.planSync,
                {
                  type: 'plansync',
                  payment: 'ZELLE',
                  valid: false,
                  qty: props.dates.qty,
                  cost: props.dates.cost,
                  planing: 0,
                  classview: 0,
                  image: ImageUrl
                }
                ]
              }
            }
          ),
        })

        .then(response => {
          closeModal()
          // setPaypalDates(null)
          //   console.log("Clase asignado ",response.json())    
        })

    } catch (error) {
      //  setPaypalDates(null)

      console.error(error);
    }



  }

  //si el pago es no OK
  function PAYNOK() {
    alert('Su pago no ha sido procesado intente nuevamente')
    //setPaypalDates(null)
  }




  return (
    <>

      {isOpen &&
        <>
          <div
            onClick={closeModal}
            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

            <div
              onClick={(e) => e.stopPropagation()}
              className='bg-white rounded-md relative
          md:w-full md:rounded-none'>

              {/* Boton para cerrar modal */}
              {/* <FontAwesomeIcon
            onClick={closeModal}
            icon={faX}
            className='absolute right-5 top-5 text-white z-[999] '
            size='sm'
          /> */}

              {/* Metodo de pago */}
              <div
                className='w-[750px] max-h-[70vh]  flex justify-center
            overflow-y-auto
            md:w-full md:max-h-screen'>

                <div className='w-full m-auto'>
                  {/* Zelle Logo */}
                  <div className='bg-[#7422e0] py-3 px-6 mb-5 rounded-[5px_5px_0_0]
                md:rounded-none'>
                    <Image src={Zelle} className='' style={{ width: '100px' }} alt="Zelle" />
                  </div>

                  <div className='p-5 '>

                    {/* Cantidad de clases */}
                    <div className='flex justify-between text-violet_dark border-b-2 py-2'>
                      {/* Cantidad de Clases */}
                      <p>{t('quantityt')}:</p>
                      <b>{props?.dates?.qty}</b>
                    </div>

                    {/* Monto a Transferir */}
                    <div className='flex justify-between text-violet_dark border-b-2 py-2'>
                      <p>{t('ammount')}:</p>
                      <b>{props?.dates?.cost} USD</b>
                    </div>

                    {/* Cuenta Zelle */}
                    <div className='mt-2 flex justify-between text-violet_dark border-b-2 py-2'>
                      <p>{t('accountzelle')} </p>
                      <b>aliriodi@gmail.com</b>
                    </div>

                    {/* Carga de comprobante */}
                    <div className="my-5 border-2 border-gray_clear rounded-[5px]">

                      <b className='w-full bg-gray_clear flex p-2 text-violet_dark'>
                        {t('loadimage')} </b>

                      <div className='p-4'>
                        <Cloudinary imageurl={imageurl} />
                      </div>

                    </div>

                    {/* aca deberia ser que se esclarezca el estilo mientras no haya imagen cargada */}

                    {/* Enviar Pago */}
                    {ImageUrl && <button className='btn-success px-5 py-2.5 mt-3 w-full  text-[16px]' onClick={() => { sendBD(); PAYOK(); }}>
                      {t('sendpay')}</button>}

                    {!ImageUrl && <button className={`btn-success px-5 py-2.5 mt-3 w-full text-[16px] l opacity-[50%] pointer-events-none`} onClick={() => alert('falta imagen de pago')}>
                      {t('sendpay')}
                    </button>}


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