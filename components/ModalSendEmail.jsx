import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useSession } from "next-auth/react";

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
                    })
        }
        catch (error) {
            console.error(error);
        }
        setMessageok(true)
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

                            {/* para eliminar */}
                            {/* {!emailok && t("card4.2.messageModal")} */}

                        </div>


                        {/* {!messageok && <p> <input className='border-2 ' type="text" value={inputString} onChange={handleInputChange} /></p>} */}
                       {!messageok &&<div className="">
                        <textarea
                            className='rounded-md border-2 border-primary '
                            value={inputString}
                            onChange={handleInputChange}
                            maxLength={200}
                            rows={4} // Establecer un número inicial de filas
                        />
                         <p className="">{remainingCharacters + '/200'}</p>
                        </div>}
                       
                       
                        {/* Email Invalido o valido message */}
                        {/* {inputString.length > 6 && !validateEmail && <div className='text-red-500'> {t("card4.2.emailInvalid")}</div>} */}

                        {/* boton de enviar */}
                        {!messageok && <div className='flex justify-center  text-center '>
                            <button className={'bg-primary rounded-md text-white ' +
                                (messageReady && 'hidden')}
                                style={{ width: '68px', height: '30px' }}
                                onClick={() => sendEmail()}>Enviar</button>

                            <div className={'  bg-primary rounded-md text-white ' +
                                (!messageReady && 'hidden')}
                                style={{ width: '68px', height: '30px' }}> Enviar</div>
                        </div>}


                        {/* Mostrar mensaje  Email enviado*/}
                        {messageok && <div>Mensaje Enviado, ¡Le responderemos a la prontitud posible!</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
