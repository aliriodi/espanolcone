import { useEffect, useState } from "react"
import Image from 'next/image';
import Zelle from '../../../public/imgs/zelle-logo-0.png';
import Logo from '../../../public/imgs/logo-gradient.png';
import ModalPagoPAYPALL from "../../ModalPagoPAYPAL";
import ModalPayPal from "./ModalPayPal";

export default function ModalPayment({ open, onCloseModal, date, onPaymentSuccess }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenPaypal, setIsOpenPaypal] = useState(false)    

    function closeModal(){
        setIsOpen(false)
        onCloseModal()
    }

    function closeAllModal(){
        setIsOpen(false)
        setIsOpenPaypal(false)
        onCloseModal()
    }

    function handlePaymentCancel(){

    }

    function handlePaymentSuccess(data){
        // Una ves echa la compra cierra el modal
        setIsOpen(false)
        setIsOpenPaypal(false)
        onCloseModal()
        onPaymentSuccess(data)        
    }
    
    useEffect(() => {
        setIsOpen(open)
    }, [open])

    return (
        <>
            {
                isOpen &&

                // Fondo negro
                <div
                onClick={closeModal}
                className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

                    {/* Pantalla blanca */}
                    <div
                    onClick={(e)=>e.stopPropagation()}
                    className='bg-white rounded-md p-5 relative
                    md:w-full md:px-0 md:rounded-none'>
            
                        {/* Logo */}
                        <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>
            
                        <Image  src={Logo} className='mb-6' style={{ width: '100px' }} alt="Logo" />
            
                        <p className='text-[18px] text-light font-medium absolute bottom-[-13px] bg-white px-2'>Métodos de pago:</p>

                        </div>
            
                        {/* Metodo de pago */}
                        <div
                        className='w-[750px] max-h-[70vh] flex-col flex justify-center p-3 mt-7
                        overflow-y-scroll modal-paypal
                        md:w-full'>

                            {/* PayPal */}
                            <button
                            type="button"
                            paymentSuccess={handlePaymentSuccess}
                            onClick={() => {setIsOpenPaypal(true)}}
                            className='rounded-[5px] text-white px-5 py-2.5 mb-4 w-full text-[21px] italic font-semibold bg-gradient-to-r from-[#253b80] to-[#2997d8]  flex justify-center
                            hover:shadow-[0px_4px_14px_#253b80]'>

                                PayPal

                            </button>

                            {/* Zeller */}
                            <button
                            type="button"
                            onClick={() => {props.open2(),props.close()}}
                            className='rounded-[5px] text-white px-5 py-2.5 w-full mb-4 text-[16px] font-semibold bg-[#7422e0] flex justify-center
                            hover:shadow-[0px_4px_14px_#7422e0]'>

                                <Image src={Zelle} alt='zelle' className='w-[60px]'/> 

                            </button>
                                
                        </div>
            
                    </div>

                </div>
            }

            {/* Modal de Paypal */}
            <ModalPayPal
            date={date}
            onPaymentCancel={handlePaymentCancel}
            onPaymentSuccess={handlePaymentSuccess}
            open={isOpenPaypal}
            onCloseModal={()=>{ setIsOpenPaypal(false) }}
            onCloseAllModal={closeAllModal}
            />
            {/* <ModalPagoPAYPALL  open={isOpenPaypal}/> */}
        </>
    )
}
