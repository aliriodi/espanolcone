import React from 'react'
import PLANASYNC from './Planasync'
import { Fragment, useState, useEffect } from 'react'
import ModalPago from '../ModalPago'
import style from '../../styles/class.module.css'

//este modulo presenta los modales de pago en Unit2 cuando arranca 
// el inicio de pago de clases asincronas

export default function MUnit2() {

    const [showPLAN, setshowPLAN] = useState(true)
    const [showPLANAsync, setshowPLANAsync] = useState(false)

    const [paypalModal, setPaypalModal] = useState(false)
    const [paypalDates, setPaypalDates] = useState(null)

    function handlePaymentSuccess() {alert('pago satisfactorio') }
    function handlePaymentCancel() { alert('pago insatsofactorio')}
    function handleChangePaypalModal() { }
    function offer1() {
        setPaypalDates({           
                qty: '1',
                cost:20
                   })
        setPaypalModal(true)

    }


    function offer2() {
        setPaypalDates({
           
            qty: '1',
            cost:200
       
    })
        setPaypalModal(true)
    }

    return (
        <div>

            {!showPLANAsync && showPLAN &&
                (<>  <button className={style['redbutton']} onClick={() => setshowPLAN(false)}>X </button>
                    <div>¡Oferta especial por tiempo limitado!</div>
                    <div>Conviértete en un viajero aventurero</div>
                    <button className="bg-secondary p-2 rounded-[5px] text-white" onClick={() => setshowPLANAsync(true)}>¡Compra ahora! </button>

                </>)
            }

            <div>
                {showPLANAsync &&
                    <>
                        <button className={style['redbutton']} onClick={() => setshowPLANAsync(false)}>X </button><PLANASYNC offer1={offer1} offer2={offer2} setPaypalModal={setPaypalModal} />
                    </>}
            </div>

            <div>
                {/* Modal de Pago */}
                <ModalPago
                    onPaymentSuccess={handlePaymentSuccess}
                    onPaymentCancel={handlePaymentCancel}
                    modalPaypal={handleChangePaypalModal}
                    open={paypalModal}
                    dates={paypalDates}
                />
            </div>

        </div>
    )
}
