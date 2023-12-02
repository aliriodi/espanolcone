import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useSession } from "next-auth/react"
import React, { useState, useEffect, Fragment } from 'react';
import MeetingPlaning from "./MeetingPlaning";
import styles from '../../styles/navbar.module.css';
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
  isBefore,
  isAfter,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
//Componente donde se ven los Meets agendados del usuario logueado
//sea profesor alumno o guia
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  //Esta es la agenda donde el profesor puede asignar 
  //sus horas de trabajo y poder ver la cantidad de citas
  //o meetings que tiene agendado
  //En el perfil del profesor se trae su calendar de la BD y observa todo
  const [calendar, setCalendar2] = useState([]);
  const { data: session, status, update } = useSession();
  const [renders, setRenders] = useState({ user: { role: "user", calendar: [{}], image: 'https://res.cloudinary.com/dfddh08q8/image/upload/v1695578432/images/4_svg8uq.png' } })
  const [newcalendar, setCalendar] = useState([]);
  // Termina section de BD ahora viebne el codigo que usa los datos
  let selectedDayMeetings = [];

  useEffect(() => {
    //update();
    if (session) {
      setRenders(session)
      setCalendar(session.user.calendar)

    }
  }, [session])

  //console.log('session 109',session)
  let today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [i, setI] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  if (renders) {
    selectedDayMeetings = renders.user.calendar.filter((meeting) =>
      isSameDay(parseISO(meeting.userstartDatetime), selectedDay))
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
          body: JSON.stringify({ email: session.user.email, updates: { calendar: [...newcalendar, newElement] } }),
        })

      update({ ...session, user: { ...session.user, calendar: [...newcalendar, newElement] } });

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
    // console.log(endDatetime1,typeof(endDatetime1))
    // console.log(startDatetime1,typeof(endDatetime1))
    hoursOfDay.push({
      assigned: false,
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


  // de BD 
  //   let selectedDayMeetings = renders.user.calendar.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // )
  // let selectedDayMeetings = meetings.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // )


  return (
    <div className="pt-24">
      <div className="px-[60px] flex justify-between
      sm:px-7 md:max-w-6xl md:px-[25px]">

        <div className="flex justify-between w-full
        md:flex-col">

          {/* Calesndario */}
          <div className="bg-white rounded-[5px] p-[16px] w-[60%] shadow-[0px_4px_24px_#18292F1A]
          md:w-full md:mb-4">

            <div className="flex flex-col">

              <h2 className='md:text-[18px]'>Selecciona una fecha</h2>
              
              <h3 className='md:text-[18px]'>{session?.user?.first_name} posee(s)  {session?.user?.planSync?.length? session.user.planSync[session.user.planSync.length-1].qty:0} clases para agendar</h3>
                                                                                                                                                                                            {/* -session.user.planSync[session.user.planSync.length-1].classview   */}
              
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
                    {renders?.user?.calendar?.some((meeting) =>
                      (isSameDay(parseISO(meeting.userstartDatetime), day) && meeting.assigned) ||
                      (newcalendar.some((meeting1) => isSameDay(parseISO(meeting1.userstartDatetime), day) && meeting1.assigned))
                    ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}

                    {/* {renders[i].schedule.some((meeting) => */}
                    {renders?.user?.calendar?.some((meeting) =>
                      (isSameDay(parseISO(meeting.userstartDatetime), day) && !meeting.assigned) ||
                      (newcalendar.some((meeting1) => isSameDay(parseISO(meeting1.userstartDatetime), day) && !meeting1.assigned)
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
                                  selectedDayMeetings.some((meeting1) => meeting1.userstartDatetime === meeting.userstartDatetime && meeting1.assigned)
                                  && 'border-red-500 border-solid border-[2px] hover:border-primary',
                                  newcalendar.some((meeting1) => meeting1.userstartDatetime === meeting.userstartDatetime) && 'bg-secondary text-white hover:bg-secondary'
                                )}

                                //Para deshabilitar el boton cuando haya meeting
                                disabled={
                                  selectedDayMeetings.some((meeting1) => meeting1.userstartDatetime === meeting.userstartDatetime && meeting1.assigned)
                                  || newcalendar.some((meeting1) => meeting1.userstartDatetime === meeting.userstartDatetime)}
                              >
                                <MeetingPlaning key={index} meeting={meeting} assigned={selectedDayMeetings.some((meeting1) => meeting1.userstartDatetime === meeting.userstartDatetime && meeting1.assigned)} /></button>
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
                    <Meeting meeting={meeting} key={index} />
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

function Meeting({ meeting }) {
  let startDateTime = parseISO(meeting.userstartDatetime)
  let endDateTime = parseISO(meeting.userendDatetime)

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
      <div className="flex justify-between w-full
      md:flex-col md:items-center">
        {meeting.assigned ? true : <p className="text-gray-900">Meeting no asignado aún</p>}

        {/* Nombre */}
        <p className="text-gray-900">{meeting.first_name + ' ' + meeting.last_name}</p>

        {/* Role */}
        <p className="text-gray-900
        md:hidden">{meeting.role}</p>

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
      {/* <Menu
        as="div"
        className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
      >
        <div>
          <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Edit
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Cancel
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu> */}
    </li>
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
