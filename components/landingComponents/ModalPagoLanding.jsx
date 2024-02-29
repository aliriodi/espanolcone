import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Logo from '../../public/imgs/logo-gradient.png';
import Image from 'next/image';
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlansAync from '../Plan/PlansAync2';
import { sendEmail } from './functions';

export default function ModalPagoLanding({ setOpen, email2 }) {
    const { t } = useTranslation('index');
    // Definir el estado para almacenar la cadena
    const [inputString, setInputString] = useState('');
    const [validateEmail, setvalidateEmail] = useState(false);
    const [emailok, setEmailok] = useState(false);

    function openaEmailIN() { setEmailok(true) }
    // Función para manejar cambios en el input
    const handleInputChange = (event) => {
        setInputString(event.target.value);
        // Expresión regular para validar un correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setvalidateEmail(regex.test(event.target.value))
    };
    function send() {
        //si se desea enviar otro tipo de email, se debe pasar un 
        //2do valor como para escoger los distintos
        //tipos de mensajes que se desean enviar, tomarlo de la entrada
        //en la funcion send()
        if (!email2) { sendEmail(inputString); }
        else { sendEmail(email2) }

        alert('Su email sera respondido a la prontitud / Your email will be responded to promptly');
        setOpen(false)

    }
    return (
        <div >
            <div
                onClick={() => setOpen(false)}
                className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]'>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white rounded-md p-5 flex flex-col w-[700px] relative
                    md:h-screen md:overflow-auto md:w-full md:rounded-none'>

                    {/* Boton de cerrar modal */}
                    <FontAwesomeIcon
                        onClick={() => setOpen(false)}
                        icon={faX}
                        className='absolute right-5 top-5 text-violet_dark w-[12px] z-50 ursor-pointer' />

                    {/* Truco que uso para poder renderizar logo email2 viene de /inicio/curso/index.js  */}
                    {!email2 && <>   {/* Logo */}
                        <div className=' flex justify-center flex-col items-center relative mb-[30px]'>
                            <Image src={Logo} className='' style={{ width: '100px' }} alt="Logo" />
                        </div>
                        {/*Para escribir email */}
                        <div className=' font-medium text-[28px] bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text min-h-[28px] text-center mb-[25px]
                    md:text-[21px]'>
                            {emailok && t("modalEmailLanding.0")}
                        </div> </>}

                    {/* Input */}
                    {
                        emailok && !email2 &&
                        <input
                            placeholder={t("modalEmailLanding.2")}
                            className='rounded-md border-2 border-primary outline-primary_hover p-3 w-full mb-3'
                            type="text"
                            value={inputString} onChange={handleInputChange} />}

                    {/* Email Invalido o valido message */}
                    {/* {inputString.length > 6 && !validateEmail && <div className='text-red-500'> {t("card4.2.emailInvalid")}</div>} */}

                    {/* boton de enviar */}
                    {
                        emailok && !email2 &&
                        <div className='flex justify-center  text-center '>
                            <button id={''}
                                className={`bg-primary rounded-md text-white w-full p-2 ${!validateEmail && 'hidden'} transition-all
                        hover:bg-[#4ED5F2] hover:shadow-[0px_4px_14px_0px_#3CBBD661]`}
                                onClick={() => send()}>{t("modalEmailLanding.1")}</button>

                            <div
                                className={`bg-primary rounded-md text-white w-full p-2 ${validateEmail && 'hidden'} opacity-50 pointer-events-none`}>
                                {t("modalEmailLanding.1")}
                            </div>
                        </div>}


                    {/*Modal de pago que no anda aun */}
                    {!emailok && !email2 && <PlansAync closePlan={setOpen} openaEmailIN={openaEmailIN} />}

                    {/* truco que uso para llamar desde /pages/curso/index.js mientras los modales de 
                     pago se desarrollan
                     */}

                    {email2 ?
                        <>
                            {/* Titulo */}
                            <div className='flex items-center mb-[30px] flex-col'>
                                <Image src={Logo} alt={'Logo'} className='w-[123px] h-[78px] ' />
                                <div className='relative top-5'>
                                    <h3 className=' font-medium text-[28px] bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text min-h-[28px] text-center'>
                                        Elige algunas de nuestras opciones promocionales</h3></div>
                            </div>

                            {/* Planes */}
                            <div className="flex py-4
        md:flex-col">
                                {/* Una Clase */}
                                <div className='flex flex-col px-4 w-[400px] border-r-2 justify-between
          md:w-full md:py-10 md:border-b-2 md:border-r-0'>

                                    {/* Titulo */}
                                    <div className='w-full'>
                                        {/* Precio */}
                                        <p
                                            className='text-[49px] text-primary font-medium text-center'>
                                            <b>{25}$usd</b>
                                        </p>
                                        {/* Descripcion */}

                                        <p className=' text-violet_dark text-[16px]'>
                                            * <b>1</b> Clase individual personalizada.</p>
                                        <p className=' text-violet_dark text-[16px]'>
                                            * <b>1</b> <span className="italic">Master Class.</span> </p>
                                        <p className=' text-violet_dark text-[16px]'>
                                            * <b>1</b> Clase grupal.</p>
                                        <p className=' text-violet_dark text-[16px]'>
                                            * Acceso por <b>1 mes</b> a todo el contenido de la plataforma. </p>
                                        <p className='text-center'><b>Promoción valida hasta el 15 de febrero de 2024</b></p>
                                    </div>

                                    {/* Contenido */}
                                    <div className='py-4 flex flex-col justify-end h-full items-center'>
                                        {/* <p
              className=' text-violet_dark '>
                Solo <b>1</b> clase
              </p> */}

                                        <p
                                            className=' text-violet_dark '>
                                            Monto total: <b>{25}$usd</b>
                                        </p>
                                    </div>
                                    {true && <button onClick={() => send()} className="bg-secondary p-2 rounded-[5px] text-white">Saber Mas...</button>}

                                </div>


                                {/* Combo de Clase 10 */}

                                <div className='flex flex-col px-4 w-[400px] justify-between
          md:w-full md:py-10 md:border-b-2 md:border-r-0'>

                                    {/* Titulo */}
                                    <div className='w-full '>
                                        {/* Precio */}
                                        <p
                                            className='text-[49px] text-primary font-medium text-center'>
                                            <b>{10}$usd</b>
                                        </p>
                                        {/* Descripcion */}
                                        <div className='relative top-4'>

                                            <p className='text-violet_dark text-[16px]'>
                                                * <b>1</b> <span className="italic">Master Class.</span> </p>
                                            <p className='text-violet_dark text-[16px]'>
                                                * Acceso por <b>1 mes</b> a todo el contenido de la plataforma. </p>
                                        </div>
                                    </div>
                                    {/* Contenido */}
                                    <div className='py-4 flex flex-col justify-end h-full items-center'>

                                        <p
                                            className=' text-violet_dark '>
                                            Monto total: <b>{10}$usd</b>
                                        </p>
                                    </div>

                                    {true && <button onClick={() => send()} className="bg-secondary p-2 rounded-[5px] text-white">Saber Mas...</button>}

                                </div>

                            </div>

                        </>
                        :
                        null
                    }
                    {/* termina truco */}


                </div>
            </div>
        </div>
    )
}
