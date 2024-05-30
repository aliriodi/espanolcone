import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import Zelle from '../../../public/imgs/zelle-logo-0.png';
import Cloudinary from "../../cloudinary/cloudinary";
import Image from 'next/image';

export default function ModalZeller({ open, onCloseModal, onCloseAllModal, onPaymentCancel, onPaymentSuccess, date }) {
    const [isOpen, setIsOpen] = useState(false)
    const [ImageUrl, setImageurl] = useState(null)

    const closeModal = () => {
        onCloseModal()
        setIsOpen(false)
      }
  
      function closeAllModal(){
        setIsOpen(false)
        onCloseAllModal()
      }
  
      function handlerPaymentCancel(){
      }
  
      function handlerPaymentSuccess(data){
        onPaymentSuccess({
          ...data,
          type:"ZELLER",
          image: ImageUrl
        })
      }
      
      function imageurl(url){
        setImageurl(url)    
      }
    
      useEffect(()=>{
        setIsOpen(open)
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
                className='bg-white rounded-md relative
                md:w-full md:rounded-none'>

                {/* Boton para cerrar modal */}
                <FontAwesomeIcon
                onClick={closeAllModal}
                icon={faX}
                className='absolute right-5 top-5 text-white z-[999]'/>

                {/* Metodo de pago */}
                <div
                className='w-[750px] max-h-[70vh]  flex justify-center
                overflow-y-auto
                md:w-full md:max-h-screen'>
                    
                    <div className='w-full m-auto'>
                    {/* Zelle Logo */}
                    <div className='bg-[#7422e0] py-3 px-6 mb-5 rounded-[5px_5px_0_0]
                    md:rounded-none'>
                        <Image  src={Zelle} className='' style={{ width: '100px' }} alt="Zelle" />
                    </div>

                    <div className='p-5 '>

                        {/* Cantidad de clases */}
                        <div className='flex justify-between text-violet_dark border-b-2 py-2'>
                        <p>Descripcion:</p>
                        <b>{date?.observacion}</b>
                        </div>

                        {/* Monto a Transferir */}
                        <div className='flex justify-between text-violet_dark border-b-2 py-2'>
                        <p>Monto a transferir:</p>
                        <b>{date?.amount} USD</b>
                        </div>

                        {/* Cuenta Zelle */}
                        <div className='mt-2 flex justify-between text-violet_dark border-b-2 py-2'>
                        <p>Cuenta Zelle:</p>
                        <b>aliriodi@gmail.com</b>
                        </div>

                        {/* Carga de comprobante */}
                        <div className="my-5 border-2 border-gray_clear rounded-[5px]">

                        <b className='w-full bg-gray_clear flex p-2 text-violet_dark'>Cargue una imagen de su comprobante</b>

                        <div className='p-4'>
                            <Cloudinary imageurl={imageurl}/>
                        </div>

                        </div>

                        {/* aca deberia ser que se esclarezca el estilo mientras no haya imagen cargada */}
                        {
                            ImageUrl &&
                            <button className='btn-success px-5 py-2.5 mt-3 w-full  text-[16px]' onClick={handlerPaymentSuccess}>
                                Enviar pago
                            </button>
                        }

                        {
                            !ImageUrl &&
                            <button className={`btn-success px-5 py-2.5 mt-3 w-full text-[16px] l opacity-[50%] pointer-events-none`} onClick={()=> alert('falta imagen de pago')}>
                                Enviar pago
                            </button>
                        }


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
