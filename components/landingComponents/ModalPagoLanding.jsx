import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Logo from '../../public/imgs/logo-gradient.png';
import Image from 'next/image';
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlansAync from '../Plan/PlansAync2';
import {sendEmail} from './functions';

export default function ModalPagoLanding({setOpen}) {
    const { t } = useTranslation('index');
   // Definir el estado para almacenar la cadena
   const [inputString, setInputString] = useState('');
   const [validateEmail, setvalidateEmail] = useState(false);
   const [emailok, setEmailok] = useState(false);

   function openaEmailIN() {setEmailok(true)}
  // Función para manejar cambios en el input
  const handleInputChange = (event) => {
    setInputString(event.target.value);
    // Expresión regular para validar un correo electrónico
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setvalidateEmail(regex.test(event.target.value))
};
function send(){
  //si se desea enviar otro tipo de email, se debe pasar un 
  //2do valor como para escoger los distintos
  //tipos de mensajes que se desean enviar, tomarlo de la entrada
  //en la funcion send()
  sendEmail(inputString);
  
  alert('Su email sera respondido a la prontitud / Your email will be responded to promptly');
  setOpen(false)

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
                   {/*Para escribir email */}
                   <div className=' font-medium text-[28px] bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text min-h-[28px] text-center mb-[25px]
                    md:text-[21px]'>
                        {emailok && t("modalEmailLanding.0")}
                    </div>

                    {/* Input */}
                    {
                    emailok &&
                    <input
                    placeholder={t("modalEmailLanding.2")}
                    className='rounded-md border-2 border-primary outline-primary_hover p-3 w-full mb-3'
                    type="text"
                    value={inputString} onChange={handleInputChange} />}

                    {/* Email Invalido o valido message */}
                    {/* {inputString.length > 6 && !validateEmail && <div className='text-red-500'> {t("card4.2.emailInvalid")}</div>} */}

                    {/* boton de enviar */}
                    {
                    emailok &&
                    <div className='flex justify-center  text-center '>
                        <button 
                        className={`bg-primary rounded-md text-white w-full p-2 ${!validateEmail && 'hidden'} transition-all
                        hover:bg-[#4ED5F2] hover:shadow-[0px_4px_14px_0px_#3CBBD661]`}
                        onClick={() => send()}>{t("modalEmailLanding.1")}</button>
                                
                        <div
                        className={`bg-primary rounded-md text-white w-full p-2 ${validateEmail && 'hidden'} opacity-50 pointer-events-none`}>
                            {t("modalEmailLanding.1")}
                        </div>
                    </div>}


                      {/*Modal de pago que no anda aun */}
                      {!emailok&& <PlansAync closePlan={setOpen} openaEmailIN={openaEmailIN} / >}
               

                
                
                    
                </div>
            </div>
        </div>
    )
}
