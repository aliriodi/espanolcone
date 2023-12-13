"use client"
import React, { useEffect, Fragment,useRef, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import { useSession } from "next-auth/react"
import Logo from '../public/imgs/logo-gradient.png';
import Zelle from '../public/imgs/zelle-logo-0.png';
import Image from 'next/image';
import Cloudinary from './cloudinary/cloudinary';
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


export default function ModalPagoZELLE(props) {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status, update } = useSession();
  let today = startOfToday()
  const router = useRouter();
  // const [isOpen, setIsOpen] = useState(props.open)
  const [ImageUrl, setImageurl] = useState(false)
  console.log('13 zelle modal de pagos')
console.log(props.dates)
//const qty =props.dates.qty;
//const ammount =props.dates.cost;

  const closeModal = () => {
    props?.modalClose(false)
    setIsOpen(false)
  }

  useEffect(()=>{
    //console.log("/////// props ///////",props.open)
    setIsOpen(props.open)
  },[props])
  
  useEffect(()=>{
    if(ImageUrl){
     
      console.log(ImageUrl)
        //envio recibo a BD
            }

  },[ImageUrl])

//Paso por props a componente cloudinary para que me devuelva la imagen cargada  
  function imageurl(url){
    setImageurl({ImageZelle:url})    
  }

//Envio a BD el pago reportado
  async function  sendBD (){
    try{
      fetch('/api/receipt/add',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { idUser: props.renders.user._id,
            idPlan:'plansync',
            qty: props.dates.qty,
            ammount: props.dates.cost,
            dates:{ImageUrl,type:'ZELLE',valid:false}}
        ),
        }).then(response => {
          alert('Su pago esta siendo procesado y analizado en un tiempo máximo de 4 horas su clase debe ser asiganda')
          closeModal()
          console.log("Clase asignado ",response.json())
        })
        
      }catch (error) {
        console.error(error);
      }

  }

  //si el pago es ok envio a la BD el pago
  async function PAYOK(){
    //alert('265 entre en payok()')
    try{
      fetch('/api/users/update',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { email: props.renders.user.email,
              updates: {
                planSync:[...session.user.planSync,
                  {
                    type:'plansync',
                    payment:'ZELLE',
                    valid:false,
                    qty:props.dates.qty,
                    cost:props.dates.cost,
                    planing:0,
                    classview:0
                  }
              ]
            }
          }
        ),
      })
      
      .then(response => 
        {closeModal()
       // setPaypalDates(null)
     //   console.log("Clase asignado ",response.json())    
             })
        
      }catch (error) {
      //  setPaypalDates(null)
        
        console.error(error);
      }

                  
      
    }

  //si el pago es no OK
   function PAYNOK() {
    alert('Su pago no ha sido procesado intente nuevamente')
    //setPaypalDates(null)
  }

  // Asignando clases a la BD y enviando correos
  async function AssingingClass(){
      
    const newcalendar = [];
    const newcalendarS = [];
    //Teacher o guia turistico apeando las citas del calendario para asignarlo
    // a un nuevo calendario asignado la fecha
    props.personSchedule.calendar.map(async meeting => {
      if (meeting.startDatetime === props.newMeeting.startDatetime) {

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
          assigned: false,
          preassgined:true,
          id: props.personSchedule['_id'],
          iduser: props.renders.user['_id'],
          nameuser: props.renders.user.first_name + ' ' + props.renders.user.last_name,
          first_name: props.renders.user.first_name,
          last_name: props.renders.user.last_name,
          image: props.renders.user.image,
          email: props.renders.user.email,
          role: props.renders.user.role,
          locationscheduled: country,
          locationCreated: meeting.locationCreated, //profesor o guia que creo el calendario ubicacion
          utnCreated: meeting.utnCreated, //profesor o guia que creo el calendario horas
          utnscheduled: offsetNumber,
          startDatetime: meeting.startDatetime,
          endDatetime: meeting.endDatetime,
          userstartDatetime: meeting.userstartDatetime,
          userendDatetime: meeting.userendDatetime
        })
        //aca asigno el profesor al calendario del alumno
        props.renders.user.calendar.map(calendar => newcalendarS.push(calendar))
        newcalendarS.push({
          id: props.personSchedule['_id'],
          iduser: props.renders.user._id,
          assigned: false,
          preassgined:true,
          first_name: props.personSchedule.first_name,
          last_name: props.personSchedule.last_name,
          email: props.personSchedule.email,
          role: props.personSchedule.role,
          image: props.personSchedule.image,
          iduser: props.personSchedule.id,
          startDatetime: meeting.startDatetime,
          endDatetime: meeting.endDatetime,
          utnCreated: meeting.utnCreated,
          utnscheduled: offsetNumber,
          locationCreated: meeting.locationCreated,
          locationscheduled: country,
          userstartDatetime: meeting.userstartDatetime,
          userendDatetime: meeting.userendDatetime
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
              <h1 style=" z-index: 90;">Pre-asignación de clase con ${props.renders.user.first_name}</h1>
            </header>
            
            <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
              <p>Se te pre-asignó una clase para el día <b>${props.newMeeting?.startDatetime.slice(0, props.newMeeting?.startDatetime?.indexOf("T"))}</b>,</p>
              <p>a partir de las <b>${props.newMeeting?.startDatetime.slice(props.newMeeting?.startDatetime?.indexOf("T") + 1)}</b>,</p>
              <p>y termina a las <b>${props.newMeeting?.endDatetime.slice(props.newMeeting?.endDatetime?.indexOf("T") + 1)}</b>,</p> 
              <p class="mt">El horario del alumno inicia a las <b>${props.newMeeting?.userstartDatetime?.slice(props.newMeeting?.userstartDatetime?.indexOf("T") + 1)}</b></p>
              <p>y termina a las <b>${props.newMeeting?.userendDatetime.slice(props.newMeeting?.userendDatetime?.indexOf("T") + 1)}</b></p>
            </div>
            
            <footer style="font-size: 18px;">
            
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
              <h1 style=" z-index: 90;">Pre-asignación de clase con ${props.personSchedule.first_name}</h1>
            </header>
            
            <div class="main" style="flex-direction: column; align-items: center; font-size: 18px;">
              <p>Se te pre-asignó una clase para el día <b>${props.newMeeting?.startDatetime.slice(0, props.newMeeting?.startDatetime?.indexOf("T"))}</b>,</p>
              <p>a partir de las <b>${meeting?.userstartDatetime?.slice(meeting?.userstartDatetime?.indexOf("T") + 1)}</b>,</p>
              <p>y termina a las <b>${meeting?.userendDatetime?.slice(meeting?.userendDatetime?.indexOf("T") + 1)}</b>,</p> 
            </div>
            
            <footer style="font-size: 18px;">
             
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
                  to: props.personSchedule.email,
                  subject: 'Pre-asignación de nueva clase con: ' + props.renders.user.first_name + ' ' + props.renders.user.last_name,
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
                  to: props.renders.user.email,
                  subject: 'Pre-asignación de nueva clase con: ' + props.personSchedule.first_name + ' ' + props.personSchedule.last_name,
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
            body: JSON.stringify({ email: props.personSchedule.email, updates: { calendar: newcalendar } })
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
            body: JSON.stringify({ email: props.renders.user.email, updates: { calendar: newcalendarS } }),
          }).then(response => console.log(response.json()))
     // console.log(newcalendarS)

    } catch (error) {
      console.error(error);
    }
    update({ ...session, user: { ...session.user, calendar: newcalendarS } });

    
//    alert('Su clase ha sido asignada')

    //setOpenP(false)

    router.push('/inicio/calendar');

  }


  return (
    <>

      {isOpen &&
      <>
        <div
        onClick={closeModal}
        className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

          <div
          onClick={(e)=>e.stopPropagation()}
          className='bg-white rounded-md'>

            {/* Logo */}
            {/* <div className=' flex justify-center flex-col border-b-2 pb-5 items-center relative'>

              <Image  src={Logo} className='mb-6' style={{ width: '100px' }} alt="Logo" />

              <p className='text-[18px] text-light font-medium absolute bottom-[-13px] bg-white px-2'>Métodos de pago:</p>
            </div> */}

            {/* Metodo de pago */}
            <div
            className='w-[750px] max-h-[70vh]  flex justify-center
            overflow-y-auto'>
              
              <div className='w-full m-auto'>
                {/* Zelle Logo */}
                <div className='bg-[#7422e0] py-3 px-6 mb-5 rounded-[5px_5px_0_0]'>
                  <Image  src={Zelle} className='' style={{ width: '100px' }} alt="Zelle" />
                </div>

                <div className='p-5 '>

                  {/* Cantidad de clases */}
                  <div className='flex justify-between text-violet_dark border-b-2 py-2'>
                    <p>Cantidad de clases:</p>
                    <b>{props?.dates?.qty}</b>
                  </div>

                  {/* Monto a Transferir */}
                  <div className='flex justify-between text-violet_dark border-b-2 py-2'>
                    <p>Monto a transferir:</p>
                    <b>{props?.dates?.cost} USD</b>
                  </div>

                  {/* Cuenta Zelle */}
                  <div className='mt-2 flex justify-between text-violet_dark border-b-2 py-2'>
                    <p>Cuenta Zelle:</p>
                    <b>aliriodi@gmail.com</b>
                  </div>

                  {/* Carga de comprobante */}
                  <div className="my-5 border-2 border-gray_clear rounded-[5px]">

                    <b className='w-full bg-gray_clear flex p-2 text-violet_dark'>Cargue una imagen de su comprobante</b>

                    <div className='p-4'>
                      <Cloudinary imageurl={imageurl}/>
                    </div>

                  </div>

                  {/* aca deberia ser que se esclarezca el estilo mientras no haya imagen cargada */}


                  {ImageUrl &&<button className='btn-success px-5 py-2.5 mt-3 w-full  text-[16px]' onClick={()=>{sendBD();PAYOK();AssingingClass()}}>Enviar pago</button>}

                  {!ImageUrl &&<button className={`btn-success px-5 py-2.5 mt-3 w-full text-[16px] l opacity-[50%] pointer-events-none`} onClick={()=> alert('falta imagen de pago')}>
                    Enviar pago
                  </button>}


                </div>

              </div>
            </div>

          </div>
        </div>
      </>
      }
    </>
  )
}