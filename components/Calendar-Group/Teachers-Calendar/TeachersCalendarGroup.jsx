
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useSession } from "next-auth/react"
import React, { useState, useEffect } from 'react';
import MeetingPlaning from "../../Calendar/MeetingPlaning";
import { TeacherMeetingAgenda } from './TeacherMeetingAgenda'
import { TeacherCardsButton } from './TeacherCardsButton'
import { HoursMeetingTeacher } from './HoursMeetingTeacher'
import { useSelector } from 'react-redux';
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
    isBefore,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import useStudent from '../hooks/useStudent';

//Componente donde se ven los Meets agendados del usuario logueado
//sea profesor alumno o guia
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const TeachersCalendarGroup = () => {

    const teacherCards = useSelector((state) => state.datos.cards)
    const cardDetail = useSelector((state) => state.datos.cardDetail);
    const { selectedTeacherId } = useStudent()

    const { data: session, status, update } = useSession();
    const [renders, setRenders] = useState({ user: { role: "user", calendarGroup: [{}], image: 'https://res.cloudinary.com/dfddh08q8/image/upload/v1695578432/images/4_svg8uq.png' } })
    const [newcalendar, setCalendar] = useState([]);
    let [newMeeting, setNewMeeting] = useState()
    const [idTeacher, setidTeacher] = useState('')
    const [hoursMeet, setHoursMeet] = useState('')

    let selectedDayMeetings = [];

    function takeCardId(id) {
        setidTeacher(id)
    }
    function takeHoursMeet(hours) {
        setHoursMeet(hours)
    }

    useEffect(() => {
        //update();
        if (session) {
            setRenders(session)
            setCalendar(session.user.calendarGroup)

        }
        setRenders(session)
        if (cardDetail) {
            if (Object.keys(cardDetail).length !== 0) {
                //     console.log('CalendarStudent 82', cardDetail)

                const fecha = today; Fragment
                const offsetMinutes = fecha.getTimezoneOffset();
                const offsetHours = offsetMinutes / 60;
                const offsetSign = offsetHours > 0 ? '-' : '+';
                const offsetHoursAbs = Math.abs(offsetHours);
                const formattedOffset = `${offsetSign}${String(offsetHoursAbs).padStart(2, '')}`;
                const utnUser = parseInt(formattedOffset, 10);
                const last = cardDetail.calendar.length;
                const utnToG = cardDetail.calendar[last - 1].utnCreated;
                const deltaTime2 = (utnUser - utnToG) * 3600000;
                //aca voy a modificar los calendarios para modificar los utn de las horas no asignadas
                const details2 = { ...cardDetail };
                details2.calendar = details2.calendar.map(calendar1 => {
                    if (!calendar1.assigned) {
                        // Si 'assigned' es false, actualizar el valor
                        return {
                            ...calendar1, userstartDatetime: format(new Date(parseISO(calendar1.startDatetime).getTime() + deltaTime2), "yyyy-MM-dd'T'HH:mm"),
                            userendDatetime: format(new Date(parseISO(calendar1.endDatetime).getTime() + deltaTime2), "yyyy-MM-dd'T'HH:mm")
                        };
                    }
                    // Si 'assigned' es true, dejar el objeto sin cambios
                    return calendar1;
                });
                //    console.log(' CalendarStudent 105', details2)
                setPersonSchedule(details2)
                //   alert(1)
            }
            else {
                //alert(2)
                async function carDet() {
                    if (selectedTeacherId) {
                        try {
                            // console.log('id2',id)
                            const details = await fetch('/api/users/' + selectedTeacherId).then(response => response.json())
                            //setPersonSchedule(details);
                            //   console.log(' CalendarStudent 89',details)
                            // console.log(' CalendarStudent 90',personSchedule)
                        } catch (error) {
                            console.error('Error fetching user details:', error);
                        }
                    }
                }
                carDet()
            }
        } else {
            async function carDet() {
                try {
                    //  console.log('CalendarStudent id2', id)
                    const details = await fetch('/api/users/' + selectedTeacherId).then(response => response.json())
                    const details2 = { ...details.userid };
                    const fecha = today; Fragment
                    const offsetMinutes = fecha.getTimezoneOffset();
                    const offsetHours = offsetMinutes / 60;
                    const offsetSign = offsetHours > 0 ? '-' : '+';
                    const offsetHoursAbs = Math.abs(offsetHours);
                    const formattedOffset = `${offsetSign}${String(offsetHoursAbs).padStart(2, '')}`;
                    const utnUser = parseInt(formattedOffset, 10);
                    const last = details.userid.calendarGroup.length;
                    const utnToG = details.userid.calendarGroup[last - 1].utnCreated;
                    const deltaTime2 = (utnUser - utnToG) * 3600000;
                    //aca voy a modificar los calendarios para modificar los utn de las horas no asignadas
                    details2.calendarGroup = details2.calendarGroup.map(calendar1 => {
                        if (!calendar1.assigned) {
                            // Si 'assigned' es false, actualizar el valor
                            return {
                                ...calendar1, userstartDatetime: format(new Date(parseISO(calendar1.startDatetime).getTime() + deltaTime2), "yyyy-MM-dd'T'HH:mm"),
                                userendDatetime: format(new Date(parseISO(calendar1.endDatetime).getTime() + deltaTime2), "yyyy-MM-dd'T'HH:mm")
                            };
                        }
                        // Si 'assigned' es true, dejar el objeto sin cambios
                        return calendar1;
                    });
                    //  console.log('CalendarStudent 156',deltaTime2)
                    //  console.log('CalendarStudent 157',details2)
                    setPersonSchedule(details2);
                    //   console.log('CalendarStudent 102',personSchedule)
                    // console.log('CalendarStudent 103',details)
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
            carDet()
        }


    }, [session, selectedTeacherId])



    //console.log('session 109',session)
    let today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)
    const [i, setI] = useState(0)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    if (renders) {
        selectedDayMeetings = renders?.user?.calendarGroup?.filter((meeting) =>
            isSameDay(parseISO(meeting.startDatetime), selectedDay))
    }


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

    function firstMeetingDay(day) {
        const firstMeeting = []
        isAfter(day, today) && teacherCards?.calendarGroup?.map((meeting) => {

            if (!meeting.assigned && isSameDay(parseISO(meeting.userstartDatetime), day)) {
                firstMeeting.push(meeting)
            }
        })
        //console.log(firstMeeting.length)
        setNewMeeting(firstMeeting.find(meeting => !meeting.assigned))
    }



    if (!teacherCards || Object.keys(teacherCards).length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                {/* <Spinner /> */}
            </div>
        )
    }

    return (
        <div className="pt-40">


            <div className="px-[60px] flex justify-between
      sm:px-7 md:max-w-6xl md:px-[25px]">


                <TeacherMeetingAgenda teacherCards={teacherCards} idTeacher={idTeacher} selectedDay={selectedDay} hoursMeet={hoursMeet} />


                <div className="flex justify-center w-full
        md:flex-col">
                    {/* Calendario */}
                    <div className="w-[60%]
          md:w-full">

                        {/* Mes y botones de cambio de mes */}
                        <div className='flex mt-[16px]
            md:mt-[30px]'>

                            {/* Botones para cambiar de Mes */}
                            <div className='flex mr-3
              md:w-full md:justify-between'>

                                {/* Boton para Anterior mes */}
                                <button
                                    type="button"
                                    onClick={previousMonth}
                                    className="-my-1.5 flex flex-none items-center justify-center  text-gray-400 hover:text-gray-500"
                                >
                                    <span className="sr-only">Previous month</span>
                                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                                </button>


                                {/* Mes del calendario Responsive */}
                                <h3 className="font-semibold text-[14px] text-violet_dark hidden
                md:flex">
                                    {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).charAt(0).toUpperCase() + format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).slice(1)}
                                </h3>

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
                            <h3 className="font-semibold text-[14px] text-violet_dark
              md:hidden">
                                {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).charAt(0).toUpperCase() + format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).slice(1)}
                            </h3>


                        </div>

                        <div className="grid grid-cols-7 mt-[15px] text-base leading-6 text-center text-white bg-primary
            md:text-[14px]">
                            <div>Dom</div>
                            <div>Lun</div>
                            <div>Mar</div>
                            <div>Mie</div>
                            <div>Jue</div>
                            <div>Vie</div>
                            <div>Sáb</div>
                        </div>

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
                                        onClick={() => { setSelectedDay(day); firstMeetingDay(day) }}
                                        className={classNames(
                                            isBefore(day, startOfToday(new Date())) && 'opacity-[50%] pointer-events-none',
                                            isEqual(day, selectedDay) && 'text-white',
                                            !isEqual(day, selectedDay) && isToday(day) && 'text-primary text-lg ',
                                            !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                                            !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                                            isEqual(day, selectedDay) && isToday(day) && 'bg-success',
                                            isEqual(day, selectedDay) && !isToday(day) && 'bg-success',
                                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                            (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                            teacherCards?.some((teach) => (teach._id === idTeacher && teach.calendarGroup?.some((meeting) =>
                                                //Los dias de meetings deben ser despues de la fecha de hoy y deben tener disponibilidad
                                                (isAfter(parseISO(meeting.startDatetime), today)) && isSameDay(parseISO(meeting.startDatetime), day) && meeting.assigned) && !isEqual(day, today))) && "rounded-full bg-gray-200 text-primary text-lg",
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                    >

                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>

                                    </button>

                                    <div className="w-1 h-1 mx-auto mt-1">
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <HoursMeetingTeacher
                    teacherCards={teacherCards}
                    renders={renders}
                    selectedDay={selectedDay}
                    idTeacher={idTeacher}
                    takeHoursMeet={takeHoursMeet}
                />
            </div>
            <div>
                {idTeacher ? idTeacher : 'No hay'}
                <TeacherCardsButton teacherCards={teacherCards} takeCardId={takeCardId} />
            </div>
        </div >
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

