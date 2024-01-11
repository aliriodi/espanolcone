import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Logo from '../../public/imgs/logo-gradient.png';
import Image from 'next/image';
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ModalListTourist({open,setOpen}) {
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
                onClick={() => setOpen(false)}
                className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]'>



                <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-md p-5 flex flex-col w-[700px] relative
                md:w-full md:rounded-none'>

                    {/* Boton de cerrar modal */}
                    <FontAwesomeIcon
                        onClick={() => setOpen(false)}
                        icon={faX}
                        className='absolute right-5 top-5 text-violet_dark w-[12px] z-50 ursor-pointer'/>
                    
                    {/* Logo */}
                    <div className=' flex justify-center flex-col items-center relative mb-[30px]'>
                        <Image  src={Logo} className='' style={{ width: '100px' }} alt="Logo" />
                    </div>

                
                

                
                
                    
                </div>
            </div>
        </div>
    )
}
