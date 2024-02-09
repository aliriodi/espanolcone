import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ModalListTourist from './ModalListTourist';
import ModalPagoLanding from './ModalPagoLanding';
import ModalPagoABLE from '../ModalPagoAbleLanding';
import ModalPago from '../ModalPagoPAYPALLanding';
import ModalPago2 from '../ModalPagoZelleLanding';

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

  const closeZelleModal = () => {
    setZelleModal(false)
  }
  const { locale } = useRouter()
  //funcion de estilos
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  //Funciones para modales de pago
  function closePayModal() { setPayModal(false);  }
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
  const { t } = useTranslation('index');

  //En caso de aprobar pago PAYPAL
  const handlePaymentSuccess = async (data, response) => {
    // alert('ahi vengo')
    console.log('data', data)
    console.log('response', response)
    try {
      await fetch('/api/users/getUserEmail/' + email,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }).then(response => response.json())
        .then(response => setUser(response))

    }
    catch (error) { console.log('Ofrece.jsx', error) }
   console.log(User)

    if (NewUser) {
      console.log('soy un nuevo usuario')
      //console.log('User', User.results.planSync)
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
                    [... User?.results?.planSync||User?.planSync, {
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
            setPaypalDates(null)
            //   console.log("Clase asignado ",response.json())    
          })

      } catch (error) {
        setPaypalDates(null)

        console.error(error);
      }

      //envio recibo a BD

      try {
        await fetch('/api/receipt/add',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
                idUser: email,
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

      } catch (error) {
        setPaypalDates(null)

        console.error(error);
      }
    }
    else {
      console.log('NO soy un nuevo usuario')

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
                    [...User.planSync, {
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
            setPaypalDates(null)
            //   console.log("Clase asignado ",response.json())    
          })

      } catch (error) {
        setPaypalDates(null)

        console.error(error);
      }

      //envio recibo a BD

      try {
        await fetch('/api/receipt/add',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              {
                idUser: email,
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

      } catch (error) {
        setPaypalDates(null)

        console.error(error);
      }



    }
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
          <p className='flex flex-col items-center my-[36px] text-center font-medium max-w-[535px] text-[24px] text-[#676767]'>
            {t("card42.0.text")}
            <b>{t("card42.0.textPromotion")}</b>
          </p>
        </div>


        <div className="flex justify-center z-10 relative
        md:flex-col md:items-center">

          {/* Nuestros Programas */}
          <div
            className="bg-white shadow-lg rounded-[15px]  w-[419px] h-min-[635px] mr-[15px] py-[29px] px-[36px] relative
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


              {/* Boton */}
              <button
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

          {/* Conoce Cordoba */}
          <div
            className="bg-white shadow-lg rounded-[15px]  w-[419px] h-min-[635px] ml-[15px] py-[29px] px-[36px] relative
            md:mx-0 md:w-full md:px-[16px] md:mt-[19px]"
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

              {/* Boton */}
              <button
                className="w-[255px] bg-primary rounded-full text-white py-[13px] absolute bottom-[29px] left-[50%] translate-x-[-50%] transition-all text-[20px]
              hover:shadow-[0px_4px_14px_0px_#4ED5F2]"  onClick={() => { setPayModal(true); setPaypalDates({ first_name: nombre, last_name: apellido, email: email, qty: 0, cost: 10, descripion: " 1masterclass 3unidadesporNivel" }) }}>
                {t("card42.2.button")}
                {/* Para oferta d 10 usd O 2DA TARJETA */}
              </button>

            </div>
            <div>{List && <ModalListTourist open={setList} />}</div>

          </div>



          {/* MODALES DE PAGO */}
          <section>
            <div>

              {/* Modal de Pago habilitacion*/}
              {<ModalPagoABLE
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
              />}
            </div>
            {/* Modal Pago Paypal */}
            <div>
              <ModalPago
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentCancel={handlePaymentCancel}
                modalPaypal={handleChangePaypalModal}
                open={paypalModal}
                dates={paypalDates}
              />

            </div>
            {/* Modal Pago Zelle */}
            <div>
              <ModalPago2
                // onPaymentSuccess={handlePaymentSuccess1}
                onPaymentCancel={handlePaymentCancel}
                modalClose={closeZelleModal}
                User={User}
                NewUser={NewUser}
                passwd={passwd}
                open={ZelleModal}
                dates={paypalDates}
              />
            </div>
          </section>
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

      </section>
    </>
  )
}
