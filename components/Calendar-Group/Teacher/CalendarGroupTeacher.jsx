
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useSession } from "next-auth/react"
import React, { useState, useEffect, Fragment } from 'react';
import MeetingPlaning from "../../Calendar/MeetingPlaning";
import { MeetingStudent } from './MeetingStudent'
import { es } from 'date-fns/locale';
import {
    add,
    addHours,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isAfter,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'

//Componente donde se ven los Meets agendados del usuario logueado
//sea profesor alumno o guia
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const CalendarGroupTeacher = () => {

    //Esta es la agenda donde el profesor puede asignar 
    //sus horas de trabajo y poder ver la cantidad de citas
    //o meetings que tiene agendado
    //En el perfil del profesor se trae su calendar de la BD y observa todo
    const [calendar, setCalendar2] = useState([]);
    const { data: session, status, update } = useSession();
    const [renders, setRenders] = useState({ user: { role: "user", calendarGroup: [{}], image: 'https://res.cloudinary.com/dfddh08q8/image/upload/v1695578432/images/4_svg8uq.png' } })
    const [newcalendar, setCalendar] = useState([]);
    // Termina section de BD ahora viebne el codigo que usa los datos
    let selectedDayMeetings = [];

    useEffect(() => {
        //update();
        if (session) {
            setRenders(session)
            setCalendar(session.user.calendarGroup)

        }
    }, [session])


    //console.log('session 109',session)
    let today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)
    const [i, setI] = useState(0)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    if (renders) {
        const studentsArray = renders.user?.calendarGroup?.map((student) => student.students);

        // Verificar que el arreglo no sea undefined
        if (studentsArray && studentsArray[0]) {
            const firstElement = studentsArray[0]; // Esto te dará el primer elemento
            selectedDayMeetings = firstElement.filter(meeting => isSameDay(parseISO(meeting.userstartDatetime), selectedDay));
        }
    }



    //funcion para agregar nuevo calendario a disposicion de estudiantes
    async function addNewElement(newElement) {
        setCalendar((prevCalendar) => [...prevCalendar, newElement]);
        try {
            //enviando disponibilidad de calendario a BD
            console.log('cargando newcalendar', newcalendar)

            await fetch('/api/users/update',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // body: JSON.stringify({ email: personSchedule.email, updates: { calendar: personSchedule.schedule } }),
                    body: JSON.stringify({ email: session.user.email, updates: { calendarGroup: [...newcalendar, newElement] } }),
                })

            update({ ...session, user: { ...session.user, calendarGroup: [...newcalendar, newElement] } });

        } catch (error) {
            console.log(error);
        }

        alert('Tu hora fue puesta a disposicion')
    };



    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }


    //Generando calendario 24 horas en el dia seleccionado
    const day = selectedDay;
    const hoursOfDay = [];
    // Obtener el UTN de la fecha
    const fecha = today;
    const offsetMinutes = fecha.getTimezoneOffset();
    const offsetHours = offsetMinutes / 60;
    const offsetSign = offsetHours > 0 ? '-' : '+';
    const offsetHoursAbs = Math.abs(offsetHours);
    const formattedOffset = `${offsetSign}${String(offsetHoursAbs).padStart(2, '')}`;
    const offsetNumber = parseInt(formattedOffset, 10);
    //Para obteneer el pais donde cargamos la fecha
    const options = { timeZoneName: 'long' };
    const timeZoneName = new Intl.DateTimeFormat('es', options).formatToParts(today);

    let country = '';
    for (const part of timeZoneName) {
        if (part.type === 'timeZoneName') {
            country = part.value.trim();
            break;
        }
    }

    //Generando las horas con sus atributos
    for (let i = 0; i < 24; i++) {
        const hour = addHours(day, i);
        const hour1 = addHours(day, i + 1);
        const startDatetime1 = format(hour, "yyyy-MM-dd'T'HH:mm");
        const endDatetime1 = format(hour1, "yyyy-MM-dd'T'HH:mm");
        hoursOfDay.push({
            assigned: false,
            description: '',
            preassigned: false,
            role: "",
            locationCreated: country,
            nameuser: "",
            first_name: "",
            last_name: "",
            locationscheduled: "",
            utnCreated: offsetNumber,
            utnscheduled: "",
            locationscheduled: "",
            iduser: null,
            email: "",
            image: "",
            startDatetime: startDatetime1,
            endDatetime: endDatetime1,
            userstartDatetime: "",
            userendDatetime: ""

        });
    }

    return (
        <div className="pt-[105px]">
            <button className="ml-32 mb-12 bg-[#3cbbd6] text-white py-2 px-4 rounded hover:bg-[#35a5c2] focus:outline-none focus:ring-2 focus:ring-[#3cbbd6] focus:ring-opacity-50">
                <a href="/inicio/calendar">Ir a clases individuales</a>
            </button>
            <div className="px-[60px] flex justify-between
      sm:px-7 md:max-w-6xl md:px-[25px]">
                <div className="flex justify-between w-full
        md:flex-col">
                    {/* Calesndario */}
                    <div className="bg-white rounded-[5px] p-[16px] w-[60%] shadow-[0px_4px_24px_#18292F1A]
          md:w-full md:mb-4">
                        <div className="flex flex-col">
                            <h2 className='md:text-[18px]'>Calendario Grupal</h2>
                            <p className='md:text-[18px]'>Selecciona una fecha para ver a los estudiantes</p>
                            <div className='flex mt-[16px]'>
                                {/* Botones para cambiar de Mes */}
                                <div className='flex mr-3'>
                                    {/* Boton para Anterior mes */}
                                    <button
                                        type="button"
                                        onClick={previousMonth}
                                        className="-my-1.5 flex flex-none items-center justify-center  text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">Previous month</span>
                                        <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                                    </button>

                                    {/* Boton para Siguiente mes */}
                                    <button
                                        onClick={nextMonth}
                                        type="button"
                                        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">Next month</span>
                                        <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                                    </button>

                                </div>

                                {/* Mes del calendario */}
                                <h3 className="font-semibold text-[14px] text-violet_dark">
                                    {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).charAt(0).toUpperCase() + format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).slice(1)}
                                </h3>

                            </div>

                        </div>
                        {/* Encabezado de Dias */}
                        <div className="grid grid-cols-7 mt-[15px] text-base leading-6 text-center text-white bg-primary
            md:text-[14px]">
                            {/* <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500"> */}
                            <div>Dom</div>
                            <div>Lun</div>
                            <div>Mar</div>
                            <div>Mie</div>
                            <div>Jue</div>
                            <div>Vie</div>
                            <div>Sáb</div>
                        </div>
                        {/* Calendario */}
                        <div className="grid grid-cols-7 mt-2 text-sm">
                            {days.map((day, dayIdx) => (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day)],
                                        'py-1.5'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedDay(day)}
                                        className={classNames(
                                            isEqual(day, selectedDay) && 'text-white',
                                            !isEqual(day, selectedDay) && isToday(day) && 'text-primary text-lg ',
                                            !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                                            !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                                            isEqual(day, selectedDay) && isToday(day) && 'bg-success',
                                            isEqual(day, selectedDay) && !isToday(day) && 'bg-success',
                                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                            (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                    </button>
                                    <div className="w-1 h-1 mx-auto mt-1">
                                        {/* aca deberia ir los meets que tienen estilos, los dias disponibles y /o reservados 
                    para estudiantes y mas abajo otro para profesores donde cargan calendarios o tienen vista
                    de cit
                    as */}
                                        {/* {renders[i].schedule.some((meeting) => */}
                                        {renders?.user?.calendarGroup?.some((meeting) =>
                                            (isSameDay(parseISO(meeting.startDatetime), day) && meeting.assigned) ||
                                            (newcalendar.some((meeting1) => isSameDay(parseISO(meeting1.startDatetime), day) && meeting1.assigned))
                                        ) && (
                                                <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                            )}

                                        {/* {renders[i].schedule.some((meeting) => */}
                                        {renders?.user?.calendarGroup?.some((meeting) =>
                                            (isSameDay(parseISO(meeting.startDatetime), day) && !meeting.assigned) ||
                                            (newcalendar.some((meeting1) => isSameDay(parseISO(meeting1.startDatetime), day) && !meeting1.assigned)
                                            )) && (
                                                <div className="w-1 h-1 rounded-full bg-success  "></div>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Separador */}
                        {/* <span className='flex mx-auto w-full h-[2px] bg-gray_clear my-[50px]'></span> */}

                        {/* Horarios */}
                        {
                            isAfter(selectedDay, today) ?
                                renders?.user?.role.includes('teacher') || renders?.user?.role.includes('guides') ?
                                    <div className='max-w-fit grid grid-cols-1 divide-x object-none object-right-top mt-10'>
                                        <h2 className='md:text-[18px]'>
                                            Selecciona un Horario
                                        </h2>
                                        <div className='border-none md:text-[14px]'>
                                            {/* Botones de Turnos */}
                                            {
                                                (renders?.user?.role.includes('teacher') || renders?.user?.role.includes('guides')) && isAfter(selectedDay, today) ?

                                                    <div className='w-full relative my-4 flex justify-between'>
                                                        <button className={`border-primary border-solid border-2 rounded-[5px] flex-grow-[1] mx-1 text-primary ${i == 0 && 'bg-primary text-white'}`} onClick={() => setI(0)}>
                                                            Turno 1
                                                        </button>

                                                        <button className={`border-primary border-solid border-2 rounded-[5px] flex-grow-[1] mx-1 text-primary ${i == 1 && 'bg-primary text-white'}`} onClick={() => setI(1)}>
                                                            Turno 2
                                                        </button>

                                                        <button className={`border-primary border-solid border-2 rounded-[5px] flex-grow-[1] mx-1 text-primary ${i == 2 && 'bg-primary text-white'}`} onClick={() => setI(2)}>
                                                            Turno 3
                                                        </button>

                                                        <button className={`border-primary border-solid border-2 rounded-[5px] flex-grow-[1] mx-1 text-primary ${i == 3 && 'bg-primary text-white'}`} onClick={() => setI(3)}>
                                                            Turno 4
                                                        </button>

                                                    </div>

                                                    :
                                                    null
                                            }
                                            {/* Horarios */}
                                            <ul className="flex  flex-wrap
                      md:justify-center">
                                                {
                                                    hoursOfDay.length > 0 ? (
                                                        hoursOfDay.slice(i * 6, (i + 1) * 6).map((meeting, index) => (
                                                            <button key={index} onClick={() => addNewElement(meeting)}
                                                                className={classNames(
                                                                    'focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-secondary hover:bg-secondary_light border-solid border-[2px] border-secondary transition-all mx-1',
                                                                    selectedDayMeetings.some((meeting1) => meeting1.startDatetime === meeting.startDatetime && meeting1.assigned)
                                                                    && 'border-red-500 border-solid border-[2px] hover:border-primary',
                                                                    newcalendar.some((meeting1) => meeting1.startDatetime === meeting.startDatetime) && 'bg-secondary text-white hover:bg-secondary'
                                                                )}

                                                                //Para deshabilitar el boton cuando haya meeting
                                                                disabled={
                                                                    selectedDayMeetings.some((meeting1) => meeting1.startDatetime === meeting.startDatetime && meeting1.assigned)
                                                                    || newcalendar.some((meeting1) => meeting1.startDatetime === meeting.startDatetime)}
                                                            >
                                                                <MeetingPlaning key={index} meeting={meeting} assigned={selectedDayMeetings.some((meeting1) => meeting1.startDatetime === meeting.startDatetime && meeting1.assigned)} /></button>
                                                        ))
                                                    ) : (
                                                        <p>No hay actividad agendada aún.</p>
                                                    )}

                                            </ul>

                                        </div>

                                    </div>
                                    : null
                                :
                                isEqual(selectedDay, today) && (renders?.user?.role.includes('teacher') || renders?.user?.role.includes('guides')) ?

                                    <span className='pt-14 '>
                                        <h2 className="py-20 text-gray_clear text-center
                  md:text-[18px]">
                                            Si desea planificar hoy comuniquese con el Admin, ¡sino seleccione un dia despues de hoy!
                                        </h2>
                                    </span>
                                    :
                                    (renders?.user?.role.includes('teacher') || renders?.user?.role.includes('guides')) ? <span className='pt-14 '><h2 className="pt-20 font-semibold text-gray-900">No se puede planificar</h2></span> : null}
                    </div>

                    {/* Agenda de Meetings */}
                    <div className="bg-white shadow-[0px_4px_24px_#18292F1A] w-[38%] rounded-[5px] p-[16px]
          md:w-full md:mb-4">

                        {/* Titulo */}
                        <div className='flex justify-between mb-5
            md:flex-col'>

                            <h2 className='md:text-[18px]'>

                                Agenda de Reuniones

                            </h2>

                            <h3 className='md:text-[15px]'>
                                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                    {format(selectedDay, 'MMM dd, yyy', { locale: es }).charAt(0).toUpperCase() + format(selectedDay, 'MMM dd, yyy', { locale: es }).slice(1)}
                                </time>
                            </h3>

                        </div>

                        {/* Meetings */}
                        <div className=''>
                            <ol className="">
                                {/* {console.log(selectedDayMeetings)} */}
                                {selectedDayMeetings.length > 0 ? (
                                    selectedDayMeetings.map((meeting, index) => (
                                        <MeetingStudent meeting={meeting} renders={renders} key={index} />
                                    ))
                                ) : (
                                    <li className='text-center mt-10 text-gray_clear'>No hay actividad agendada aún.</li>
                                )}
                            </ol>
                        </div>
                    </div>
                    {/* {crear Agenda}  console.log(renders)*/}
                    {/* {console.log(newcalendar)} */}
                    {/* { isAfter(selectedDay, today)?<>el dia es despues</>:<>el dia es antes</>} */}
                </div>
            </div>
        </div>
    )
}


let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
