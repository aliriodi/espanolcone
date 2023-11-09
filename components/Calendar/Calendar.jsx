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
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import Image from 'next/image'
//Componente donde se ven los Meets agendados del usuario logueado
//sea profesor alumno o guia
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  //Aca debe venir de la BD los por userId o email un solo usuario
  //con todos los teachers y guias turisticos disponibles
  //y sus calendarios y propiedades
  //1. en caso de ser user se trae todo los teachers y guias
  //2. en caso de ser teacher solo se trae su calendario con alumnos agendados y que pueda modificar sus horas disponibles
  //   no tiene derecho de cancelar clases esta replanificaion va con el departamento de profesores
  //3. en caso de ser guia turistico solo trae su calendario con sus clientes asignados, puede modificar sus horarios 
  //   disponibles no puede cancelar citas ya reservadas

  const { data: session, status } = useSession();
  let [renders, setRenders] = useState({ user: { role: "user", calendar: [{}], image: 'https://res.cloudinary.com/dfddh08q8/image/upload/v1695578432/images/4_svg8uq.png' } })
  let [newcalendar, setCalendar] = useState([]);
  // Termina section de BD ahora viebne el codigo que usa los datos
  let selectedDayMeetings = [];

  useEffect(() => {
    setRenders(session)
    if (session) {
      setCalendar(session.user.calendar)
    }
  }, [session, renders])

  //console.log('session 109',session)
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [i, setI] = useState(0)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  if (renders) {
    selectedDayMeetings = renders.user.calendar.filter((meeting) =>
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
    // console.log(endDatetime1,typeof(endDatetime1))
    // console.log(startDatetime1,typeof(endDatetime1))
    hoursOfDay.push({
      assigned: false,
      locationCreated: country,
      locationscheduled: "",
      utnCreated: offsetNumber,
      utnscheduled: "",
      iduser: null,
      image: "",
      startDatetime: startDatetime1,
      endDatetime: endDatetime1
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
      <div className=" max-w-6xl px-4 mx-auto sm:px-7 md:max-w-6xl md:px-4">
        <div className="md:grid md:grid-cols-3  md:divide-x md:divide-gray-200 grid grid-cols-3">
          <div className="md:pr-14">
            {renders ? <div className='pt-24'>
              {/* <Image alt={'student'} width={100} height={100} src={renders?.user?.image?.url||renders?.user?.image}></Image> */}
            </div> : null}
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {/* Aca esta el mes  del calendario */}
                {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).charAt(0).toUpperCase() + format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).slice(1)}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div >
            <div className="grid grid-cols-7 mt-10 text-base leading-6 text-center text-white bg-primary">
              {/* <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500"> */}
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
                      isSameDay(parseISO(meeting.startDatetime), day) && meeting.assigned
                    ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}

                    {/* {renders[i].schedule.some((meeting) => */}
                    {renders?.user?.calendar?.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day) && !meeting.assigned
                    ) && (
                        <div className="w-1 h-1 rounded-full bg-red-500  "></div>
                      )}


                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda existente */}
          <section className="mt-12 md:mt-0 md:pl-14">

            <div className='max-w-fit pt-16 pl-14 grid grid-cols-1 divide-x object-none object-right-top  border-red-500 border-solid-4'>
              <h2 className="font-semibold text-gray-900">
                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                  {format(selectedDay, 'MMM dd, yyy', { locale: es }).charAt(0).toUpperCase() + format(selectedDay, 'MMM dd, yyy', { locale: es }).slice(1)}
                </time></h2>
              <h2 className="font-semibold text-gray-900">

                Agenda Existente{' '}

              </h2>


              <div className=''>
                <ol className="">
                  {/* {console.log(selectedDayMeetings)} */}
                  {selectedDayMeetings.length > 0 ? (
                    selectedDayMeetings.map((meeting) => (
                      <Meeting meeting={meeting} key={meeting.id} />
                    ))
                  ) : (
                    <p>No hay actividad agendada aún.</p>
                  )}
                </ol></div>
            </div>


            {/* aca van los botones de que deseo renderizar */}
            {renders?.user?.role.includes('teacher') || renders?.user?.role.includes('guides') ?
              <div className='max-w-fit pt-10 pl-14 grid grid-cols-4 divide-x object-none object-right-top  '>
                <button className= 'border-primary border-solid border-2' onClick={()=>setI(0)}>1</button>
                <button className= 'border-primary border-solid border-2' onClick={()=>setI(1)}>2</button>
                <button className= 'border-primary border-solid border-2' onClick={()=>setI(2)}>3</button>
                <button className= 'border-primary border-solid border-2' onClick={()=>setI(3)}>4</button>
              </div> : null}


          </section>

          {/* {crear Agenda}  console.log(renders)*/}
          {/* {console.log(newcalendar)} */}

          {renders?.user?.role.includes('teacher') || renders?.user?.role.includes('guides') ?
            <section className="mt-12 md:mt-0 md:pl-14">
              <div className='max-w-fit pt-16 pl-14 grid grid-cols-1 divide-x object-none object-right-top  '>
                <h2 className="font-semibold text-gray-900">
                  Planificar Agenda{' '}
                </h2>
                <div className=''>
                  <ol className="">
                    {/* {console.log(selectedDayMeetings)} */}
                    {/* {console.log(hoursOfDay)} */}
                    {/* {console.log(selectedDayMeetings)} */}

                    {hoursOfDay.length > 0 ? (
                      hoursOfDay.slice(i*6, (i+1)*6 ).map((meeting,index) => (
                        <button key={index} onClick={()=>alert('hola')}
                          className={classNames(
                            'focus:outline-none    font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ring-2 text-primary hover:border-none border-primary hover:text-white ',
                           
                            // isFirstMeeting ? 'bg-success text-white ' : '  ring-2 text-primary hover:border-none border-primary hover:text-white',
                            //  newMeeting ? newMeeting.startDatetime === meeting.startDatetime ? 'bg-success text-white ' : '  ring-2 text-primary hover:border-none border-primary hover:text-white' : 'ring-2 text-primary hover:border-none border-primary hover:text-white',
                            //  newMeeting ? newMeeting.startDatetime !== meeting.startDatetime ? 'ring-2 text-primary hover:border-none border-primary hover:text-white' : 'bg-success text-white ' : null,
                            selectedDayMeetings.some((meeting1) => meeting1.startDatetime === meeting.startDatetime && meeting1.assigned)
                            && 'border-red-500 border-solid border-2 hover:border-primary'
                            )} 
                             //Para deshabilitar el boton cuando haya meeting
                             disabled={selectedDayMeetings.some(
                              (meeting1) =>
                                meeting1.startDatetime === meeting.startDatetime &&
                                meeting1.assigned
                            )}
                            >
                          <MeetingPlaning key={index} meeting={meeting}  /></button>
                      ))
                    ) : (
                      <p>No hay actividad agendada aún.</p>
                    )}

                  </ol></div>
              </div>
            </section>
            : null}
        </div>
      </div>
    </div>
  )
}

function Meeting({ meeting }) {
  let startDateTime = parseISO(meeting.startDatetime)
  let endDateTime = parseISO(meeting.endDatetime)

  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <Image
        src={meeting?.image?.url || meeting?.image}
        alt="img"
        className="flex-none w-10 h-10 rounded-full"
        width={160}
        height={160}
      />{/* console.log(meeting.image)*/}
      <div className="flex-auto">
        {meeting.assigned ? true : <p className="text-gray-900">Meeting no asignado aún</p>}
        <p className="text-gray-900">{meeting.first_name + ' ' + meeting.last_name}</p>
        <p className="text-gray-900">{meeting.role}</p>
        <p className="mt-0.5">
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
