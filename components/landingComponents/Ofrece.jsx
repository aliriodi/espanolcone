import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ModalListTourist from './ModalListTourist';
import ModalPagoLanding from './ModalPagoLanding';
import ModalPagoABLE from '../ModalPagoAble';
export default function Ofrece() {
  let [List, setList] = useState(false)
  let [Offer, setOffer] = useState(false)

  //creando variables para habilitar y enviar datos modal de Pagos
  
  const [PayModal, setPayModal] = useState(false);
  const [paypalDates, setPaypalDates] = useState(null);
  const [ZelleModal, setZelleModal] = useState(false);
  const [paypalModal, setPaypalModal] = useState(false);
  const { locale } = useRouter()
  //funcion de estilos
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
//Funciones para modales de pago
function closePayModal() {setPayModal(false)}
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

  return (
    <>
      <section className='h-auto bg-[#F6F7FF] mb-[100px] pb-[126px] pt-[187px] relative
      md:px-[20px]'>

        {/* Titulo */}
        <div className=' mb-[50px] flex flex-col justify-center items-center'>

          {/* Titulo */}
          <div className='flex justify-center items-center flex-col'>
            <h2 className='underlined-title' style={{ fontSize: '30px', color: '#323030' }}>
              {t("card4.0.title")}
            </h2>

            <span className='bg-secondary flex' style={{ height: '2px', width: '80.8px' }}></span>
          </div>

          {/* Subtitulo */}
          <p className='flex justify-center items-center my-[36px] text-center font-medium' style={{ fontSize: '18px', color: '#5E6063', maxWidth: '535px' }}>
            {t("card4.0.text")}
          </p>
        </div>


        <div className="flex justify-center 
        md:flex-col md:items-center">

          {/* Nuestros Programas */}
          <div
            className="bg-white shadow-lg rounded-lg  w-[500px] h-min-[646px] mr-[19px] py-[66px] px-[33px]
            md:mx-0 md:w-full md:px-[16px] md:mb-[19px]"
            style={{ boxShadow: '0px 4px 26px #00000040' }}>

            {/* Encabezado */}
            <div className="flex items-center
            md:flex-col"
              style={{ borderBottom: '1px #DEDEDE solid', paddingBottom: '1.2em' }}>

              {/* Imagen */}
              <div className=" flex justify-center items-center p-1
              md:max-w-[400px] md:mx-[60px]">
                <Image
                  src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437860/images/icons-05_xkbram.png"
                  alt="Personas"
                  width={400}
                  height={200}
                />
              </div>

              {/* Titulo */}
              <div

                style={{ minWidth: '260px', marginLeft: '10px' }}>

                <h2
                  className="font-semibold
                  md:text-center"
                  style={{ fontSize: '20px' }}
                >
                  {t("card4.1.title")}
                </h2>

                <p
                  className='font-medium
                  md:text-center'
                  style={{ color: '#6E6B7B', marginTop: '10px', fontSize: '16px' }}>
                  {t("card4.1.text")}

                </p>

              </div>

            </div>

            {/* Contenido */}
            <div className='flex justify-center flex-col pb-3 mt-8 text-violet_dark items-start px-6
            md:px-0'>

              <p className='flex justify-center items-start text-left' >
                {t("card4.1.paragraph")}
              </p>

              <p className='flex justify-center items-start text-left my-6'>
                {t("card4.1.pargraph2")}
              </p>



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
                <p className='flex justify-center items-start text-left mb-5'>

                  {t("card4.1.list.0")}
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
                <p className='flex justify-center items-start text-left mb-5'>

                  {t("card4.1.list.1")}
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
                <p className='flex justify-center items-start text-left mb-5'>

                  {t("card4.1.list.2")}
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
                <p className='flex justify-center items-start text-left'>

                  {t("card4.1.list.3")}

                </p>
                
                
                </div>
                  {/* Boton Modal de pagos ofertas */}
                  <div className='w-[100%] relative top-4'>
                  <button
                    className={
                      classNames('w-[116%] md:w-[95%] bg-gradient-to-l from-primary to-success rounded-[7px] text-white p-2  relative  left-[50%] translate-x-[-50%] transition-all hover:shadow-[0px_4px_14px_0px_#8438FFA6]  '
                      , locale==='pt'? 'top-12 md:top-10':'top-16 md:top-12' )
                    }
                     onClick={() => setOffer(!Offer)}>{t("card4.1.button")}</button>           
                </div>
              
            </div>
            <div>{Offer && <ModalPagoLanding open={Offer} setOpen={setOffer} />}</div>
          </div>

          {/* Conoce Cordoba */}
          <div
            className="bg-white rounded-lg w-[500px] h-min-[646px] ml-[19px] py-[66px] px-[33px] relative
            md:mx-0 md:w-full md:px-[16px] md:mt-[19px]"
            style={{ boxShadow: '0px 4px 26px #00000040' }}>

            {/* Encabezado */}
            <div className="flex items-center
            md:flex-col"
              style={{ borderBottom: '1px #DEDEDE solid', paddingBottom: '1.7em' }}>

              {/* Imagen */}
              <div className="flex justify-center items-center p-1 relative
              md:max-w-[400px] md:w-full">
                <Image
                  className='md:mx-[60px] '
                  src="https://res.cloudinary.com/dfddh08q8/image/upload/v1694437864/images/icons-06_ihevx7.png"
                  alt="montaña"
                  width={400}
                  height={200}
                />
              </div>

              {/* Titulo */}
              <div

                style={{ minWidth: '260px', marginLeft: '10px' }}>
                <h2
                  className="font-semibold
                  md:text-center"
                  style={{ fontSize: '20px' }}
                >
                  {t("card4.2.title")}

                </h2>
                <p
                  className='font-medium
                  md:text-center'
                  style={{ color: '#6E6B7B', marginTop: '10px', fontSize: '16px' }}>
                  {t("card4.2.text")}

                </p>
              </div>
            </div>

            {/* Contenido */}
            <div className='flex justify-center flex-col pb-3 mt-8 text-violet_dark items-start px-6'>

              <p className='flex justify-center items-start text-left'>
                {t("card4.2.paragraph")}
              </p>

              <p className='flex justify-center items-start text-left my-6'>
                {t("card4.2.paragraph2")}
              </p>

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
                <p style={{ maxWidth: '353px' }}>
                  {t("card4.2.list.0")}
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
                <p style={{ maxWidth: '353px' }}>
                  {t("card4.2.list.1")}
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
                <p style={{ maxWidth: '353px' }}>
                  {t("card4.2.list.2")}
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
                <p className='break-normal' style={{ maxWidth: '353px' }}>
                  {t("card4.2.list.3")}
                </p>
              </div>

              {/* Boton de anotarse en lista de guias */}
              <button
                className="w-[90%] bg-gradient-to-r from-primary to-success rounded-[7px] text-white p-2 absolute bottom-4 left-[50%] translate-x-[-50%] transition-all
              hover:shadow-[0px_4px_14px_0px_#8438FFA6]" onClick={() => setList(!List)}>{t("card4.2.button")}</button>

            </div>
            <div>{List && <ModalListTourist open={setList} />}</div>

          </div>
          {/* MODALES DE PAGO */}
<section>
<div>

{/* Modal de Pago habilitacion*/}
<ModalPagoABLE
  close={closePayModal}
  modalPay={handleChangePaypalModal}
  open={PayModal}
  open1={openPaypalModal}
  open2={openZelleModal}
/>
</div>
</section>
        </div>
      </section>
    </>
  )
}
