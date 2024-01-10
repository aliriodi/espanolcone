import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSession } from "next-auth/react";
import Logo from '../public/imgs/logo-gradient.png';
import Image from 'next/image'
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ModalSendEmail(props) {
    const { t } = useTranslation('index');
    const { data: session, status, update } = useSession();
    // Definir el estado para almacenar la cadena
    const [inputString, setInputString] = useState('');
    //Definir cuando el mensaje esta listo para enviar
    const [messageReady, setmessageReady] = useState(false);
    //Definir cuando el mensaje fue enviado
    const [messageok, setMessageok] = useState(false);
    const [remainingCharacters, setRemainingCharacters] = useState(200);

    //usuario que envia email
    const [emailFrom, setEmailToSend] = useState(session?.user?.email);
    //Nombre de usuario que envia email
    const [name, setName] = useState(session?.user?.first_name + " " + session?.user?.last_name);

    // Carga
    const [isLoading, setIsLoading] = useState(false);

    // Función para manejar cambios en el input
    const handleInputChange = (event) => {
        const remainingChars = 200 - event.target.value.length;
        if (remainingChars >= 0) {
            setInputString(event.target.value);
            setRemainingCharacters(remainingChars);
        }
        // Expresión regular para validar un correo electrónico
        if (messageok.length > 10) {
            setmessageReady(true)
        }
    };

    async function sendEmail() {

        let massage = `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            *{
                font-family: 'Montserrat', sans-serif;
                color: #fff;
            }
            body {
            /* background-color: #f4f4f4; */
            margin: 0;
            padding: 0;
            }

            .container{
              background: linear-gradient(to left bottom, #4CCFEB 70%, #33bb99);
            }

            header {
            padding: 25px;
            text-align: center;
            background-color: #fff;
            border-radius: 0 0 60px;
            /*border-radius: 0 0 60% 60%;*/
            position: relative;
            }
            header img{
              width: 123px;
              height: 78.25px;
              margin-bottom: 15px;
              position: relative;
              z-index: 90;
            }
            header h1{
              position: relative;
              font-size: 28px;
              color: #4CCFEB;
              margin: 0;
            }

            .main {   
              text-align: center;
              padding: 25px;
              font-weight: 500;
            }
            .main p{
                margin: 0;
            }
            .main .mt{
                margin-top: 12px;
            }

            footer {
            /* background-color: #007bff; */
            color: #fff;
            padding: 10px;
            font-weight: 500;
            text-align: center;
            }
        </style>
        </head>
        <body>

          <div class="container">
            <header>
              <img src="https://espanolcone-five.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdfddh08q8%2Fimage%2Fupload%2Fs--4NefY4Ug--%2Fv1701173990%2Fimages%2Fl9hxqqm6urwlk6x8qdih.png&w=384&q=75"/>
            
            </header>
            
            <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
              <p>El cliente <strong>${name}</strong> ha enviado el siguiente mensaje:</p>
              <br>
              <p ><strong>"${inputString}"</strong></p>
              <br>
              <p>El email a ser respondido es: ${emailFrom}</p>
              
              
              
            </div>
            
            <footer style="font-size: 18px;">
            
            </footer>
          </div>
        </body>
        </html>
        `

        setIsLoading(true);

        try {
            //envio email a teacher
            await
                fetch('/api/mail/',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            to: 'espanolconeacademy@gmail.com',
                            subject: 'Email enviado desde la APP: ' + name,
                            html: massage
                        })
                    }).then(result=>setIsLoading(false))
        }
        catch (error) {
            setIsLoading(false)
            console.error(error);
        }
        setMessageok(true)
        setTimeout(function () {
            props.open(false)
        }, 2500);


    }


    return (
        <div>
            <div
                onClick={() => props.open(false)}
                className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>



                <div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white rounded-md p-5 flex flex-col w-[700px] relative
                    md:w-full md:rounded-none'>

                    <FontAwesomeIcon
                        onClick={() => props.open(false)}
                        icon={faX}
                        className='absolute right-5 top-5 text-violet_dark'/>
                    
                    <div className='flex items-center mb-[30px] flex-col'>
                        <Image src={Logo} alt={'Logo'} className='w-[123px] h-[78px]'/>
                        <h3
                        className=' font-medium text-[28px] bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text min-h-[28px] text-center
                        md:text-[21px]'>Contactanos por email</h3>
                    </div>
                    
                    {/* Campo */}
                    {!messageok &&
                    <div className="mb-[25px]">

                        {/* Textarea */}
                        <textarea
                            className='rounded-md border-2 border-primary outline-primary_hover p-2 w-full'
                            value={inputString}
                            onChange={handleInputChange}
                            maxLength={200}
                            rows={4} // Establecer un número inicial de filas
                        />

                        {/* Cantidad maxima de caracters */}
                        <p className="px-4 text-right">{remainingCharacters + '/200'}</p>
                    </div>}
                    
                    
                    {/* boton de enviar */}
                    {
                        !messageok && 
                        <div className='flex justify-center  text-center w-full'>
                            <button className={'bg-primary rounded-md text-white w-full p-2 mt-1 '}
                                onClick={() => !messageReady && sendEmail()}>
                                    {
                                        !isLoading ?
                                        "Enviar" :
                                        (
                                            <div
                                                className="inline-block  h-5 w-5 animate-spin rounded-full border-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                role="status"
                                                >
                                                <span
                                                    className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip:rect(0,0,0,0)"
                                                >
                                                    Loading...
                                                </span>
                                            </div>
                                        )
                                        }
                            </button>
                        </div>
                    }


                    {/* Mostrar mensaje  Email enviado*/}
                    {
                        messageok &&
                        <div className='rounded-md text-white w-full p-2 mt-1 bg-secondary flex justify-center'>
                            <p>
                                Mensaje Enviado  <FontAwesomeIcon icon={faCircleCheck}/>
                            </p>                            
                        </div>}
                </div>
            </div>
        </div>
    )
}
