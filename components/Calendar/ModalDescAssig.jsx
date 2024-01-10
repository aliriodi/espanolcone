import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { get } from 'mongoose';

const { sendEmail, sendBDmeet, modifyUserCalendar } = require('./functionAssigmentMeet')

export default function MeetAssigment({ renders, meeting, personSchedule, openPay, openButton,setDescription }) {

    const [buttonOn, setButtonOn] = useState(true);
    const [descAsigment, setDescAsigment] = useState(false);
    const [inputString, setInputString] = useState(meeting?.meet ? meeting.meet : '');
    //Definir cuando el mensaje esta listo para enviar
    const [messageReady, setmessageReady] = useState(false);
    const [remainingCharacters, setRemainingCharacters] = useState(120);

    //Este useEffect es para cambiar el estado de la ruta del meet a 
    // medida que se cambia el meet
    useEffect(() => {
        setInputString(meeting?.description ? meeting.description : '');
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
    //funcion para enviar description al teacher
    function SendDescAssigment() {
        // //console.log(renders.user.calendar)
        // modifyUserCalendar(meeting.iduser, meeting, inputString)

        // renders.user.calendar.map(meet => {
        //     if (meet.startDatetime === meeting.startDatetime) {
        //         meet['meet'] = inputString;
        //         //  console.log(meet)
        //     }
        // })
        //alert('enviando descrition')
        setDescription(inputString);
        
        openPay(true);
       
        setDescAsigment(false)
        openButton(false);
    };

    //funcion para  asignar description o tema de hablar en clase
    function YeAssinGTP() {
        setDescAsigment(true);
        

    };
    //funcion para no asignar description o tema de hablar en clase
    function NoAssignGTP() {
        openButton(false);
        setDescAsigment(false)
        openPay(true);
    };

    return (
        <div>
            {/* Boton para habilitar modal de asignacion de meet */}
            <section >
                <div>

                </div>
            </section>

            {/* Modal de asigancion de description ON */}
            <section>
                {buttonOn ?
                    <div>
                        <div
                            onClick={() => { openButton(false) }}
                            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

                            <div
                                onClick={(e) => e.stopPropagation()}
                                className='bg-white rounded-md p-5 flex flex-col w-[700px] relative
                                md:w-full'>

                                <FontAwesomeIcon
                                    onClick={() => { openButton(false) }}
                                    icon={faX}
                                    className='absolute right-5 top-5 text-violet_dark' />
                                <div className=' text-violet_dark'>Si desea incluir un tema especifico para profundizar en su clase seleccione <span className='text-primary'><b>SI / YES</b></span>, en caso contrario seleccione <span className='text-primary'><b>NO / NO</b></span> y sera dirigido a la seccion de pagos.</div>
                                
                                <div className='relative top-2 text-light'>If you want to include a specific topic to delve into in your class, select <span className='text-primary'><b>SI / YES</b></span>, otherwise select <span className='text-primary'><b>NO / NO</b></span> and you will be directed to the payment section.</div>

                                <div className='flex flex-col content-center top-2 relative mt-2'>
                                    <div><button onClick={() => YeAssinGTP()} className={' bg-primary rounded-md text-white w-full p-2 my-1 '}>SI / YES</button></div>
                                    <div><button onClick={() => NoAssignGTP()} className={' border-2 border-primary rounded-md text-primary font-medium w-full p-2 my-1 '}>NO / NO</button></div>
                                </div>

                            </div>

                        </div>
                    </div> : null}

            </section>

            {/* Modal de asigancion de description */}
            <section>
                {descAsigment ?
                    <div>
                        <div
                            onClick={() => {setDescAsigment(false);openButton(false)}}
                            className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

                            <div
                                onClick={(e) => {e.stopPropagation()}}
                                className='bg-white rounded-md p-5 flex flex-col w-[700px] relative'>

                                <FontAwesomeIcon
                                    onClick={() =>{ setDescAsigment(false); openButton(false);}}
                                    icon={faX}
                                    className='absolute right-5 top-5 text-violet_dark' />
                                <div div className='py-2'>¿Qué tema desea profundizar?</div>
                                <div div className='py-2'>What topic do you want to delve into?</div>
                                {/* Textarea */}
                                <textarea
                                    className='rounded-md border-2 border-primary outline-primary_hover p-2 w-full'
                                    value={inputString}
                                    onChange={handleInputChange}
                                    maxLength={120}
                                    rows={2} // Establecer un número inicial de filas
                                />
                                <div className='px-4 text-right'>{remainingCharacters + '/120'}</div>
                                <div className='p-1 text-center'>

                                    {messageReady ?
                                        <button className={' bg-primary rounded-md text-white w-1/3 p-2 mt-1 '}
                                            onClick={() => SendDescAssigment()}>
                                            Asignar tema
                                        </button> :
                                        <button className={'bg-primary rounded-md text-white w-1/3 p-2 mt-1 opacity-50'} disabled>
                                            Asignar tema
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
