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
  const [loading, setLoading] = useState(false)

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
    //Envio reporte a GoogleADS
  //  gtag_report_conversion('espanolcone.com')

    setLoading(true)
    
    let finalUser;

    let temporalPassword = props.generarPassword()
    
    // Genera el mensage dependiendo del plan
    let emailMessage = {
      to: props?.email,
      subject: props.labelLanguage == "Es" ?
      "¡Bienvenido/a! Detalles de tu compra y más" : // Asunto en Español
      "Welcome! Details of your purchase and more", // Asunto en Ingles
      content:`
      ${props?.dates?.descripion == "1claseIndividual 1masterclass 1claseengrupo 3unidadesporNivel" ? 
      
        // Mensage de Plan "Experiencia completa"
        props.labelLanguage == "Es" ?

          // En Español
          `<p><b>¡Hola ${props.nombre}!</b></p>

          <p><b>¡Bienvenido a Español con E!</b> Estamos encantados de tenerte como parte de nuestra comunidad de aprendizaje de español. Queremos que sepas que estamos aquí para apoyarte en cada paso de tu viaje lingüístico.</p>

          <p>Nos alegra mucho tenerte con nosotros y queremos expresarte nuestro agradecimiento por haber elegido nuestro paquete <b>"Aprende y Disfruta".</b></p>
          <p>Aquí te detallamos lo que has adquirido con tu compra:</p>

          <p><b>Paquete Especial "Aprende y Disfruta" valorado en $100 ¡por solo $25 dólares!</b>,  valido hasta el 23 de abril del 2024.</p>

          <p><b>1. Clase individual personalizada:</b> Una sesión de 60 minutos, adaptable a tus necesidades. </p>
          
          <p><b>2. Clase magistral:</b> Únete a nuestra clase especial por Zoom el viernes 22 de marzo a las 17 horas (hora de Argentina). Te sumergirás en temas fascinantes para estudiantes de español de todos los niveles. Desde los sonidos del español hasta consejos de motivación, ¡tenemos mucho por explorar!</p>

          <p><b>3. Clase en grupo:</b> Será una clase de 90 minutos. Se ofrecerán varias sesiones de diferentes temas y niveles. Podrás elegir la que mejor se adapte a tus intereses y disponibilidad. La lista completa de clases y horarios te la enviaremos por correo electrónico pronto.</p>

          <p>Además, queremos que sepas que en nuestra plataforma encontrarás dos unidades didácticas interactivas y explicativas para los niveles A1, A2 y B1 y que continuaremos añadiendo contenido el cual podrás disfrutar durante el tiempo promocional.  Estamos comprometidos a brindarte contenido de calidad que te ayude a avanzar en tu aprendizaje del español.</p>`
          :
          // En Ingles
          `
          <p><b>Hello ${props.nombre}!</b></p>

          <p>We are thrilled to have you with us and want to express our gratitude for choosing our <b>"Aprende y Disfruta"</b> package.</p>

          <p>Here are the details of what you've acquired with your purchase:</p>

          <p><b>Special "Aprende y Disfruta" Package valued at $100 for only $25</b>, valid until April 23, 2024.</p>

          <p><b>Personalized Individual Class:</b> A 60-minute session, tailored to your needs.</p>

          <p><b>Master Class:</b> Join our special Zoom class on Friday, March 22, at 5:00 PM (Argentina time). You'll delve into fascinating topics for Spanish learners of all levels. From Spanish sounds to motivational tips, we have a lot to explore!</p>

          <p><b>Group Class:</b> It will be a 90-minute class. Several sessions on different topics and levels will be offered. You'll be able to choose the one that best suits your interests and availability. The complete list of classes and schedules will be sent to you via email soon.</p>

          <p>Additionally, we want you to know that on our platform, you'll find two interactive and explanatory didactic units for levels A1, A2, and B1, and we will continue adding content that you can enjoy during the promotional period. We are committed to providing you with quality content that helps you advance in your Spanish learning journey.</p>

          `
      :

      // Mensage de Plan "Echa un vistazo"
      props.labelLanguage == "Es" ?

          // En Español
          `<p><b>¡Hola ${props.nombre}!</b></p>

          <p>Nos alegra mucho tenerte con nosotros y queremos expresarte nuestro agradecimiento por haber elegido nuestro paquete <b>"Echa un vistazo".</b></p>

          <p>Aquí te detallamos todo lo que has adquirido con tu compra:</p>

          <p><b>Paquete Especial "Echa un vistazo" valorado en $45 ¡por solo $10 dólares!</b> valido hasta el 23 de abril del 2024.</p>

          <p><b>1. Clase Magistral:</b> Únete a nuestra clase especial por Zoom el viernes 22 de marzo a las 17 horas (hora de Argentina). Te sumergirás en temas fascinantes para estudiantes de español de todos los niveles. Desde los sonidos del español hasta consejos de motivación, ¡tenemos mucho por explorar!</p>

          <p><b>2. Clases interactivas en la app:</b> En nuestra plataforma encontrarás dos unidades didácticas interactivas y explicativas para los niveles A1, A2 y B1 y que continuaremos añadiendo contenido el cual podrás disfrutar durante el tiempo promocional. Estamos comprometidos a brindarte contenido de calidad que te ayude a avanzar en tu aprendizaje del español.</p>
          `
          :

          // En Ingles
          `
            <p><b>Hello ${props.nombre}!</b></p>

            <p>We are delighted to have you with us and want to express our gratitude for choosing our <b>"Echa un vistazo"</b> package.</p>

            <p>Here are all the details of what you've acquired with your purchase:</p>

            <p>Special <b>"Echa un vistazo" Package valued at $45 for only $10</b>, valid until April 23, 2024.</p>

            <p><b>Master Class:</b> Join our special Zoom class on Friday, March 22, at 5:00 PM (Argentina time). You'll delve into fascinating topics for Spanish learners of all levels. From Spanish sounds to motivational tips, we have a lot to explore!</p>

            <p><b>Interactive Classes in the app<b>: On our platform, you'll find two interactive and explanatory didactic units for levels A1, A2, and B1, and we will continue adding content that you can enjoy during the promotional period. We are committed to providing you with quality content that helps you advance in your Spanish learning journey.</p>
            `
      }
      `
    }

    // Obtiene el usuario final en caso de haberlo
    try {
      await fetch('/api/users/getUserEmail/' + props?.email,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      .then(response => response.json())
      .then(response =>{

        if(response?.results) finalUser = response?.results;         
        // setUser(response)


      })
    }
    catch (error){
      console.log('Ofrece.jsx', error)
    }

    // En caso de ser un nuevo usuario
    if (!finalUser) {
      
      try {
          await axios.post('/api/auth/signup',
          {
            first_name: props?.nombre,
            // last_name: ,
            country: "",
            email: props?.email,
            password: temporalPassword,
            confirm_password: temporalPassword,
            roles: ['student', 'user'],
            planSync: [
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
        ).then(response => {

          finalUser = response

          // Se asigna la parte final para el mensaje por email
          // let finalMessage =
          emailMessage.content = emailMessage.content +  (props.labelLanguage == "Es" ?

          // En Español
          `
          <p>
          Como eres un nuevo usuario, se ha creado una cuenta para ti dentro de nuestra plataforma con la siguiente clave temporal: <b>${temporalPassword}</b>
          Te sugerimos cambiar tu clave y por favor, no dudes en ponerte en contacto con nosotros si tienes alguna pregunta o necesitas ayuda con algo. Estamos aquí para ayudarte en cada paso del camino.
          </p>

          <p>¡Gracias nuevamente por elegirnos como tu compañero de aprendizaje!<p>

          <p>¡Saludos!</p>

          <p><b>Equipo de Español con E</b></p>
          `
          :

          // En Ingles
          `
          <p>As you are a new user, an account has been created for you within our platform with the following temporary password: <b>${temporalPassword}</b>. We suggest changing your password, and please don't hesitate to contact us if you have any questions or need assistance with anything. We are here to help you every step of the way.</p>

          <p>Thank you again for choosing us as your learning partner!</p>

          <p>Greetings!</p>

          <p><b>Equipo de Español con E</b></p>

          `);

          props?.newUserAlertOpen()
        });

      }
      catch (error) {
        console.error(error);
      }
    }

    // // En caso de NO ser un nuevo usuario
    else {

      try {
        await fetch('/api/users/update',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
                email: props?.email,
                updates: {

                  planSync: [...finalUser.planSync,
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
            
            emailMessage.content = emailMessage.content + (props.labelLanguage == "Es" ?
            // En Español
            `
            <p>¡Gracias nuevamente por elegirnos como tu compañero de aprendizaje!<p>

            <p>¡Saludos!</p>

            <p><b>Equipo de Español con E</b></p>
            `
            :
            // En Ingles
            `
            <p>Please don't hesitate to contact us if you have any questions or need assistance with anything. We are here to help you every step of the way.</p>

            <p>Thank you again for joining us and being part of this journey!</p>

            <p>Greetings!</p>

            <p>Equipo de Español con E</p>

            `);
          })

      }
      catch (error) {
        console.error(error);
      }
    }

    console.log("finalUser ",finalUser)
    
    /////////// Envio de Email /////////////
    await axios.post('/api/mail/template/1', emailMessage)

    ///////////// Envio de Resivo /////////////
    try {
      fetch('/api/receipt/add',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              idUser: finalUser._id,
              idPlan: 'plansync',
              qty: props.dates.qty,
              ammount: props.dates.cost,
              dates: { ImageUrl, type: 'ZELLE', valid: false }
            }
          ),
        }).then(response => {
          props?.buyAlertOpen()
          // alert('Su pago esta siendo procesado y analizado en un tiempo máximo de 4 horas su clase debe ser asiganda')
          setLoading(false)
          closeModal()

        })

    } catch (error) {
      setLoading(false)
      console.error(error);
    }
    

    ////////////////////////////////////////
    // try {
    //   fetch('/api/users/update',
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(
    //         {
    //           email: props.User.email,
    //           updates: {
    //             planSync: [...props.User.planSync,
    //             {
    //               type: 'plansync',
    //               payment: 'ZELLE',
    //               valid: false,
    //               qty: props.dates.qty,
    //               cost: props.dates.cost,
    //               planing: 0,
    //               classview: 0,
    //               image: ImageUrl
    //             }
    //             ]
    //           }
    //         }
    //       ),
    //     })
    //     .then(response => {
    //       closeModal() 
    //     })
    // }
    // catch (error) {
    //   console.error(error);
    // }
  }

  //si el pago es no OK
  function PAYNOK() {
    alert('Su pago no ha sido procesado intente nuevamente')
    //setPaypalDates(null)
    gtag_report_conversion('espanolcone.com')
  }

  
  
  function gtag_report_conversion(url) {
    var callback = function () {
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-11324663584/TbkiCOj3iZYZEKDOgpgq',
        'value': 25.0,
        'currency': 'USD',
        'transaction_id': '',
        'event_callback': callback
    });
    return false;
  }
  
  


  return (
    <>

      {isOpen &&
        <>
          <div
            onClick={closeModal}
            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]'>

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
                    {
                    ImageUrl &&
                    <button className='btn-success px-5 py-2.5 mt-3 w-full  text-[16px]' onClick={() => { PAYOK(); }}>
                      {
                        loading ?
                        <div
                        className="inline-block  h-4 w-4 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                        ></div>
                        :
                        t('sendpay')
                      }
                    </button>
                    }

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