import React, { useEffect } from "react"
import MeetAssigment from "../../Calendar/MeetAssigment"
import { format, parseISO } from 'date-fns'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';



export const MeetingStudent = ({ meeting, renders }) => {

    let startDateTime = parseISO(meeting.startDatetime)
    let endDateTime = parseISO(meeting.endDatetime)

    useEffect(() => console.log(meeting), [])

    return (
        <li className="flex items-center px-4 py-2 space-x-4 group focus-within:bg-gray-100 hover:bg-gray-100 border-b-2 last-of-type:border-none
    md:flex-col">

            {/* Imagen de Perfil */}

            <div className='flex-none w-10 h-10 rounded-full bg-[#B9B9C3] relative overflow-hidden flex justify-center items-center'>
                {
                    meeting?.image?.url ?
                        <Image
                            src={meeting?.image?.url || meeting?.image}
                            alt="img"
                            className="object-cover"
                            width={160}
                            height={160}
                        />

                        :

                        <FontAwesomeIcon className="text-violet_dark w-[60%] h-[60%]" icon={faUser} />

                }
            </div>

            {/* Datos del usuario */}
            <div className="flex justify-between w-full md:flex-col md:items-center">
                {meeting.assigned ? true : <p className="text-gray-900">Meeting no asignado aún</p>}

                {/* Nombre */}
                <p className="text-gray-900">{meeting.first_name + ' ' + meeting.last_name}</p>

                {/* Para asignar el enlace Zoom o meet */}
                <MeetAssigment renders={renders} meeting={meeting} />
                {/* Role */}
                <p className="text-gray-900 md:hidden">{meeting.role}</p>

                {/* Hora */}
                <p className="mt-0.5 text-primary">
                    <time dateTime={meeting.startDatetime}>
                        {format(startDateTime, 'h:mm a')}
                    </time>{' '}
                    -{' '}
                    <time dateTime={meeting.endDatetime}>
                        {format(endDateTime, 'h:mm a')}
                    </time>


                </p>
            </div>

        </li>
    )
}