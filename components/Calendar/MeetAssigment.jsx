import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { get } from 'mongoose';

const { sendEmail,  sendBDmeet , modifyUserCalendar} = require('./functionAssigmentMeet')

export default function MeetAssigment({ renders, meeting }) {

    const [meetasigment, setMeetAsigning] = useState(false);
    const [inputString, setInputString] = useState(meeting?.meet ? meeting.meet : '');
    //Definir cuando el mensaje esta listo para enviar
    const [messageReady, setmessageReady] = useState(false);
    const [remainingCharacters, setRemainingCharacters] = useState(120);

    //Este useEffect es para cambiar el estado de la ruta del meet a 
    // medida que se cambia el meet
    useEffect(() => {
        setInputString(meeting?.meet ? meeting.meet : '');
    }, [meeting])

    // Función para manejar cambios en el input
    function handleInputChange(event) {
        const remainingChars = 120 - event.target.value.length;
        if (remainingChars >= 0) {
            setInputString(event.target.value);
            setRemainingCharacters(remainingChars);
        }
        // Expresión regular para validar mesaje tipo meet
        if (inputString.length > 10) {
            setmessageReady(true)
        } else { setmessageReady(false) }

    };
    //funcion para enviar meet
    function SendMeetAssigment() {
        //console.log(renders.user.calendar)
        modifyUserCalendar(meeting.iduser,meeting,inputString)

        renders.user.calendar.map(meet => {
            if (meet.startDatetime === meeting.startDatetime) {
                meet['meet'] = inputString;
              //  console.log(meet)
            }
        })
       
        
    
        //Envio correos a estudiante y a teacher
        sendEmail(renders, meeting)
        
        //actualizo el calendario del teacher
        sendBDmeet(renders.user.email, renders.user.calendar)
        setMeetAsigning(false)
     
    };
    return (
        <div>
            {/* Boton para habilitar modal de asignacion de meet */}
            <section >
                <div>
                    {meeting?.assigned ? <button onClick={() => setMeetAsigning(true)}>Asignar Meet</button> : null}
                </div>
            </section>

            {/* Modal de asigancion de Meet */}
            <section>
                {meetasigment ?
                    <div>
                        <div
                            onClick={() => setMeetAsigning(false)}
                            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>



                            <div
                                onClick={(e) => e.stopPropagation()}
                                className='bg-white rounded-md p-5 flex flex-col w-[700px] relative'>

                                <FontAwesomeIcon
                                    onClick={() => setMeetAsigning(false)}
                                    icon={faX}
                                    className='absolute right-5 top-5 text-violet_dark' />
                                <div div className='py-2'>Por favor indique la ruta para el meet de la clase:</div>
                                {/* Textarea */}
                                <textarea
                                    className='rounded-md border-2 border-primary outline-primary_hover p-2 w-full'
                                    value={inputString}
                                    onChange={handleInputChange}
                                    maxLength={120}
                                    rows={2} // Establecer un número inicial de filas
                                />
                                {meeting?.description?
                                <><div>Tema a dictar:</div>
                                <div>{meeting.description}</div></>:null
                                }
                                <div className='px-4 text-right'>{remainingCharacters + '/120'}</div>
                                <div className='p-1 text-center'>

                                    {messageReady ?
                                        <button className={' bg-primary rounded-md text-white w-1/3 p-2 mt-1 '}
                                            onClick={() => SendMeetAssigment()}>
                                            Asignar Meet
                                        </button> :
                                        <button className={'bg-primary rounded-md text-white w-1/3 p-2 mt-1 opacity-50'} disabled>
                                            Asignar Meet
                                        </button>
                                    }

                                </div>
                            </div>

                        </div>
                    </div> : null}

            </section>
        </div>
    )
}
