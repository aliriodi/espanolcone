import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useSession } from "next-auth/react"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
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
  isAfter,
  isBefore,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { useEffect } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const router = useRouter();
  //Aca debe venir de la BD los por userId o email un solo usuario
  //con todos los teachers y guias turisticos disponibles
  //y sus calendarios y propiedades
  //1. en caso de ser user se trae todo los teachers y guias
  //Cargo usuario de BD
  const { data: session, status } = useSession();
  //2. en caso de ser teacher solo se trae su calendario con alumnos agendados y que pueda modificar sus horas disponibles
  //   no tiene derecho de cancelar clases esta replanificaion va con el departamento de profesores
  //3. en caso de ser guia turistico solo trae su calendario con sus clientes asignados, puede modificar sus horarios 
  //   disponibles no puede cancelar citas ya reservadas
  const student = require("./alumnos.json");
  const teacher = require("./teachers.json");
  const guide = require("./guides.json");
  const cardDetail = useSelector((state) => state.datos.cardDetail);
  let [students, setStudents] = useState(student.value)
  let [teachers, setTeachers] = useState(teacher.value)
  let [guides, setGuides] = useState(guide.value)
  let [renders, setRenders] = useState('')
  let [personSchedule, setPersonSchedule] = useState({})
  let [name, setName] = useState('students')
  //variable para asignar New Meeting en caso de asignar hora
  let [newMeeting, setNewMeeting] = useState()
  useEffect(() => {

    setRenders(session)
    setPersonSchedule(cardDetail)
  }, [session])
  // console.log(renders)
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

  /*
Variable para renderizar la primera vuelta de los horarios disponibles en caso
de que sea role:user con bg success o morado 
*/
  let isFirstMeeting = true;

  function selectSchedule(meeting) {
    setNewMeeting(meeting)

  }
  //Function que asigna el horario al alumno en el calendario de profesor y del alumno

  async function Confirm() {

    const promises = [];
    const newcalendar = [];
    //Teacher o guia turistico apeando las citas del calendario para asignarlo
    // a un nuevo calendario asignado la fecha
    personSchedule.calendar.map(meeting => {
      if (meeting.startDatetime === newMeeting.startDatetime) {
        /*
        // Desplazamiento horario en minutos (ejemplo para GMT-03)
        const offsetMinutes = -3*60;
        // Obtén el UTN actual en UTC
        const nowUTC = new Date().getTime();
        // Calcula el nuevo UTN ajustado
        const adjustedUTN = nowUTC + (offsetMinutes * 60000); // 1 minuto = 60,000 ms
        // Crea una nueva fecha en la zona horaria deseada
        const adjustedDate = new Date(adjustedUTN);
        console.log(adjustedDate); // Esto mostrará la hora ajustada según el desplazamiento horario.
        */
        // Obtener el UTN de la fecha
        const fecha = today; Fragment
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


        //renders es el usuario que sera asignado al teacher
        newcalendar.push({
          assigned: true,
          iduser: renders.user._id,
          nameuser: renders.user.first_name + ' ' + renders.user.last_name,
          first_name: renders.user.first_name,
          last_name: renders.user.last_name,
          image: renders.user.image,
          email: renders.user.email,
          role: renders.user.role,
          locationscheduled:country,
          locationCreated: personSchedule.locationCreated, //profesor o guia que creo el calendario ubicacion
          utnCreated: personSchedule.utnCreated, //profesor o guia que creo el calendario horas
          utnscheduled: offsetNumber,
          startDatetime: meeting.startDatetime,
          endDatetime: meeting.endDatetime,
        })

        // meeting.assigned = true;
        // meeting.iduser = renders.user._id
        // meeting.nameuser = renders.user.first_name + ' ' + renders.user.last_name;
        // meeting.first_name = renders.user.first_name;
        // meeting.last_name = renders.user.last_name;
        // meeting.image = renders.user.image;
        // meeting.email = renders.user.email;
        // meeting.role = renders.user.role;
        // meeting.utnscheduled = offsetNumber;

        //aca asigno el profesor al calendario del alumno
        // renders[i].schedule.push({
        renders.user.calendar.push({
          id: personSchedule['_id'],
          assigned: true,
          first_name: personSchedule.first_name,
          last_name: personSchedule.last_name,
          email: personSchedule.email,
          role: personSchedule.role,
          image: personSchedule.image,
          iduser: personSchedule.id,
          startDatetime: meeting.startDatetime,
          endDatetime: meeting.endDatetime,
          utnCreated: personSchedule.utnCreated,
          utnscheduled: offsetNumber,
          locationCreated: personSchedule.locationCreated,
          locationscheduled:country

        })

        //aca va la promesa de cargar en BD el nuevo personSchedule.schedule
        //aca va la promesa de enviar dos correos uno a teacher y uno a profesor

        //aca actualizo el calendario del profesor con alumno en BD
        promises.push(
          fetch('/api/users/update',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify({ email: personSchedule.email, updates: { calendar: personSchedule.schedule } }),
              body: JSON.stringify({ email: personSchedule.email, updates: { calendar: newcalendar } }),
            }))

        //envio email a teacher
        promises.push(
          fetch('/api/mail/',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to: personSchedule.email, subject: 'Asignación de nueva clase con: ' + renders.user.first_name + ' ' + renders.user.last_name,
                text: 'Asignación de clase para el día ' + newMeeting.startDatetime + ' y termina en hora ' + newMeeting.endDatetime
              })
            }))

        //aca actualizo el calendario del alumno en BD
        promises.push(
          fetch('/api/users/update',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: renders.user.email, updates: { calendar: renders.user.calendar } }),
            }))

        //Envio email a alumno
        promises.push(
          fetch('/api/mail/',
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                to: renders.user.email, subject: 'Asignación de nueva clase con: ' + personSchedule.first_name + ' ' + personSchedule.last_name,
                text: 'Asignación de clase para el día ' + newMeeting.startDatetime + ' y termina en hora ' + newMeeting.endDatetime
              })
            })
        )

      } else {
        newcalendar.push(meeting)
      }
    })

    alert('Su clase ha sido asignada')
    //Ejecuto todas las promesas
    try {
      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    }
    //    console.log(personSchedule.schedule)
    router.push('/inicio/calendar');
  }

  //Inicia el calendario
  let today = startOfToday()
  let [selectedDay, setSelectedDay] = useState(today)
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

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

  //let selectedDayMeetings = renders.schedule.filter((meeting) =>
  // let selectedDayMeetings = renders.user.calendar.filter((meeting) =>
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
            {/* <div style={{ border: 'solid 1px red' }}> */}
            {/* Menu Desplegable para tipo de usuarios */}
            {/* <ul className={`${styles['select-languages_menu2']} ${styles['active']}`}> */}
            {/*
                  users.length > 0 &&
                  users.map((user) => (
                    <li
                      onClick={() => handleOnChange(user)}
                      value={user}
                      className={styles["select-languages_languages"]}
                      key={user}>


                      {/* Label */}
            {/*<label style={{ marginLeft: "8px" }}>
                        {user}
                      </label>
                    </li>
                  )
                  )
                }
              {/* </ul> */}
            {/* </div> */}

            {/* <>{name}</> */}

            {/* <button style={{ 'marginLeft': '16px', 'backgroundColor': '#4CCFEB', 'border': '4px solid #007bff' }} onClick={backI}>Anterior</button> */}
            {/* <button style={{ 'marginLeft': '16px', 'backgroundColor': '#4CCFEB', 'border': '4px solid #007bff' }} onClick={nextI}>Siguiente</button> */}
            {/* De aca inicia el componente real */}
            {renders ? <div>
              {/* {console.log(personSchedule)} */}
              {/* <Image alt={'student'} width={100} height={100} src={personSchedule.image}></Image> */}
              <Image alt={'student'} width={100} height={100} src={personSchedule?.image?.url || personSchedule?.image}></Image>
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
                      personSchedule?.calendar?.some((meeting) =>
                      //Los dias de meetings deben ser despues de la fecha de hoy y deben tener disponibilidad
                      (isAfter(parseISO(meeting.startDatetime),today ))&& isSameDay(parseISO(meeting.startDatetime), day) && !meeting.assigned) && "rounded-full bg-gray-200 text-primary text-lg",
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

          {/* Seccion asignacion de calendarios de acuerdo a disponibildiad */}

          <section className=''>

            <time dateTime={format(selectedDay, "yyyy-MM-dd'T'HH:00:00")} />
            <div className='max-w-fit pt-36 pl-14 grid grid-cols-1 divide-x object-none object-right-top  border-red-500 border-solid-4'>
              {/* {Section Alumnos} */}

              {renders?.user?.role === 'user' || renders?.user?.role.includes('user') || true?
                <>
                  {/* de aca viene el id del usuario donde va a renderizar el estado del teacher o guias
                  con los datos del teacher o guia turistico, viene por redux */}
                  <div><strong> {personSchedule.first_name}</strong></div>

                  { isAfter(selectedDay, today) && personSchedule?.calendar?.map((meeting, index) => {
                    if (!meeting.assigned && isSameDay(parseISO(meeting.startDatetime), selectedDay)) {
                      return (

                        <p key={index}>
                          <button onClick={() => selectSchedule(meeting)}
                            className={classNames(
                              'focus:outline-none  hover:bg-success  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900',
                              // isFirstMeeting ? 'bg-success text-white ' : '  ring-2 text-primary hover:border-none border-primary hover:text-white',
                              newMeeting ? newMeeting.startDatetime === meeting.startDatetime ? 'bg-success text-white ' : '  ring-2 text-primary hover:border-none border-primary hover:text-white' : 'ring-2 text-primary hover:border-none border-primary hover:text-white',
                              newMeeting ? newMeeting.startDatetime !== meeting.startDatetime ? 'ring-2 text-primary hover:border-none border-primary hover:text-white' : 'bg-success text-white ' : null,
                            )} >

                            <time dateTime={meeting.startDatetime}>
                              {format(parseISO(meeting.startDatetime), 'h:mm a')}
                            </time>{' '}
                            -{' '}
                            <time dateTime={meeting.endDatetime}>
                              {format(parseISO(meeting.endDatetime), 'h:mm a')}
                            </time>
                          </button>
                        </p>

                      );
                    }

                  })}

                  {/* Si existe meeting par asignar renderiza button confirmar citas*/}
                  {  isAfter(selectedDay, today) && personSchedule?.calendar?.some(meeting => isSameDay(parseISO(meeting.startDatetime), selectedDay) && !meeting.assigned) &&
                    <button type="button" onClick={() => Confirm()} className='focus:outline-none  bg-primary text-white font-medium rounded-lg te t-sm px-5 py-2.5 mb-2 '>Confirma </button>}
                </>

                : null}
            </div>
            {renders?.user?.role === 'guide' ? <>guia</> : null}
            {renders?.user?.role === 'teacher' ? <>teacher</> : null}

            {/* {format(selectedDay, "yyyy-MM-dd HH:00:00")} */}

          </section>

        </div>
        <div className='pt-10 text'>Recuerda:</div>
        <div className='pt-6 max-w-prose text-justify' ><p>
          La cancelación o modificación de horario se realiza de manera sencilla a través de la agenda de la aplicación.
          Simplemente acceda a su cuenta, navegue hasta la sección de agenda y seleccione la fecha y hora que desea cambiar.
          Luego, seguí las instrucciones proporcionadas para cancelar o modificar tu reserva según sus necesidades.
          Esto le brindará la flexibilidad de gestionar sus clases de español de manera conveniente y eficiente,
          adaptándolas a tu agenda y preferencias.</p>
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
      />
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

// h1 {
//   disponible{
//     1/0
//   }
//   ocupado{
//     1/0
//   }
// }
// 2 1 / 0
// 3
// 4
// 5
// 6
// 7
// 8
// 8
// 10
// 11
// 12
