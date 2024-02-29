import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ModalListTourist from './ModalListTourist';
import ModalPagoLanding from './ModalPagoLanding';
import ModalPagoABLE from '../ModalPagoAbleLanding';
import ModalPago from '../ModalPagoPAYPALLanding';
import ModalPago2 from '../ModalPagoZelleLanding';
import axios from 'axios';
import AlertContainer from '../GenericsElements/Alerts/AlertContainer';
import Alert from '../GenericsElements/Alerts/Alert';
import Link from 'next/link';

export default function Ofrece() {
  let [List, setList] = useState(false)
  let [Offer, setOffer] = useState(false)

  //creando variables para habilitar y enviar datos modal de Pagos

  const [PayModal, setPayModal] = useState(false);
  const [paypalDates, setPaypalDates] = useState(null);
  const [ZelleModal, setZelleModal] = useState(false);
  const [paypalModal, setPaypalModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [NewUser, setNewUser] = useState(false);
  const [User, setUser] = useState('')
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [alertNewUser, setAlertNewUser] = useState(false)

  useEffect(()=>{
    setAlertNewUser(false)
    setAlertSuccess(false)
  },[PayModal])

  const closeZelleModal = () => {
    setZelleModal(false)
  }

  const { locale } = useRouter()
  //funcion de estilos
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  //Funciones para modales de pago
  function closePayModal() { setPayModal(false); }
  const handleChangePaypalModal = (data) => {
    setPayModal(data)
    setZelleModal(data)
    setPaypalModal(data)
  }

  const openPaypalModal = (VALUE) => {
    setPaypalModal(true)
    //setPaypalDates(VALUE)
  }

  const openZelleModal = (VALUE) => {
    setZelleModal(true)
    //  setPaypalDates(VALUE)
  }
  //
  const { t } = useTranslation(['index','navbar']);

  //En caso de aprobar pago PAYPAL
  const handlePaymentSuccess = async (data, response) => {
    // Una ves echo el pago este metodo se va a encargar de:
    // - Verificar si el usuario ya esta creado de caso contrario lo crea
    // - Asignar el respectivo Plan 
    // - Crear un resivo
    // - Enviar el respectivo email
    console.log('data', data)
    console.log('response', response)

    let finalUser;

    let temporalPassword = generarPassword()
    
    // Genera el mensage dependiendo del plan
    let emailMessage = {
      to: email,

      subject: t("labelLanguage") == "Es" ?
      "¡Bienvenido/a! Detalles de tu compra y más" : // Asunto en Español
      "Welcome! Details of your purchase and more", // Asunto en Ingles

      content:
      `${paypalDates?.descripion == "1claseIndividual 1masterclass 1claseengrupo 3unidadesporNivel" ? 

        // Mensage de Plan "Experiencia completa"
        t("labelLanguage") == "Es" ?

          // En Español
          `<p><b>¡Hola ${nombre}!</b></p>

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
          <p><b>Hello ${nombre}!</b></p>

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
      t("labelLanguage") == "Es" ?

          // En Español
          `<p><b>¡Hola ${nombre}!</b></p>

          <p>Nos alegra mucho tenerte con nosotros y queremos expresarte nuestro agradecimiento por haber elegido nuestro paquete <b>"Echa un vistazo".</b></p>

          <p>Aquí te detallamos todo lo que has adquirido con tu compra:</p>

          <p><b>Paquete Especial "Echa un vistazo" valorado en $45 ¡por solo $10 dólares!</b> valido hasta el 23 de abril del 2024.</p>

          <p><b>1. Clase Magistral:</b> Únete a nuestra clase especial por Zoom el viernes 22 de marzo a las 17 horas (hora de Argentina). Te sumergirás en temas fascinantes para estudiantes de español de todos los niveles. Desde los sonidos del español hasta consejos de motivación, ¡tenemos mucho por explorar!</p>

          <p><b>2. Clases interactivas en la app:</b> En nuestra plataforma encontrarás dos unidades didácticas interactivas y explicativas para los niveles A1, A2 y B1 y que continuaremos añadiendo contenido el cual podrás disfrutar durante el tiempo promocional. Estamos comprometidos a brindarte contenido de calidad que te ayude a avanzar en tu aprendizaje del español.</p>
          `
          :

          // En Ingles
          `
            <p><b>Hello ${nombre}!</b></p>

            <p>We are delighted to have you with us and want to express our gratitude for choosing our <b>"Echa un vistazo"</b> package.</p>

            <p>Here are all the details of what you've acquired with your purchase:</p>

            <p>Special <b>"Echa un vistazo" Package valued at $45 for only $10</b>, valid until April 23, 2024.</p>

            <p><b>Master Class:</b> Join our special Zoom class on Friday, March 22, at 5:00 PM (Argentina time). You'll delve into fascinating topics for Spanish learners of all levels. From Spanish sounds to motivational tips, we have a lot to explore!</p>

            <p><b>Interactive Classes in the app<b>: On our platform, you'll find two interactive and explanatory didactic units for levels A1, A2, and B1, and we will continue adding content that you can enjoy during the promotional period. We are committed to providing you with quality content that helps you advance in your Spanish learning journey.</p>
            `
      }
      `
    }

    console.log(emailMessage?.content)

    // Obtiene el usuario final en caso de haberlo
    try {
      await fetch('/api/users/getUserEmail/' + email,
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
        setUser(response)

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
            first_name: nombre,
            last_name: apellido,
            country: "",
            email: email,
            password: temporalPassword,
            confirm_password: temporalPassword,
            roles: ['student', 'user'],
            planSync:
            [{
              type: 'plansync',
              payment: 'PAYPAL',
              valid: true,
              qty: paypalDates.qty,
              cost: paypalDates.cost,
              description: paypalDates,
              planing: 0,
              classview: 0
            }]
          }
        ).then(response => {
          // Se asigna la parte final para el mensaje por email
          emailMessage.content = emailMessage.content +  (t("labelLanguage") == "Es" ?

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
          setAlertNewUser(true)
          setPaypalDates(null)
        });

      }
      catch (error) {
        setPaypalDates(null)

        console.error(error);
      }

      //envio recibo a BD
      // try {
      //   await fetch('/api/receipt/add',
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(
      //         {
      //           idUser: email,
      //           idPlan: 'plansync',
      //           qty: paypalDates.qty,
      //           ammount: paypalDates.cost,
      //           dates: { paypalDates, type: "PAYPAL" }
      //         }
      //       ),
      //     }).then(response => {
      //       setPaypalDates(null)
      //       //  console.log("Clase asignado ",response.json())

      //     })
      // }
      // catch (error) {
      //   setPaypalDates(null)

      //   console.error(error);
      // }
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
                email: email,
                updates: {

                  planSync:
                    [...finalUser.planSync, {
                      type: 'plansync',
                      payment: 'PAYPAL',
                      valid: true,
                      qty: paypalDates.qty,
                      cost: paypalDates.cost,
                      description: paypalDates,
                      planing: 0,
                      classview: 0
                    }]

                }
              }
            ),
          })

          .then(response => {            
            emailMessage.content = emailMessage.content + (t("labelLanguage") == "Es" ?
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
        setPaypalDates(null)

        console.error(error);
      }

      //envio recibo a BD
      // try {
      //   await fetch('/api/receipt/add',
      //     {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(
      //         {
      //           idUser: email,
      //           idPlan: 'plansync',
      //           qty: paypalDates.qty,
      //           ammount: paypalDates.cost,
      //           dates: { paypalDates, type: "PAYPAL" }
      //         }
      //       ),
      //     }).then(response => {
      //       setPaypalDates(null)
      //       //  console.log("Clase asignado ",response.json())

      //     })

      // }
      // catch (error) {
      //   setPaypalDates(null)

      //   console.error(error);
      // }
    }

    ///////////// Envio recibo a BD /////////////
    try {
      await fetch('/api/receipt/add',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              idUser: finalUser?._id,
              idPlan: 'plansync',
              qty: paypalDates.qty,
              ammount: paypalDates.cost,
              dates: { paypalDates, type: "PAYPAL" }
            }
          ),
        }).then(response => {
          setPaypalDates(null)
          //  console.log("Clase asignado ",response.json())

        })
    }
    catch (error) {
      setPaypalDates(null)

      console.error(error);
    }

    
    ///////////// Envio de Email /////////////
    await axios.post('/api/mail/template/1', emailMessage)


    //setAssgined(true)
    //setIsPaymentConfirmed(true);
    //setTimeout(function() {PAYOK(paypalDates,response);},500)
    //Confirm();
    //setPaymentCancelled(false); // Asegúrate de restablecer el otro estado
  };

  //En caso de pago Cancelado Paypal
  const handlePaymentCancel = () => {
    alert('Pago cancelado intente nuevamente')
    // setIsPaymentConfirmed(false);
    //  PAYNOK();
    //  setPaymentCancelled(true); // Asegúrate de restablecer el otro estado
  };

  function generarPassword() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      password += caracteres.charAt(randomIndex);
    }

    setPasswd(password)

    return password;
  }
  function assingmentLogVaribles(){
    sessionStorage.setItem("userEmail",email)
    sessionStorage.setItem("userPassword",passwd)
  }


  return (
    <>
    <section className='h-auto bg-[#F6F7FF] pb-[324px] pt-[187px] relative
      md:px-[20px]'>

        {/* Titulo */}
        <div className=' mb-[50px] flex flex-col justify-center items-center z-10 relative'>

          {/* Titulo */}
          <div className='flex justify-center items-center flex-col'>

            <h2 className='underlined-title'>
              {t("card42.0.title")}
            </h2>

          </div>

          {/* Subtitulo */}
          <p className='flex flex-col items-center my-[36px] text-center font-medium max-w-[535px] text-[24px] text-[#676767]
          md:text-[16px]'>
            {t("card42.0.text")}
            <b>{t("card42.0.textPromotion")}</b>
          </p>
        </div>


        <div className="flex justify-center z-10 relative
        md:flex-col md:items-center">

          {/* Experiencia completa */}
          <div
            className="bg-white shadow-lg rounded-[15px]  w-[419px] h-min-[666px] mr-[15px] py-[29px] px-[36px] relative
            md:mx-0 md:w-full md:px-[16px] md:mb-[19px]"
            style={{ boxShadow: '0px 4px 26px #00000040' }}>

            {/* Encabezado */}
            <div className="flex items-center flex-col border-b-2 border-gray_border"
              style={{ paddingBottom: '1.2em' }}>

              {/* Imagen */}
              <div className=" flex justify-center items-center p-1
              md:max-w-[400px] md:mx-[60px]">
                <Image
                  className='h-[98px] w-auto'
                  src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437864/images/icons-06_ihevx7.png"
                  alt="Personas"
                  width={400}
                  height={200}
                />
              </div>

              {/* Titulo */}
              <div

                style={{ minWidth: '260px', marginLeft: '10px' }}>

                <h2
                  className="font-semibold text-center"
                  style={{ fontSize: '20px' }}
                >
                  {t("card42.1.title")}
                </h2>

              </div>

              {/* Precios */}
              <div className='text-center w-full flex items-center flex-col'>

                {/* Precio de Oferta */}
                <h4 className=' font-semibold text-[60px] text-primary'>{t("card42.1.priceOffer")}</h4>

                {/* Precio Real */}
                <p className='line-through font-semibold text-[20px] text-danger'>{t("card42.1.priceReal")}</p>

              </div>

            </div>

            {/* Contenido */}
            <div className='flex justify-center flex-col pb-3 mt-8 text-violet_dark items-start px-6 mb-[80px]
            md:px-0'>

              {/* Lista */}
              <div className='flex justify-center items-start text-left mb-5'>
                <div className="md:w-[38px]">
                  <span className='flex justify-center items-center bg-primary rounded-full mr-2' style={{ width: '18px', height: '18px' }}>
                    <Image
                      width={12.38}
                      height={12.38}
                      src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1695142545/images/imagen_2023-09-19_135546187_yzq6cg.png"}
                      alt='check'
                    />
                  </span>
                </div>
                <p className='flex justify-center items-start text-left text-[18px] font-medium'>

                  {t("card42.1.list.0")}
                </p>

              </div>


              <div className='flex justify-center items-start text-left mb-5'>
                <div className="md:w-[38px]">
                  <span className='flex justify-center items-center bg-primary rounded-full mr-2' style={{ width: '18px', height: '18px' }}>
                    <Image
                      width={12.38}
                      height={12.38}
                      src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1695142545/images/imagen_2023-09-19_135546187_yzq6cg.png"}
                      alt='check'
                    />
                  </span>
                </div>
                <p className='flex justify-center items-start text-left text-[18px] font-medium'>

                  {t("card42.1.list.1")}
                </p>
              </div>


              <div className='flex justify-center items-start text-left mb-5'>
                <div className="md:w-[38px]">
                  <span className='flex justify-center items-center bg-primary rounded-full mr-2' style={{ width: '18px', height: '18px' }}>
                    <Image
                      width={12.38}
                      height={12.38}
                      src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1695142545/images/imagen_2023-09-19_135546187_yzq6cg.png"}
                      alt='check'
                    />
                  </span>
                </div>
                <p className='flex justify-center items-start text-left text-[18px] font-medium'>

                  {t("card42.1.list.2")}
                </p>
              </div>

              <div className='flex justify-center items-start text-left mb-5'>
                <div className="md:w-[38px]">
                  <span className='flex justify-center items-center bg-primary rounded-full mr-2' style={{ width: '18px', height: '18px' }}>
                    <Image
                      width={12.38}
                      height={12.38}
                      src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1695142545/images/imagen_2023-09-19_135546187_yzq6cg.png"}
                      alt='check'
                    />
                  </span>
                </div>
                <p className='flex justify-center items-start text-left text-[18px] font-medium'>
                  {t("card42.1.list.3")}
                </p>
              </div>

              {/* (solo para los niveles A1, A2 y B1) */}
              <div className='flex justify-center items-center w-full'>

                <p className='text-center   text-[14px] font-semibold'>
                  {t("card42.1.list.4")}
                </p>

              </div>

              {/* Boton */}
              <button
                id={'boton25usd'}
                className="w-[255px] bg-primary rounded-full text-white py-[13px] absolute bottom-[29px] left-[50%] translate-x-[-50%] transition-all text-[20px]
                hover:shadow-[0px_4px_14px_0px_#4ED5F2]"
                onClick={() => { setPayModal(true); setPaypalDates({ qty: 1, cost: 25, descripion: "1claseIndividual 1masterclass 1claseengrupo 3unidadesporNivel" }); }}>
                {t("card42.1.button")}
                {/* para habilitar el pago de 1era CARD 25usd */}
              </button>
            {/* Boton Modal de pagos ofertas */}
            {/* <div className='w-[100%] relative top-6'>
                <button
                  className={
                    classNames('w-[116%] md:w-[95%] bg-gradient-to-l from-primary to-success rounded-[7px] text-white p-2  relative  left-[50%] translate-x-[-50%] transition-all hover:shadow-[0px_4px_14px_0px_#8438FFA6]  '
                    , locale==='pt'? ' top-10 md:top-8':'top-14  md:top-10' )
                  }
                    onClick={() => setOffer(!Offer)}>{t("card4.1.button")}</button>           
              </div> */}

          </div>

          <div>{false && Offer && <ModalPagoLanding open={Offer} setOpen={setOffer} />}</div>
        </div>



        {/* Echa un vistazo */}
        <div
          className="bg-white shadow-lg rounded-[15px]  w-[419px] h-min-[666px] ml-[15px] py-[29px] px-[36px] relative
            md:mx-0 md:w-full md:px-[16px] md:mt-[19px] md:h-[666px]"
          style={{ boxShadow: '0px 4px 26px #00000040' }}>

          {/* Encabezado */}
          <div className="flex items-center flex-col border-b-2 border-gray_border"
            style={{ paddingBottom: '1.2em' }}>

            {/* Imagen */}
            <div className="flex justify-center items-center p-1 relative
              md:max-w-[400px] md:w-full">
              <Image
                className='h-[98px] w-auto'
                src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437860/images/icons-05_xkbram.png"
                alt="montaña"
                width={400}
                height={200}
              />
            </div>

            {/* Titulo */}
            <div

              style={{ minWidth: '260px', marginLeft: '10px' }}>
              <h2
                className="font-semibold text-center"
                style={{ fontSize: '20px' }}
              >
                {t("card42.2.title")}

              </h2>
            </div>

            {/* Precios */}
            <div className='text-center w-full flex items-center flex-col'>

              {/* Precio de Oferta */}
              <h4 className=' font-semibold text-[60px] text-primary'>{t("card42.2.priceOffer")}</h4>

              {/* Precio Real */}
              <p className='line-through font-semibold text-[20px] text-danger'>{t("card42.2.priceReal")}</p>

            </div>

          </div>

          {/* Contenido */}
          <div className='flex justify-center flex-col pb-3 mt-8 text-violet_dark items-start px-6'>

            {/* Lista */}
            <div className='flex justify-center items-start text-left mb-5'>
              <div className='w-[38px]'>
                <span className='flex justify-center items-center bg-primary rounded-full mr-2' style={{ width: '18px', height: '18px' }}>
                  <Image
                    width={12.38}
                    height={12.38}
                    src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1695142545/images/imagen_2023-09-19_135546187_yzq6cg.png"}
                    alt='check'
                  />
                </span>
              </div>
              <p className='text-[18px] font-medium' style={{ maxWidth: '353px' }}>
                {t("card42.2.list.0")}
              </p>
            </div>

            <div className='flex justify-center items-start text-left mb-5'>
              <div className='w-[38px]'>
                <span className='flex justify-center items-center bg-primary rounded-full mr-2' style={{ width: '18px', height: '18px' }}>
                  <Image
                    width={12.38}
                    height={12.38}
                    src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1695142545/images/imagen_2023-09-19_135546187_yzq6cg.png"}
                    alt='check'
                  />
                </span>
              </div>
              <p className='text-[18px] font-medium' style={{ maxWidth: '353px' }}>
                {t("card42.2.list.1")}
              </p>
            </div>
            
            {/* (solo para los niveles A1, A2 y B1) */}
            <div className='flex justify-center items-center w-full'>

              <p className='text-center   text-[14px] font-semibold'>
                {t("card42.1.list.4")}
              </p>

            </div>

            {/* Boton */}
            <button
              id={'boton10usd'}
              className="w-[255px] bg-primary rounded-full text-white py-[13px] absolute bottom-[29px] left-[50%] translate-x-[-50%] transition-all text-[20px]
              hover:shadow-[0px_4px_14px_0px_#4ED5F2]"  onClick={() => { setPayModal(true); setPaypalDates({ first_name: nombre, last_name: apellido, email: email, qty: 0, cost: 10, descripion: " 1masterclass 3unidadesporNivel" }) }}>
              {t("card42.2.button")}
              {/* Para oferta d 10 usd O 2DA TARJETA */}
            </button>

          </div>
          <div>{List && <ModalListTourist open={setList} />}</div>

        </div>


        </div>

      {/* Ellipse */}
      <div className='absolute top-0 left-0 w-full h-full z-0 overflow-hidden' >

        <div className='w-full h-full bg-gray_light' style={{ filter: "contrast(100)  hue-rotate(41deg)" }}>
          {/* <Image brightness(98%)
            className='z-0 h-auto left-0 opacity-0'
            src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1707226057/images/juswytwdg2g5ulivawuv.png"}
            height={100}
            width={100}
            quality={100}
            /> */}

          <div className='h-[90%] absolute top-0  w-[60%] max-w-[820px]' >
            <div className=' w-full h-[65%] rounded-[34%_66%_77%_23%_/_58%_100%_0%_42%] absolute top-0 left-[-50%] ' style={{ filter: "blur(60px)", backgroundColor: "#3cbbd6" }}></div>
            <div className=' w-full h-[70%] rounded-[0%_100%_100%_0%_/_56%_32%_68%_44%] absolute bottom-0 left-[-10%] ' style={{ filter: "blur(60px)", backgroundColor: "#3cbbd6" }}></div>
          </div>

        </div>

        {/* <div className=' absolute top-0 left-0 w-full h-full bg-[#a33] opacity-[30%]'></div> */}

      </div>

    </section >

    
    {/* //////////////////////// MODALES DE PAGO //////////////////////// */}

    {/* Modal de Pago habilitacion*/}
    <ModalPagoABLE
      setNombre={setNombre}
      setApellido={setApellido}
      setEmail={setEmail}
      setPasswd={setPasswd}
      setNewUser={setNewUser}
      setUser={setUser}
      close={closePayModal}
      modalPay={handleChangePaypalModal}
      open={PayModal}
      open1={openPaypalModal}
      open2={openZelleModal}
    />

    {/* Modal Pago Paypal */}
    <ModalPago
      onPaymentSuccess={handlePaymentSuccess}
      onPaymentCancel={handlePaymentCancel}
      modalPaypal={handleChangePaypalModal}
      open={paypalModal}
      dates={paypalDates}
    />

    {/* Modal Pago Zelle */}
    <ModalPago2
      labelLanguage={t("labelLanguage")}
      // onPaymentSuccess={handlePaymentSuccess1}
      onPaymentCancel={handlePaymentCancel}
      modalClose={closeZelleModal}
      generarPassword={generarPassword}
      User={User}
      NewUser={NewUser}
      email={email}
      nombre={nombre}
      passwd={passwd}
      open={ZelleModal}
      dates={paypalDates}
      buyAlertOpen={()=>setAlertSuccess(true)}
      newUserAlertOpen={()=>setAlertNewUser(true)}
    />

    
    {/* //////////////////////// Alerts //////////////////////// */}
    <AlertContainer>

      <Alert
      color='secondary'
      open={alertSuccess}
      closeAlert={()=>setAlertSuccess(false)}>
        {t("zellerBuyMessage")}
      </Alert>

      
      <Alert
      color='secondary'
      open={alertNewUser}
      closeAlert={()=>setAlertNewUser(false)}>
        {t("newUserMessage.0")} <b>( {email} )</b> {t("newUserMessage.1")} <b>( {passwd} )</b> {t("newUserMessage.2")} <Link onClick={assingmentLogVaribles} className='underline' href={'/login'}><b>{t("newUserMessage.3")}</b></Link>
      </Alert>

    </AlertContainer>
    </>
  )
}
