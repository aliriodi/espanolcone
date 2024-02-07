import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Logo from '../../public/imgs/logo-gradient.png';
import Image from 'next/image';
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ModalListTourist(props) {
    const { t } = useTranslation('index');

    // Definir el estado para almacenar la cadena
    const [inputString, setInputString] = useState('');
    const [validateEmail, setvalidateEmail] = useState(false);
    const [emailok, setEmailok] = useState(false);

    // Función para manejar cambios en el input
    const handleInputChange = (event) => {
        setInputString(event.target.value);
        // Expresión regular para validar un correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setvalidateEmail(regex.test(event.target.value))
    };

    async function sendList() {
        try {

            await fetch('/api/email/add',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({ email: inputString, suscribe: true ,from:'tourist'}),
                })


        } catch (error) {
            console.log(error);
        }
        setEmailok(true)
        // setTimeout(function () {
        //     props.open(false)
        // }, 2000);


    }
    return (
        <div>
            <div
            onClick={() => props.open(false)}
            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]'>
                {
                !emailok ?
                <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-[20px] p-[50px] flex flex-col justify-between w-[475px] h-[551px] relative
                md:w-full md:rounded-none'>

                    {/* Boton de cerrar modal */}
                    <FontAwesomeIcon
                    onClick={() => props.open(false)}
                    icon={faX}
                    className='absolute right-5 top-5 text-violet_dark w-[12px] z-50 ursor-pointer'/>
                    

                    {/* Anotate en la lista */}
                    <div className=' font-semibold text-[24px] text-[#4F4F4F] text-center mb-[25px]
                    md:text-[21px]'>

                        Trip in June 2024

                        {/* Text */}
                        <p className='text-[16px] font-medium'>
                            {!emailok && t("card4.2.messageModal")}
                        </p>
                    </div>

                    {/* Input */}
                    {
                    !emailok &&
                    <input
                    placeholder='Escribe tu email'
                    className='rounded-md border-2 border-primary outline-primary_hover p-3 w-full mb-3'
                    type="text"
                    value={inputString} onChange={handleInputChange} />}

                    {/* Email Invalido o valido message */}
                    {/* {inputString.length > 6 && !validateEmail && <div className='text-red-500'> {t("card4.2.emailInvalid")}</div>} */}


                    <div>
                        {/* Boton de enviar */}
                        {
                        <div className='flex justify-center  text-center mb-[20px]'>
                            <button 
                            className={`bg-primary rounded-full text-white w-full p-2 text-[20px] ${!validateEmail && 'hidden'} transition-all
                            hover:bg-[#4ED5F2] hover:shadow-[0px_4px_14px_0px_#3CBBD661]`}
                            onClick={() => sendList()}>{t("card4.2.send")}</button>
                                    
                            <div
                            className={`bg-primary rounded-full text-white w-full p-2 text-[20px] ${validateEmail && 'hidden'} opacity-50 pointer-events-none`}>
                                {t("card4.2.send")}
                            </div>
                        </div>}


                        {/* Mostrar mensaje email agendado */}
                        {emailok && <div>{t("card4.2.sendOK")}</div>}

                        <button
                        className={`border-2 border-primary rounded-full text-primary w-full p-2 text-[20px] transition-all font-medium
                        hover:bg-primary_flat_hover hover:shadow-[0px_4px_14px_0px_#3CBBD661]`}
                        onClick={() => props.open(false)}>
                            Cancel
                        </button>

                    </div>
                    
                </div>
                :
                // Email enviado
                <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-[20px] p-[50px] flex flex-col justify-center items-center w-[475px] h-[551px] relative
                md:w-full md:rounded-none'>

                    {/* Boton de cerrar modal */}
                    <FontAwesomeIcon
                    onClick={() => props.open(false)}
                    icon={faX}
                    className='absolute right-5 top-5 text-violet_dark w-[12px] z-50 ursor-pointer'/>

                    {/* Imagen */}
                    <Image
                    src="https://res.cloudinary.com/dfddh08q8/image/upload/v1707320677/images/jfiusky8gpmn9cu8qkfw.png"
                    width={141}
                    height={140}
                    />

                    {/* Texto */}
                    <div className=' font-semibold text-[24px] text-[#4F4F4F] text-center mb-[25px] mt-[37px]
                    md:text-[21px]'>

                        {"You're on the list! "}

                        {/* Text */}
                        <p className='text-[16px] font-medium mt-[20px]'>
                            {"We'll keep you posted on all the latest news."}
                            {/* {t("card4.2.sendOK")} */}
                        </p>

                        {/* Boton */}
                        <button 
                        className={`bg-primary rounded-full text-white w-full p-2 text-[20px] transition-all mt-[37px]
                        hover:bg-[#4ED5F2] hover:shadow-[0px_4px_14px_0px_#3CBBD661]`}
                        onClick={() => props.open(false)}>
                            Great!
                        </button>
                    </div>


                </div>
                }
            </div>
        </div>
    )
}
