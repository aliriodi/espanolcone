import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useSession } from "next-auth/react"
import React, { useState, useEffect, Fragment } from 'react';
import styles from '../../styles/navbar.module.css';
import { es } from 'date-fns/locale';
import {
  add,
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
  const student = require("./alumnos.json");
  const teacher = require("./teachers.json");
  const guide = require("./guides.json");

  const { data: session, status } = useSession();

  let [students, setStudents] = useState(student.value)
  let [teachers, setTeachers] = useState(teacher.value)
  let [guides, setGuides] = useState(guide.value)
  let [renders, setRenders] = useState({ user: { calendar: [{}], image: 'https://res.cloudinary.com/dfddh08q8/image/upload/v1695578432/images/4_svg8uq.png' } })
  let [name, setName] = useState('students')
  const users = ['students', 'teachers', 'guides']
  let [i, setI] = useState(0)
  function nextI() { if (i < students.length - 1) { let iaux = i + 1; setI(iaux); } console.log(i) }
  function backI() { if (0 < i) { let iaux = i - 1; setI(iaux); } console.log(i) }
  function handleOnChange(user) {
    if (user === 'students') { setRenders(students); setName('students') }
    if (user === 'teachers') { setRenders(teachers); setName('teachers') }
    if (user === 'guides') { setRenders(guides); setName('guides') }
    setI(0)
  }

  // Termina section de BD ahora viebne el codigo que usa los datos
  let selectedDayMeetings = [];

  useEffect(() => {
    setRenders(session)

  }, [session, renders])

  //console.log('session 109',session)
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
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

  // de BD 
  //   let selectedDayMeetings = renders.user.calendar.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // )
  // let selectedDayMeetings = meetings.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), selectedDay)
  // )

  return (
    <div className="pt-24">
      <div className=" max-w-4xl px-4 mx-auto sm:px-7 md:max-w-4xl md:px-4">
        <div className="md:grid md:grid-cols-2  md:divide-x md:divide-gray-200 grid grid-cols-2">
          <div className="md:pr-14">
            {renders ? <div>
              <Image alt={'student'} width={100} height={100} src={renders?.user.image}></Image>
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
                        <div className="w-1 h-1 rounded-full bg-red-500"></div>
                      )}


                    {/* {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>


      
          <section className="mt-12 md:mt-0 md:pl-14">
            <div className='max-w-fit pt-36 pl-14 grid grid-cols-1 divide-x object-none object-right-top  border-red-500 border-solid-4'>
            <h2 className="font-semibold text-gray-900">
              Agenda{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>

                {format(selectedDay, 'MMM dd, yyy', { locale: es }).charAt(0).toUpperCase() + format(selectedDay, 'MMM dd, yyy', { locale: es }).slice(1)}
              </time>
            </h2>
            <div className=''>
              <ol className="">
                {console.log(selectedDayMeetings)}
                {selectedDayMeetings.length > 0 ? (
                  selectedDayMeetings.map((meeting) => (
                    <Meeting meeting={meeting} key={meeting.id} />
                  ))
                ) : (
                  <p>No hay actividad agendada aún.</p>
                )}
              </ol></div>
              </div>
          </section>
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
        src={meeting.image}
        alt=""
        className="flex-none w-10 h-10 rounded-full"
        width={160}
        height={160}
      />{console.log(meeting)}
      <div className="flex-auto">
        {meeting.assigned ? <p className="text-gray-900">{meeting.name}</p> : <p className="text-gray-900">Meeting no asignado aún</p>}
        <p className="text-gray-900">{meeting.nameuser}</p>
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
      <Menu
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
      </Menu>
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
