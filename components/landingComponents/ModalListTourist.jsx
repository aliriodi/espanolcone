import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

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

                    body: JSON.stringify({ email: inputString, suscribe: true }),
                })


        } catch (error) {
            console.log(error);
        }
        setEmailok(true)
        setTimeout(function () {
            props.open(false)
        }, 2000);


    }
    return (
        <div>
            <div
                onClick={() => props.open(false)}
                className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>



                <div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white rounded-md p-5'>

                    {/* Logo */}
                    <div className=' flex justify-rigth flex-col border-b-2 pb-5 items-center relative'>

                        {/* <Image  src={Logo} className='mb-6' style={{ width: '100px' }} alt="Logo" /> */}
                        <button className='rounded-md text-white  bg-red-500' onClick={() => props.open(false)}> X </button>
                        <div className='text-[18px] text-light bg-white'>
                            {!emailok && t("card4.2.messageModal")}
                        </div>
                        {!emailok && <input className='border-2 ' type="text" value={inputString} onChange={handleInputChange} />}

                        {/* Email Invalido o valido message */}
                        {/* {inputString.length > 6 && !validateEmail && <div className='text-red-500'> {t("card4.2.emailInvalid")}</div>} */}

                        {/* boton de enviar */}
                        {!emailok &&  <div className='flex justify-center  text-center '>
                                          <button className={'bg-primary rounded-md text-white ' +
                                                           (!validateEmail && 'hidden') }
                                                  style={{ width: '68px', height: '30px' }}
                                                  onClick={() => sendList()}>{t("card4.2.send")}</button>
                                                  
                                                  <div className={'  bg-primary rounded-md text-white ' +
                                                           (validateEmail && 'hidden') }
                                                           style={{ width: '68px', height: '30px' }}> {t("card4.2.send")}</div>
                                     </div>}


                        {/* Mostrar mensaje email agendado */}
                        {emailok && <div>{t("card4.2.sendOK")}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
