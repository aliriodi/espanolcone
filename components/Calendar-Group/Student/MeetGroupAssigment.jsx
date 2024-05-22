import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useSession } from "next-auth/react"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Spinner from '../../Spinner';
import Plan from '../../Plan/Plansync';



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
import { Fragment, useState, useEffect } from 'react'
import ModalPago from '../../ModalPagoPAYPAL';
import ModalPago2 from '../../ModalPagoZelle';
import ModalPagoABLE from '../../ModalPagoAble';
import ModalDescAssig from '../../Calendar/ModalDescAssig';
import { ButtonAddStudentCalendarGroup } from './ButtonAddStudentCalendarGroup';






function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const MeetGroupAssigment = () => {
  const router = useRouter();
  /*
  Aca el usuario se trae por _id el calendario del guia o teacher
  para poder agendar una cita en caso de que exista disponibilidad
  */
  const { data: session, status, update } = useSession();

  const cardDetail = useSelector((state) => state.datos.cardDetail);
  const [deltaTime, setDeltaTime] = useState(0)
  let [renders, setRenders] = useState('')
  let [personSchedule, setPersonSchedule] = useState({})
  //variable para asignar New Meeting en caso de asignar hora
  let [newMeeting, setNewMeeting] = useState()
  const [openModalDescription, setopenModalDescription] = useState(false)
  const [Description, setDescription] = useState('')
  const [paypalModal, setPaypalModal] = useState(false)
  const [paypalDates, setPaypalDates] = useState(null)
  const [ZelleModal, setZelleModal] = useState(false)
  const [PayModal, setPayModal] = useState(false)
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [paymentCancelled, setPaymentCancelled] = useState(false);
  const [OpenP, setOpenP] = useState(false);
  const [preassgined, setPreassgined] = useState(false);
  const [assigned, setAssgined] = useState(false);






  const lastplansyc = session?.user?.planSync?.length;
  //upaypalDatesser
  //PAGO DE PAYPAL OK
  const handlePaymentSuccess = async (data, response) => {
    // alert('ahi vengo')
    console.log('data', data)
    console.log('response', response)
    setAssgined(true)
    setIsPaymentConfirmed(true);
    setTimeout(function () { PAYOK(paypalDates, response); }, 500)
    Confirm();
    setPaymentCancelled(false); // Asegúrate de restablecer el otro estado
  };


  const handlePaymentCancel = () => {
    setIsPaymentConfirmed(false);
    PAYNOK();
    setPaymentCancelled(true); // Asegúrate de restablecer el otro estado
  };


  //aca traigo al teacher o guia turistico con sus detalles
  //bien sea por redux o por Base de datos
  const { id } = router.query;

  useEffect(() => {
    // console.log('76 cardDetail',cardDetail)
    // Obtener el UTN de la fecha

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
          if (id) {
            try {
              // console.log('id2',id)
              const details = await fetch('/api/users/' + id2).then(response => response.json())
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
          const details = await fetch('/api/users/' + id).then(response => response.json())
          const details2 = { ...details.userid };
          const fecha = today; Fragment
          const offsetMinutes = fecha.getTimezoneOffset();
          const offsetHours = offsetMinutes / 60;
          const offsetSign = offsetHours > 0 ? '-' : '+';
          const offsetHoursAbs = Math.abs(offsetHours);
          const formattedOffset = `${offsetSign}${String(offsetHoursAbs).padStart(2, '')}`;
          const utnUser = parseInt(formattedOffset, 10);
          const last = details.userid.calendar.length;
          const utnToG = details.userid.calendar[last - 1].utnCreated;
          const deltaTime2 = (utnUser - utnToG) * 3600000;
          //aca voy a modificar los calendarios para modificar los utn de las horas no asignadas
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

  }, [session, id])

  useEffect(() => {
    //console.log("newMeeting ",newMeeting)

    let startDatetime = newMeeting?.startDatetime;

    //console.log("startDatetime ", startDatetime && startDatetime.slice(0, startDatetime?.indexOf("T")))
    //console.log("startDatetime type ", typeof startDatetime)
  }, [newMeeting])

  function selectSchedule(meeting) {
    setNewMeeting(meeting)

  }



  const openPaypalModal = (VALUE) => {
    setPaypalModal(true)
    //setPaypalDates(VALUE)
  }

  const openZelleModal = (VALUE) => {
    setZelleModal(true)
    //  setPaypalDates(VALUE)
  }

  const closeZelleModal = () => {
    setZelleModal(false)
  }

  function openModalPay(VALUE) {
    setPayModal(true)
    setPaypalDates(VALUE)
  }

  function closePayModal() { setPayModal(false) }

  const handleChangePaypalModal = (data) => {
    setPayModal(data)
    setZelleModal(data)
    setPaypalModal(data)
  }


  //Function que asigna el horario al alumno en el calendario de profesor y del alumno

  function openPlan() {
    //Chequeo si tengo clases disponiblopenPaypalModales para ver si renderizo compras de clases de acuerdo  
    //a la ultima compra
    const last = session.user.planSync.length;

    if (!last || (session.user.planSync[last - 1].qty - session.user.planSync[last - 1].classview < 1)) setOpenP(true)
    else Confirm()

  }

  function closePlan() {
    setOpenP(false)
  }

  async function Confirm(VALUE) {
    //sb-dgdvf28637629@personal.example.com
    //123456789
    //https://sandbox.paypal.com

    //El  <Plan Confirm={Confirm} newMeeting={newMeeting} closePlan={closePlan} />
    //es el que le asigna el Value para llamar a los modales de pago 

    if (VALUE) {
      //api pago 
      //El valor de value creo que hay que ponerlo en un estado 
      //para irlo pasando entre las funciones
      //inicialmenye asi openPaypalModal(VALUE) ahora
      // {OpenP && <Plan Confirm={Confirm} newMeeting={newMeeting} closePlan={closePlan} />}
      // LINEA 1029 para verl el VALUE 
      openModalPay(VALUE)

    }


    else {

      const newplan = [];
      renders.user.planSync.map(plan => newplan.push(plan));

      const length = newplan.length;
      newplan[length - 1].classview = newplan[length - 1].classview + 1;
      try {
        await fetch('/api/users/update',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: renders.user.email, updates: { planSync: newplan } }),
          }).then(response => console.log(response.json()))

      } catch (error) {
        console.error(error);
      }
      AssingingClass();
    }
  }

  //si el pago es ok envio a la BD el pago
  async function PAYOK(VALUE, DATESPAYPAL) {
    //alert('265 entre en payok()')
    try {
      await fetch('/api/users/update',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              email: renders.user.email,
              updates: {
                planSync: [...session.user.planSync,
                {
                  type: 'plansync',
                  payment: 'PAYPAL',
                  valid: true,
                  qty: VALUE.qty,
                  cost: VALUE.cost,
                  planing: 1,
                  classview: 1
                }
                ]
              }
            }
          ),
        })

        .then(response => {
          setPaypalDates(null)
          //   console.log("Clase asignado ",response.json())    
        })

    } catch (error) {
      setPaypalDates(null)

      console.error(error);
    }

    //envio recibo a BD

    try {
      await fetch('/api/receipt/add',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              idUser: renders.user._id,
              idPlan: 'plansync',
              qty: VALUE.qty,
              ammount: VALUE.cost,
              dates: { VALUE, DATESPAYPAL, type: "PAYPAL" }
            }
          ),
        }).then(response => {
          setPaypalDates(null)
          //  console.log("Clase asignado ",response.json())

        })

    } catch (error) {
      setPaypalDates(null)

      console.error(error);
    }

  }

  //si el pago es no OK
  function PAYNOK() {
    alert('Su pago no ha sido procesado intente nuevamente')
    setPaypalDates(null)
  }

  // Asignando clases a la BD y enviando correos
  async function AssingingClass() {

    const newcalendar = [];
    const newcalendarS = [];
    //Teacher o guia turistico apeando las citas del calendario para asignarlo
    // a un nuevo calendario asignado la fecha

    personSchedule.calendarGroup.map(async meeting => {
      if (meeting.startDatetime === newMeeting.startDatetime) {

        // Desplazamiento horario en minutos (ejemplo para GMT-03)
        const offsetMinutes1 = meeting.utnCreated * 60;
        // Obtén el UTN actual en UTC
        const nowUTC = new Date().getTime();
        // Calcula el nuevo UTN ajustado
        const adjustedUTN = nowUTC + (offsetMinutes1 * 60000); // 1 minuto = 60,000 ms
        // Crea una nueva fecha en la zona horaria deseada
        const adjustedDate = new Date(adjustedUTN);
        // console.log(adjustedDate); // Esto mostrará la hora ajustada según el desplazamiento horario.

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
          preassgined: false,
          id: personSchedule['_id'],
          iduser: renders.user['_id'],
          nameuser: renders.user.first_name + ' ' + renders.user.last_name,
          first_name: renders.user.first_name,
          last_name: renders.user.last_name,
          image: renders.user.image,
          email: renders.user.email,
          role: renders.user.role,
          locationscheduled: country,
          locationCreated: meeting.locationCreated, //profesor o guia que creo el calendario ubicacion
          utnCreated: meeting.utnCreated, //profesor o guia que creo el calendario horas
          utnscheduled: offsetNumber,
          startDatetime: meeting.startDatetime,
          endDatetime: meeting.endDatetime,
          userstartDatetime: meeting.userstartDatetime,
          userendDatetime: meeting.userendDatetime,
          description: Description,
        })
        //aca asigno el profesor al calendario del alumno
        renders.user.calendar.map(calendar => newcalendarS.push(calendar))
        newcalendarS.push({
          id: personSchedule['_id'],
          iduser: renders.user._id,
          assigned: true,
          preassgined: false,
          first_name: personSchedule.first_name,
          last_name: personSchedule.last_name,
          email: personSchedule.email,
          role: personSchedule.role,
          image: personSchedule.image,
          iduser: personSchedule.id,
          startDatetime: meeting.startDatetime,
          endDatetime: meeting.endDatetime,
          utnCreated: meeting.utnCreated,
          utnscheduled: offsetNumber,
          locationCreated: meeting.locationCreated,
          locationscheduled: country,
          userstartDatetime: meeting.userstartDatetime,
          userendDatetime: meeting.userendDatetime,
          description: Description,
        })

        newcalendarS.sort((a, b) => {
          const dateA = new Date(a.startDatetime);
          const dateB = new Date(b.startDatetime);

          // Compare the dates
          return dateA - dateB;
        });
        newcalendar.sort((a, b) => {
          const dateA = new Date(a.startDatetime);
          const dateB = new Date(b.startDatetime);

          // Compare the dates
          return dateA - dateB;
        });

        function descriptionApp() {
          if (Description.length > 4) { return `<p>Tema a tratar: ${Description}</p>` }
          else return ''
        }
        function AMOPM(meetingTime) {
          const timeString = meetingTime?.slice(meetingTime?.indexOf("T") + 1);
          if (timeString) {
            // Extract hours and minutes from the time string
            const [hours, minutes] = timeString.split(":");

            // Convert hours to a number
            const hoursNumber = parseInt(hours, 10);

            // Determine whether it's AM or PM
            const period = hoursNumber >= 12 ? "PM" : "AM";

            // Adjust hours for 12-hour format
            const adjustedHours = hoursNumber % 12 || 12;

            // Construct the final time string with AM or PM
            const formattedTime = `${adjustedHours}:${minutes} ${period}`;

            // Now, 'formattedTime' contains the time with AM or PM
            return formattedTime;
          } else { return 'AM o PM' }
        }
        // Mensajes via Email

        let massageTeacher = `
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
              <h1 style=" z-index: 90;">Asignación de clase con ${renders.user.first_name}</h1>
            </header>
            
            <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
              <p>Se te asignó una clase para el día <b>${newMeeting?.startDatetime.slice(0, newMeeting?.startDatetime?.indexOf("T"))}</b>,</p>
              <p>a partir de las <b>${AMOPM(newMeeting.startDatetime)}</b>,</p>
              <p>y termina a las <b>${AMOPM(newMeeting.endDatetime)}</b>,</p> 
              <p class="mt">El horario del alumno inicia a las <b>${AMOPM(newMeeting.userstartDatetime)}</b></p>
              <p>y termina a las <b>${AMOPM(newMeeting.userendDatetime) /*+newMeeting?.userendDatetime.slice(newMeeting?.userendDatetime?.indexOf("T") + 1)*/}</b></p>
              ${descriptionApp()}
            </div>
            
            <footer style="font-size: 18px;">
              <p>¡Te deseamos suerte en tu clase!</p>
            </footer>
          </div>
        </body>
        </html>
        `
        let massageStudent = `
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
              <h1 style=" z-index: 90;">Asignación de clase con ${personSchedule.first_name}</h1>
            </header>
            
            <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
              <p>Se te asignó una clase para el día <b>${newMeeting?.userstartDatetime.slice(0, newMeeting?.startDatetime?.indexOf("T"))}</b>,</p>
              <p>a partir de las <b>${AMOPM(meeting.userstartDatetime)}</b>,</p>
              <p>y termina a las <b>${AMOPM(meeting.userendDatetime)}</b>,</p> 
              ${descriptionApp()}
            </div>
            
            <footer style="font-size: 18px;">
              <p>¡Te deseamos suerte en tu clase!</p>
            </footer>
          </div>
        </body>
        </html>
        `

        //aca va la promesa de cargar en BD el nuevo personSchedule.schedule
        //aca va la promesa de enviar dos correos uno a teacher y uno a profesor

        //La promesa del nuevo calendario del profesor la saco del if porque sino la
        //promesa sale sin todo los calendarios actualizados tenia un problema de logica

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
                  to: personSchedule.email,
                  subject: 'Asignación de nueva clase con: ' + renders.user.first_name + ' ' + renders.user.last_name,
                  html: massageTeacher
                })
              })
          //Envio email a alumno
          await
            fetch('/api/mail/',
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: renders.user.email,
                  subject: 'Asignación de nueva clase con: ' + personSchedule.first_name + ' ' + personSchedule.last_name,
                  html: massageStudent
                })
              })
        } catch (error) {
          console.error(error);
        }


      } else {
        newcalendar.push(meeting)
      }

    })
    // console.log(newcalendar)
    //aca actualizo el calendario del profesor con alumno en BD
    try {
      await fetch('/api/users/update',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: personSchedule.email, updates: { calendarGroup: newcalendar } })
        }).then(response => console.log(response.json()))

      //aca actualizo el calendario del alumno en BD
      //fuera del map para que se declare una sola promesa y con el recorrido completo
      await
        fetch('/api/users/update',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: renders.user.email, updates: { calendarGroup: newcalendarS } }),
          }).then(response => console.log(response.json()))
      // console.log(newcalendarS)

    } catch (error) {
      console.error(error);
    }
    update({ ...session, user: { ...session.user, calendarGroup: newcalendarS } });


    alert('Su clase ha sido asignada')

    setOpenP(false)

    router.push('/inicio/calendarGroup');

  }
  // console.log('Profesor', personSchedule.calendarGroup, 'Estudiante', renders.user)

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

  //ubico y asigno el primer dia del meeting en caso de existir
  function firstMeetingDay(day) {
    const firstMeeting = []
    isAfter(day, today) && personSchedule?.calendarGroup?.map((meeting) => {

      if (!meeting.assigned && isSameDay(parseISO(meeting.userstartDatetime), day)) {
        firstMeeting.push(meeting)
      }
    })
    //console.log(firstMeeting.length)
    setNewMeeting(firstMeeting.find(meeting => !meeting.assigned))
  }



  if (!personSchedule || Object.keys(personSchedule).length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    )
  }


  return (
    <div className="pt-24 mx-[60px]
    md:mx-[25px]">

      <div className="bg-white w-full px-[22px] py-[26px]  rounded-[10px] shadow-[0px_4px_24px_#0000000F]
      sm:px-7 ">

        {/* Titulo */}
        {/* <h3 className='md:text-[18px]'>{session?.user?.first_name} posee(s) {' '}
                                        {session?.user?.planSync?.length? 
                                        session.user.planSync[session.user.planSync.length-1].qty
                                        -session.user.planSync[session.user.planSync.length-1].classview
                                        :0} {' '}
                                        clases para agendar</h3> */}

        <h3 className='border-b-2 pb-[25px]'>¿Qué día queres realizar tu reserva grupal?</h3>


        {/* Contenido */}
        <div className="py-[25px] flex justify-between
        md:flex-col">

          {/* Imagen de perfil */}
          <div className='relative flex flex-col items-center w-[20%]
          md:w-full' onClick={() => console.log(session?.user?.planSync)}>
            {renders ?
              <div className=' h-[140px] w-[140px] relative  flex items-center flex-col'>

                {/* Imagen */}
                <Image
                  className='w-full h-full rounded-[10px] overflow-hidden shadow-[0_5px_20px_#00000033]'
                  alt={'student'}
                  width={100}
                  height={100}
                  src={personSchedule?.image?.url || personSchedule?.image} />

                {/* Nombre */}
                <p className='bg-success text-center text-white rounded-[5px] min-w-[110px] absolute bottom-[-12px]' >{personSchedule?.first_name} {personSchedule?.last_name}</p>

              </div> : null}


          </div>

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
                      personSchedule?.calendarGroup?.some((meeting) =>
                        //Los dias de meetings deben ser despues de la fecha de hoy y deben tener disponibilidad
                        (isAfter(parseISO(meeting.startDatetime), today)) && isSameDay(parseISO(meeting.startDatetime), day) && meeting.assigned) && !isEqual(day, today) && "rounded-full bg-gray-200 text-primary text-lg",
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
          <section className='w-[20%] relative flex justify-start flex-col
          md:w-full'>

            {
              // TODO: PREGUNTAR ALIRIO... 
              // personSchedule?.calendarGroup?.length &&
              //   session.user.planSync[session.user.planSync.length - 1].qty - session.user.planSync[session.user.planSync.length - 1].classview > 0 ?
              //   <p className='font-medium mt-[17px] mb-[15px] text-center text-[14px] text-violet_dark'>
              //     Puedes agendar <b>{session?.user?.planSync && session.user.planSync[session.user.planSync.length - 1].qty - session.user.planSync[session.user.planSync.length - 1].classview}</b> {session?.user?.planSync?.length > 1 ? "clases" : "clase"}
              //   </p> : <p>No posees clases para agendar</p>

              // personSchedule?.calendarGroup?.length && personSchedule?.calendarGroup?.map((hoursMeet) => (

              //   isSameDay(parseISO(hoursMeet.startDatetime), selectedDay) &&

              //   <button
              //     type="button"
              //     className='bg-success text-center text-white rounded-[5px] py-2 mt-4 mx-1'
              //     key={hoursMeet.startDatetime}
              //     onClick={() => useAddStudentsCalendar(renders?.user, { ...hoursMeet, teacherEmail: personSchedule.email })} // Asegúrate de pasar el correo electrónico del profesor
              //     disabled={isSubmitting}
              //   >
              //     {hoursMeet.startDatetime.split('T')[1]} - {hoursMeet.endDatetime.split('T')[1]}
              //   </button>

              // ))

            }
            <ButtonAddStudentCalendarGroup
              personSchedule={personSchedule}
              renders={renders}
              selectedDay={selectedDay} />

            <time dateTime={format(selectedDay, "yyyy-MM-dd'T'HH:00:00")} />

            <div className='grid grid-cols-1 divide-x object-none object-right-top w-full px-3'>
              {/* {Section Alumnos} */}

              {renders?.user?.role === 'user' || renders?.user?.role.includes('user') || true ?
                <ul>
                  {/* de aca viene el id del usuario donde va a renderizar el estado del teacher o guias
                  con los datos del teacher o guia turistico, viene por redux  y por BD en caso de dar f5*/}

                  {isAfter(selectedDay, today) && personSchedule?.calendarGroup?.map((meeting, index) => {

                    if (!meeting.preassgined && !meeting.assigned && isSameDay(parseISO(meeting.userstartDatetime), selectedDay)) {
                      return (

                        <li key={index}>

                          <button onClick={() => setNewMeeting(meeting)}
                            // className={classNames(
                            //   'focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full border-solid border-[2px] border-primary',
                            //   newMeeting ? newMeeting.userstartDatetime === meeting.userstartDatetime ? 'bg-success text-white border-none' : '   text-primary hover:border-none border-primary hover:text-white' : ' text-primary hover:border-none border-primary hover:text-white',
                            //   newMeeting ? newMeeting.userstartDatetime !== meeting.userstartDatetime ? ' text-primary hover:border-none border-primary hover:text-white' : 'bg-success text-white ' : null,
                            // )}
                            className={classNames(
                              'focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full border-solid border-[2px] border-primary hover:bg-primary transition-all',
                              newMeeting && newMeeting.userstartDatetime === meeting.userstartDatetime ? 'bg-success text-white border-none hover:bg-success_hover' : '   text-primary border-primary hover:text-white',
                            )}>

                            <time dateTime={meeting.userstartDatetime}>
                              {format(parseISO(meeting.userstartDatetime), 'h:mm a')}
                            </time>{' '}
                            -{' '}
                            <time dateTime={meeting.userendDatetime}>
                              {format(parseISO(meeting.userendDatetime), 'h:mm a')}
                            </time>

                          </button>

                        </li>

                      );
                    }

                  })}


                  {/* Si existe un meeting para asignar y el pago ha sido confirmado, renderiza el botón de confirmar citas */}

                  {isAfter(selectedDay, today) && personSchedule?.calendarGroup?.some(meeting => isSameDay(parseISO(meeting.userstartDatetime), selectedDay) && !meeting.assigned) &&// isPaymentConfirmed &&!isPaymentConfirmed&&
                    session.user.planSync[lastplansyc - 1].valid &&
                    <button
                      type="button"
                      onClick={() => setopenModalDescription(true)}
                      className='btn-primary px-5 py-2.5 mb-2 w-full text-[16px]'>
                      Confirmar
                    </button>}
                  {isAfter(selectedDay, today) && personSchedule?.calendarGroup?.some(meeting => isSameDay(parseISO(meeting.userstartDatetime), selectedDay) && !meeting.assigned) &&// isPaymentConfirmed &&!isPaymentConfirmed&&
                    !session.user.planSync[lastplansyc - 1].valid &&
                    <button
                      type="button"
                      onClick={() => alert('Su pago ZELLE se esta validando ...')}
                      className='btn-primary px-5 py-2.5 mb-2 w-full text-[16px]'>
                      Confirmar
                    </button>}
                  {openModalDescription && <ModalDescAssig renders={renders} meeting={null} personSchedule={personSchedule} openPay={openPlan} openButton={setopenModalDescription} setDescription={setDescription} />}
                  {OpenP && <Plan Confirm={Confirm} newMeeting={newMeeting} closePlan={closePlan} />}

                  {
                    !isPaymentConfirmed && isAfter(selectedDay, today) && personSchedule?.calendarGroup?.some(meeting => isSameDay(parseISO(meeting.startDatetime), selectedDay) && !meeting.assigned) &&
                    <div>

                      {/* Modal de Pago habilitacion*/}
                      <ModalPagoABLE
                        close={closePayModal}
                        modalPay={handleChangePaypalModal}
                        open={PayModal}
                        open1={openPaypalModal}
                        open2={openZelleModal}
                      />
                    </div>
                  }

                  {
                    !isPaymentConfirmed && isAfter(selectedDay, today) && personSchedule?.calendarGroup?.some(meeting => isSameDay(parseISO(meeting.startDatetime), selectedDay) && !meeting.assigned) &&
                    <div>

                      {/* Modal de Pago PAYPAL*/}
                      <ModalPago
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentCancel={handlePaymentCancel}
                        modalPaypal={handleChangePaypalModal}
                        open={paypalModal}
                        dates={paypalDates}
                      />
                    </div>
                  }

                  {
                    !isPaymentConfirmed && isAfter(selectedDay, today) && personSchedule?.calendarGroup?.some(meeting => isSameDay(parseISO(meeting.startDatetime), selectedDay) && !meeting.assigned) &&
                    <div>

                      {/* Modal de Pago ZELLE*/}
                      <ModalPago2
                        // onPaymentSuccess={handlePaymentSuccess1}
                        onPaymentCancel={handlePaymentCancel}
                        modalClose={closeZelleModal}
                        renders={renders}
                        personSchedule={personSchedule}
                        open={ZelleModal}
                        dates={paypalDates}
                        newMeeting={newMeeting}
                      />
                    </div>
                  }

                </ul>

                : null}
            </div>
            {renders?.user?.role === 'guide' ? <>guia</> : null /*{deltaTime} */}
            {renders?.user?.role === 'teacher' ? <>teacher</> : null}

          </section>

        </div>

      </div>

      {/* Recuerda */}
      <div className='bg-white w-full px-[22px] py-[26px]  rounded-[10px] shadow-[0px_4px_24px_#0000000F] my-[24px] text-violet_dark'>
        <p className='mb-[12px] font-semibold'>Recuerda:</p>
        <p className="md:text-[14px]">
          La cancelación o modificación de horario se realiza de manera sencilla a través de la agenda de la aplicación.
          Simplemente acceda a su cuenta, navegue hasta la sección de agenda y seleccione la fecha y hora que desea cambiar.
          Luego, seguí las instrucciones proporcionadas para cancelar o modificar tu reserva según sus necesidades.
          Esto le brindará la flexibilidad de gestionar sus clases de español de manera conveniente y eficiente,
          adaptándolas a tu agenda y preferencias.
        </p>
      </div>
    </div >
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
