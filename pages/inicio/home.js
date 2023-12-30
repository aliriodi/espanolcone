import Link from 'next/link'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Menu from '../../components/Menu';
import Class from '../../components/Class/Class';
import { useSpring, animated } from 'react-spring';
import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookDead, faBookOpen, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft, faAngleRight, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard, faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { classid } from '../../redux/ECEActions'
import Spinner from './../../components/Spinner';
import Logo from '../../public/imgs/only-logo.png'
import PLANS from "../../components/Plan/MUnit2"
import Head from 'next/head';
import Copyright from '../../components/Class/Copyright';


export default function Home() {
  const [totalUnits, setTotalUnits] = useState()
  const [unitsDone, setUnitsDone] = useState()
  const [level, setLevel] = useState()
  const [showPlans, setShowPlans] = useState(false)
  const [GeneralProgress, setGeneralProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();

  const dispatch = useDispatch()

  const { showClass } = useSelector((state) => state.datos);
  const handleClickLogin = () => {
    // go to the login
    window.location.href = '/inicio/home';
  };

  const handleClickUsers = () => {
    // go to the login
    window.location.href = '/users';
  };

  function calculateGeneralProgress() {
    // Esta funcion se encarga de calcular el progreso general en base a la cantidad de clases completadas    
    let progressValue;
    let currentClasses = [];
    let clasesLength;
    let classesDone;

    // En caso de que el id de position sea null significa que hizo el 100% de las unidades
    if(session?.user?.position?.id == null){
      setGeneralProgress(100)
      return;
    }

    for (let i = 0; session?.user?.classes.length > i; i++) {
      // Se ponen todas las clases en un mismo array 
      currentClasses = [...currentClasses, ...session?.user?.classes[i]?.units]
    }

    // Se le asigna las cantidad de clases totales
    clasesLength = currentClasses.length

    // Se le asigna la cantidad de clases completadas totales
    classesDone = currentClasses.indexOf(currentClasses.find((c) => c.unitID == session?.user?.position.id))
    
    // En caso de no haber clases se devuelve 0
    if(clasesLength <= 0){
      setGeneralProgress(0)
      return;
    }

    // Se calcula el porsentaje 
    progressValue = (classesDone / clasesLength) * 100

    // Se actualiza generalProgress 
    setGeneralProgress(progressValue.toFixed(1))
  }

  function calculateUnitsDone() {
    // Esta funcion calcula las cantidad de clases completadas en el nivel actual

    let currentLevel;
    let currentUnitDone;

    // Busca el nivel actual correspondiente a la position
    for (let i = 0; session?.user?.classes.length > i; i++) {
      if (session?.user?.classes[i]?.units.find((unit) => unit.unitID == session?.user?.position.id)) {
        currentLevel = session?.user?.classes[i];
        break;
      }
    }

    setLevel(currentLevel?.level)

    // Busca hasta que unidad llego en el nivel actual
    for (let i = 0; currentLevel?.units?.length > i; i++) {
      if (currentLevel?.units[i]?.unitID == session?.user?.position.id) {
        currentUnitDone = i;
        break;
      }
    }

    setUnitsDone(currentUnitDone  != undefined ? currentUnitDone : 0)
    setTotalUnits(currentLevel?.units?.length  != undefined ? currentLevel?.units?.length : 0)
  }
  useEffect(()=>{
    console.log("currentUnitDone ",unitsDone)
    console.log("currentLevel?.units?.length ",totalUnits)
  },[totalUnits, unitsDone])

  useEffect(() => {

    calculateGeneralProgress();
    setIsLoading(false);
    calculateUnitsDone();
    console.log()

  }, [session])
  return (
    <>
      {/* //TODO hacer header 
    //TODO hacer navbar 
    //TODO hacer barra lateral
    //TODO hacer footer si hay */}
      <Head>
        <title>Español con E</title>
        <meta name="Home" content="Home" />
      </Head>

      <Menu />

      {isLoading ? (

        <div className="flex h-screen justify-center items-center">
          <Spinner />
        </div> // Muestra el componente Spinner cuando isLoading es true
        ) : (

        <main className='relative px-[60px] overflow-hidden py-[119px] 
      md:ml-0 md:px-[25px]'>

          {/* Bienvenido */}
          <div
            className='flex justify-center py-[30px] rounded-[8.12px] items-center flex-col'
            style={{ background: 'linear-gradient(38.12deg, #7834E4 40.17%, #0E98B6 122.83%)' }}>

            {/* Icono */}
            {/* <FontAwesomeIcon
              icon={faFlagCheckered}
              className='text-[28px] text-white p-[21px] bg-primary rounded-full mb-[28px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
            /> */}
            <div
             className='text-[28px] text-white p-[14px] bg-primary rounded-full mb-[28px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
            >
              <Image
              src={Logo}
              height={35}
              width={35}/>
            </div>

            {/* Titulo */}
            {session && session.user ?
              <h1 className="text-white text-[28px]
              md:text-[24px]">¡Hola {session.user.first_name}!</h1>
              :
              <h1 className="text-white text-[28px]
              md:text-[24px]">¡Hola!</h1>
            }

            {/* Texto */}
            <p className='text-white text-[21px] mt-[21px] text-center
            md:text-[14px]'>¿Listo para empezar una lección de español?</p>
            <div>
              {/* <button onClick={()=>setShowPlans(true)} className="bg-secondary p-2 rounded-[5px] text-white">¡Hazte Premium!</button> */}
              {/* {showPlans&&<PLANS/>} */}
            </div>
          </div>

          {/* Porentaje de progresos Original */}
          {
          //   <div className='bg-white shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] py-[24px] px-[21px] rounded-[8.12px] my-[20px]'>

          //   {/* Barra de Porsentages */}
          //   <ul className='flex justify-between
          // md:flex-wrap'>
          //     {/* Progreso General */}
          //     <li className='w-[100%] mr-[50px]
          //   md:w-[45%] md:mr-0 md:mb-[25px]'>

          //       <p className='md:text-[12px]'>Progreso general</p>
                
          //       {/* Barra de progreso */}
          //       <div className='w-[100%] bg-success_light rounded-full h-[14px] relative overflow-hidden'>
          //         <animated.div
          //           className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-success"
          //           style={{
          //             width: `${GeneralProgress}%`,
          //             // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
          //           }}
          //         >
          //           {
          //             GeneralProgress > 0 &&
          //             <p className='text-[12px] text-white'>{GeneralProgress}%</p>
          //           }
          //         </animated.div>
                  
          //         {/* En caso de que no haya progreso */}
          //         {
          //           GeneralProgress == 0 &&
          //           <p className='text-[12px] text-success absolute top-0 w-full text-center font-semibold'>0%</p>
          //         }
          //     </div>

          //     </li>

          //     {/* Unidades realizadas */}
          //     <li className='w-[100%] mr-[50px]
          //   md:w-[45%] md:mr-0 md:mb-[25px]'>
          //       <p className='md:text-[12px]'>Unidades realizadas</p>

          //       {/* Barra de progreso */}
          //       <div className='w-[100%] bg-success_light rounded-full h-[14px] relative overflow-hidden'>
          //         <animated.div
          //           className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-success"
          //           style={{
          //             width: `${ totalUnits == 0 && unitsDone == 0 ? 0 : (unitsDone / totalUnits) * 100}%`,
          //             // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
          //           }}
          //         >
          //           {
          //             unitsDone > 0 &&
          //             <p className='text-[12px] text-white'>{unitsDone} / {totalUnits}</p>
          //           }
                    
          //         </animated.div>
                  
          //         {/* En caso de que no haya actividades echas */}
          //         {
          //           unitsDone == 0 &&
          //           <p className='text-[12px] text-success absolute top-0 w-full text-center font-semibold'>0 / {totalUnits}</p>
          //         }
          //     </div>
          //   </li>
            
          //   {/* Clase individual */}
          //   <li className='w-[100%] mr-[50px]
          //   md:w-[45%] md:mr-0 md:mb-[25px]'>
          //       <p className='md:text-[12px]'>Clase individual</p>

          //       {/* Barra de progreso */}
          //       <div className='w-[100%] bg-success_light rounded-full h-[14px] relative overflow-hidden'>
          //         <animated.div
          //           className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-success"
          //           style={{
          //             width: '50%',
          //             // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
          //           }}
          //         >
          //           <p className='text-[12px] text-white'>5 / 10</p>
          //         </animated.div>
          //       </div>
          //     </li>

          //     {/* Guía turistico */}
          //     <li className='w-[100%] 
          //   md:w-[45%] md:mr-0 md:mb-[25px]'>
          //       <p className='md:text-[12px]'>Guía turistico</p>

          //       {/* Barra de progreso */}
          //       <div className='w-[100%] bg-success_light rounded-full h-[14px] relative overflow-hidden'>
          //         <animated.div
          //           className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-success"
          //           style={{
          //             width: '50%',
          //             // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
          //           }}
          //         >
          //           <p className='text-[12px] text-white'>5 / 10</p>
          //         </animated.div>
          //       </div>
          //     </li>
          //   </ul>

          //   {/* Ir a curso */}
          //   <div className='w-full flex justify-end'>
          //     <Link
          //       // onClick={dispatch(classid(session?.user.position?.id))}
          //       className='btn-primary px-[70px] py-[9px] text-[14px] mt-[21px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]
          //   md:w-full md:mt-0 md:text-center'
          //       href={`/inicio/curso/unidad?classId=${session?.user.position?.id}`}
          //       style={{ display: 'inline-block' }}>
          //       Ir al curso
          //     </Link>
          //   </div>
          //   </div>
          }

          
          {/* Ir a Clase Actual */}
          {
            session?.user?.position?.id &&
            <div className='bg-white shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] py-[24px] px-[28px] rounded-[8.12px] mt-[20px] w-full'>
              
              <div className='w-full flex justify-between items-center
              md:flex-col'>
                <p className='text-[18px] text-violet_dark'>
                ¡Tu próxima clase comenzará pronto!
                </p>

                {/* Boton */}
                <Link
                  // onClick={dispatch(classid(session?.user.position?.id))}
                  className='btn-primary px-[70px] py-[9px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]
              md:w-full md:mt-0 md:text-center'
                  href={`/inicio/curso/unidad?classId=${session?.user?.position?.id}`}
                  style={{ display: 'inline-block' }}>
                  Ir a mi clase
                </Link>
              </div>

            </div>
          }

          {/* Porsentages */}
          <div className='flex w-full justify-between
          md:flex-col'>

            {/* Progreso General */}
            <div className='bg-white shadow-[0px_4.982935428619385px_29.897613525390625px_#0000000F] pt-[24px] rounded-[8.12px] my-[20px] w-fit mr-[20px] flex flex-col justify-between
            md:mr-0 md:mb-[25px] md:w-full md:items-center'>

              {/* Titulo */}
              <p className='mb-[60px] text-[18px] text-title_color font-medium border-b-2 mx-[21px] py-2
              md:w-[90%] md:border-none'>Progreso general</p>

              {/* Circulo de progreso */}
              <div className="relative w-fit flex bg-white mx-[80px]
              md:mx-0">
                <div className="absolute w-full h-full flex justify-center items-center">
                    <div className="rounded-full bg-white w-[90%] h-[90%] flex justify-center items-center ">
                      <p className='text-violet_dark text-[35px] font-medium'>{GeneralProgress}%</p>
                    </div>
                </div>
                <svg width={100 * 2} height={100 * 2} viewBox={`0 0 ${100 * 2} ${100 * 2}`}>
                    <circle
                    className="progress-circle stroke-success_light"
                    cx={100}
                    cy={100}
                    r={100 - 100 / 2}
                    fill="transparent"
                    strokeWidth={100}
                    />
                    <circle
                    className="progress-circle stroke-success"
                    cx={100}
                    cy={100}
                    r={100 - 100 / 2}
                    fill="transparent"
                    strokeWidth={100}
                    strokeDasharray={2 * Math.PI * 100}
                    strokeDashoffset={2 * Math.PI * 100 - ((GeneralProgress / 100) / 2) * 2 * Math.PI * 100}
                    transform={`rotate(-90 ${100} ${100})`}
                    />
                </svg>
              </div>

              {/* Porsentages inferiores */}
              <div className='w-full border-t-2 border-[#EBE9F1] flex mt-[60px]'>
                {/* Completado */}
                <div className=' border-r-2 border-[#EBE9F1] w-1/2 py-[40px] flex justify-center items-center flex-col'>

                  <p className='text-[#B9B9C3] mb-2
                  md:text-[14px]'>Completado</p>

                  <p className='text-[20px] font-semibold text-violet_dark'>{GeneralProgress}%</p>

                </div>

                {/* Restante */}
                <div className=' w-1/2 py-[40px] flex justify-center items-center flex-col'>

                  <p className='text-[#B9B9C3] mb-2
                  md:text-[14px]'>Restante</p>

                  <p className='text-[20px] font-semibold text-violet_dark'>{(100 - GeneralProgress).toFixed(1)}%</p>

                </div>
              </div>

            </div>

            {/* Porsentages de la derecha */}
            <div className='w-full relative my-[20px] flex flex-col'>

              {/* Porsentage de progresos */}
              <div className='bg-white shadow-[0px_4.982935428619385px_29.897613525390625px_#0000000F] py-[24px] px-[28px] rounded-[8.12px] mb-[20px] w-full flex-grow-[1]'>
                
                <p className='mb-[60px] text-[18px] text-title_color font-medium border-b-2 py-2
                md:w-full md:border-none md:mb-[40px]'>Información de clases</p>

                {/* Barra de Porsentages */}
                <ul className='flex justify-between flex-col
                md:flex-wrap'>
                  
                  {/* Unidades realizadas */}
                  <li className='w-[100%] flex items-center mb-[40px]
                  md:mr-0 md:mb-[25px]'>

                    {/* Icono */}
                    <div className='w-[85px] h-[85px] bg-primary_flat_hover rounded-full flex justify-center items-center
                    md:w-[45px] md:h-[45px]'>
                      <FontAwesomeIcon className="text-primary text-[40px]
                      md:text-[22px]" icon={faBookOpen}/>
                    </div>

                    {/* Contenido */}
                    <div className='pl-[18px] flex-grow-[1]'>

                      <p className=' text-violet_dark font-semibold
                        md:text-[12px]'>{level}</p>

                      <p className=' text-violet_dark 
                      md:text-[12px]'>Unidades realizadas</p>

                      {/* Barra de progreso */}
                      <div className='w-full bg-primary_flat_hover rounded-full h-[14px] relative overflow-hidden'>

                        {
                          GeneralProgress < 100 ?
                          <>
                            <animated.div
                              className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-primary"
                              style={{
                                width: `${ totalUnits == 0 && unitsDone == 0 ? 0 : (unitsDone / totalUnits) * 100}%`,
                                // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
                              }}
                            >
                              {
                                unitsDone > 0 &&
                                <p className='text-[12px] text-white
                                md:text-[12px]'>{unitsDone} / {totalUnits}</p>
                              }
                              
                            </animated.div>
                            
                            {/* En caso de que no haya actividades echas */}
                            {
                              unitsDone == 0 &&
                              <p className='text-[12px] text-primary absolute top-0 w-full text-center font-semibold
                              md:text-[12px]'>0 / {totalUnits}</p>
                            }
                          </> 
                          :
                          // En caso de que ya este copletado
                          <div className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-primary w-full">
                            <p className='text-[12px] text-white'>¡Completadas!</p>
                          </div>
                        }
                      </div>
                    </div>
                  </li>
                
                  {/* Clase individual */}
                  <li className='w-[100%] flex items-center
                  md:mr-0 md:mb-[25px]'>

                    {/* Icono */}
                    <div className='w-[85px] h-[85px] bg-warning_flat_hover rounded-full flex justify-center items-center
                    md:w-[45px] md:h-[45px]'>
                      <FontAwesomeIcon className="text-warning text-[40px]
                      md:text-[22px]" icon={faChalkboardUser}/>
                    </div>

                    {/* Contenido */}
                    <div className='pl-[18px] flex-grow-[1]'>
                      
                      <p className='text-violet_dark font-semibold
                      md:text-[12px]'>Clase individual</p>

                      <p className='text-violet_dark
                      md:text-[12px]'>Disponibles</p>

                      {/* Barra de progreso */}
                      <div className='w-[100%] bg-warning_flat_hover rounded-full h-[14px] relative overflow-hidden'>

                      {
                        session?.user?.planSync?.length > 0 && session?.user?.planSync[session?.user?.planSync?.length - 1]?.qty > session?.user?.planSync[session?.user?.planSync?.length - 1]?.classview ?
                        
                        <animated.div
                          className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-warning"
                          style={{
                            width: `${(session?.user?.planSync[session?.user?.planSync?.length - 1]?.classview / session?.user?.planSync[session?.user?.planSync?.length - 1]?.qty) * 100}%`
                          }}
                        >
                          <p className='text-[12px] text-white'>{session?.user?.planSync[session?.user?.planSync?.length - 1]?.classview} / {session?.user?.planSync[session?.user?.planSync?.length - 1]?.qty}</p>
                        </animated.div>
                        :
                        <div className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-warning w-full"
                        onClick={()=>console.log(session)}>
                          <p className='text-[12px] text-white'>No tienes clases</p>
                        </div>
                      }
                      </div>
                    </div>
                  </li>

                </ul>

              </div>

              {/* Ver avanzes */}
              <div className='bg-white shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] py-[24px] px-[28px] rounded-[8.12px]  w-full
              md:p-0 md:mt-[15px]'>
                
                <div className='w-full flex justify-between items-center'>

                  <p className='text-[18px] text-violet_dark
                  md:hidden'>Encontrá toda la información de los niveles y unidades que ya realizaste.</p>
                  
                  {/* Boton */}
                  <Link
                    // onClick={dispatch(classid(session?.user.position?.id))}
                    className='btn-success px-[70px] py-[9px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040] inline-block
                    md:w-full md:mt-0 md:text-center md:hidden'
                    href={'./curso'}
                    style={{ textWrap: "nowrap" }}>
                    Ver más
                  </Link>

                  {/* Boton responsive */}
                  <div className='hidden md:inline-block w-full'>
                    <Link
                      // onClick={dispatch(classid(session?.user.position?.id))}
                      className='btn-success px-[70px] py-[9px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040] 
                      md:w-full md:mt-0 md:text-center md:inline-block md:px-0'
                      href={'./curso'}
                      style={{ textWrap: "nowrap" }}>
                      Ver más
                    </Link>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Ver Progreso del curso */}
          {
          // <div className='bg-white shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] py-[24px] px-[21px] rounded-[8.12px] relative'>

          //   {/* Texto */}
          //   <div className='flex flex-col items-center'>
          //     <h2 className='mb-3
          //   md:text-[18.02px]'>Progreso de tu curso</h2>
          //     <p className='text-violet_dark 
          //   md:text-[14px]'>Encontrá toda la información de los niveles y unidades que ya realizaste.</p>
          //   </div>

          //   {/* Ver más */}
          //   <div className='w-full flex justify-end'>
          //     <Link
          //       className='btn-primary px-[70px] py-[9px] text-[14px] mt-[21px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
          //       href={'./curso'}
          //       style={{ display: 'inline-block' }}>
          //       Ver más
          //     </Link>
          //   </div>

          //   {/* Imagen */}
          //   <div className='absolute left-0 top-0 h-full flex items-center justify-end w-[20%]
          // md:hidden'>
          //     <Image
          //       width={72.8}
          //       height={132.75}
          //       src={'https://res.cloudinary.com/dfddh08q8/image/upload/v1696689725/images/imagen_2023-10-07_114206546_teiy3v.png'}
          //       alt='guia turistica'
          //     />
          //   </div>
          // </div>
          }

          {/* Profesores */}
          <div className='relative flex my-[37px]
        md:flex-col'>

            {/* Profesores */}
            <div className='w-full min-h-[462px] mr-[15px] shadow-[0px_4.982935428619385px_29.897613525390625px_#0000000F] bg-white rounded-tl-[20px] rounded-tr-0 rounded-br-0 rounded-bl-0 overflow-hidden
          md:mr-0 md:mb-[20px]'>

              {/* Imagen */}
              <div className='bg-[#5CA8E1] min-h-[178px] relative flex items-end
            md:px-[10px]'>

                <div className='flex w-full justify-evenly'>
                  <Image
                    className='bottom-0
                  md:left-[-50px] md:relative'
                    src={'https://res.cloudinary.com/dfddh08q8/image/upload/v1696693939/images/imagen_2023-10-07_125219786_rzuokc.png'}
                    width={200}
                    height={138}
                    alt='phoneboy'
                  />

                  <h3 className='text-white text-[24px] font-bold flex items-center justify-center w-[175px] text-center
                  md:text-[18px] md:left-[-50px] md:relative'>
                    Profesores  en español
                  </h3>
                </div>
              </div>

              {/* Contenido */}
              <div className='bg-white px-[25px] py-[20px]'>

                <p className='text-violet_dark text-[18px] leading-[21.94px] my-[20px]
              md:text-[14px]'>
                  Aprendé y perfecciona tu español acompañado con professores nativos certificados.
                </p>

                <p className='text-violet_dark text-[18px] leading-[21.94px]
              md:text-[14px]'>
                  ¡Realizalo en tus horarios y sin salir de casa!
                </p>

                {/* Ver más */}
                <div className='w-full flex justify-end mt-[69px]
              md:mt-[15px]'>
                  <Link
                    className='btn-primary px-[70px] py-[9px] text-[14px] mt-[21px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
                    href={'/inicio/teachers'}
                    style={{ display: 'inline-block' }}>
                    Ver más
                  </Link>
                </div>
              </div>


            </div>

            {/* Guias turisticas */}
            <div className='w-full min-h-[462px] ml-[15px] shadow-[0px_4.982935428619385px_29.897613525390625px_#0000000F] bg-white rounded-tl-0 rounded-tr-[20px] rounded-br-0 rounded-bl-0 overflow-hidden
          md:ml-0 md:mb-[20px]'>

              {/* Imagen */}
              <div className='bg-success min-h-[178px] relative flex items-end
            md:px-[10px]'>

                <div className='flex w-full justify-evenly'>
                  <Image
                    className='bottom-0
                  md:left-[-50px] md:relative'
                    src={'https://res.cloudinary.com/dfddh08q8/image/upload/v1696695258/images/imagen_2023-10-07_131418939_o1i6xa.png'}
                    width={200}
                    height={158}
                    alt='girl tourist'
                  />

                  <h3 className='text-white text-[24px] font-bold flex items-center justify-center w-[175px] text-center
                md:text-[18px] md:left-[-50px] md:relative'>
                    Guías Turísticos
                  </h3>
                </div>
              </div>

              {/* Contenido */}
              <div className='bg-white px-[25px] py-[20px]'>

                <p className='text-violet_dark text-[18px] leading-[21.94px] my-[20px]
              md:text-[14px]'>
                  Conocé a nuestros guías turíticos y las excursiones que podes realizar con ellos.
                </p>

                <p className='text-violet_dark text-[18px] leading-[21.94px]
              md:text-[14px]'>
                  ¡Veni a Cordoba!
                </p>

                {/* Ver más */}
                <div className='w-full flex justify-end mt-[69px]
              md:mt-[15px]'>
                  {/* <Link
                    className='btn-success px-[70px] py-[9px] text-[14px] mt-[21px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
                    href={'/inicio/tourGuides'}
                    style={{ display: 'inline-block' }}>
                    Ver más
                  </Link> */}
                  <span
                    className='btn-success px-[70px] py-[9px] text-[14px] mt-[21px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040] pointer-events-none'
                    style={{ display: 'inline-block' }}>
                    Próximamente . . .
                  </span>
                </div>
              </div>


            </div>

          </div>

          <Copyright/>
        </main>
      )}
    </>
  )
}
