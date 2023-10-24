import Link from 'next/link'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Menu from '../../components/Menu';
import Class from '../../components/Class/Class';
import { useSpring, animated } from 'react-spring';
import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft, faAngleRight, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard, faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { classid } from '../../redux/ECEActions'
import Spinner from './../../components/Spinner';

export default function Home() {
  const [totalUnits, setTotalUnits] = useState()
  const [unitsDone, setUnitsDone] = useState()

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

    for (let i = 0; session?.user?.classes.length > i; i++) {
      // Se ponen todas las clases en un mismo array 
      currentClasses = [...currentClasses, ...session?.user?.classes[i]?.units]
    }

    // Se le asigna las cantidad de clases totales
    clasesLength = currentClasses.length

    // Se le asigna la cantidad de clases completadas totales
    classesDone = currentClasses.indexOf(currentClasses.find((c) => c.unitID == session?.user?.position.id))

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

    // Busca hasta que unidad llego en el nivel actual
    for (let i = 0; currentLevel?.units?.length > i; i++) {
      if (currentLevel?.units[i]?.unitID == session?.user?.position.id) {
        currentUnitDone = i;
        break;
      }
    }

    setUnitsDone(currentUnitDone || 0)
    setTotalUnits(currentLevel?.units?.length || 0)
  }

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

      <Menu />
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <Spinner />
        </div> // Muestra el componente Spinner cuando isLoading es true
      ) : (

        <main className='ml-[40px] relative p-[60px] overflow-hidden
      md:ml-0 md:px-[25px]'>

          {/* Bienvenido */}
          <div
            className='flex justify-center py-[30px] rounded-[8.12px] items-center flex-col'
            style={{ background: 'linear-gradient(38.12deg, #7834E4 40.17%, #0E98B6 122.83%)' }}>

            {/* Icono */}
            <FontAwesomeIcon
              icon={faFlagCheckered}
              className='text-[28px] text-white p-[21px] bg-primary rounded-full mb-[28px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
            />

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
          </div>

          {/* Porentaje de progresos */}
          <div className='bg-white shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] py-[24px] px-[21px] rounded-[8.12px] my-[20px]'>

            {/* Barra de Porsentages */}
            <ul className='flex justify-between
          md:flex-wrap'>
              {/* Progreso General */}
              <li className='w-[100%] mr-[50px]
            md:w-[45%] md:mr-0 md:mb-[25px]'>

                <p className='md:text-[11px]'>Progreso general</p>

                {/* Barra de progreso */}
                <div className='w-[100%] bg-success_light rounded-full h-[14px] relative'>
                  <animated.div
                    className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-success"
                    style={{
                      width: `${GeneralProgress}%`,
                      // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
                    }}
                  >
                    {
                      GeneralProgress > 0 &&
                      <p className='text-[12px] text-white'>{GeneralProgress}%</p>
                    }
                  </animated.div>
                  
                  {/* En caso de que no haya progreso */}
                  {
                    GeneralProgress == 0 &&
                    <p className='text-[12px] text-success absolute top-0 w-full text-center font-semibold'>0%</p>
                  }
              </div>

              </li>

              {/* Unidades realizadas */}
              <li className='w-[100%] mr-[50px]
            md:w-[45%] md:mr-0 md:mb-[25px]'>
                <p className='md:text-[11px]'>Unidades realizadas</p>

                {/* Barra de progreso */}
                <div className='w-[100%] bg-success_light rounded-full h-[14px] relative'>
                  <animated.div
                    className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-success"
                    style={{
                      width: `${(unitsDone / totalUnits) * 100}%`,
                      // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
                    }}
                  >
                    {
                      unitsDone > 0 &&
                      <p className='text-[12px] text-white'>{unitsDone} / {totalUnits}</p>
                    }
                    
                  </animated.div>
                  
                  {/* En caso de que no haya actividades echas */}
                  {
                    unitsDone == 0 &&
                    <p className='text-[12px] text-success absolute top-0 w-full text-center font-semibold'>0 / {totalUnits}</p>
                  }
              </div>
            </li>
            
            {/* Clase individual */}
            <li className='w-[100%] mr-[50px]
            md:w-[45%] md:mr-0 md:mb-[25px]'>
                <p className='md:text-[11px]'>Clase individual</p>

                {/* Barra de progreso */}
                <div className='w-[100%] bg-success_light rounded-full h-[14px] relative'>
                  <animated.div
                    className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-success"
                    style={{
                      width: '50%',
                      // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
                    }}
                  >
                    <p className='text-[12px] text-white'>5 / 10</p>
                  </animated.div>
                </div>
              </li>

              {/* Guía turistico */}
              <li className='w-[100%] 
            md:w-[45%] md:mr-0 md:mb-[25px]'>
                <p className='md:text-[11px]'>Guía turistico</p>

                {/* Barra de progreso */}
                <div className='w-[100%] bg-success_light rounded-full h-[14px] relative'>
                  <animated.div
                    className="progress-bar rounded-l-full h-[14px] flex justify-center items-center bg-success"
                    style={{
                      width: '50%',
                      // backgroundColor: '#ccc', // Color de fondo de la barra de progreso
                    }}
                  >
                    <p className='text-[12px] text-white'>5 / 10</p>
                  </animated.div>
                </div>
              </li>
            </ul>

            {/* Ir a curso */}
            <div className='w-full flex justify-end'>
              <Link
                onClick={dispatch(classid(session?.user.position?.id))}
                className='btn-primary px-[70px] py-[9px] text-[14px] mt-[21px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]
            md:w-full md:mt-0 md:text-center'
                href={'./unidad'}
                style={{ display: 'inline-block' }}>
                Ir al curso
              </Link>
            </div>
          </div>

          {/* Ver Progreso del curso */}
          <div className='bg-white shadow-[0px_1.3526092767715454px_5.410437107086182px_#00000040] py-[24px] px-[21px] rounded-[8.12px] relative'>

            {/* Texto */}
            <div className='flex flex-col items-center'>
              <h2 className='mb-3
            md:text-[18.02px]'>Progreso de tu curso</h2>
              <p className='text-violet_dark 
            md:text-[14px]'>Encontrá toda la información de los niveles y unidades que ya realizaste.</p>
            </div>

            {/* Ver más */}
            <div className='w-full flex justify-end'>
              <Link
                className='btn-primary px-[70px] py-[9px] text-[14px] mt-[21px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
                href={'./curso'}
                style={{ display: 'inline-block' }}>
                Ver más
              </Link>
            </div>

            {/* Imagen */}
            <div className='absolute left-0 top-0 h-full flex items-center justify-end w-[20%]
          md:hidden'>
              <Image
                width={72.8}
                height={132.75}
                src={'https://res.cloudinary.com/dfddh08q8/image/upload/v1696689725/images/imagen_2023-10-07_114206546_teiy3v.png'}
                alt='guia turistica'
              />
            </div>
          </div>

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
                    href={'/#'}
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
                  <Link
                    className='btn-success px-[70px] py-[9px] text-[14px] mt-[21px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
                    href={'/#'}
                    style={{ display: 'inline-block' }}>
                    Ver más
                  </Link>
                </div>
              </div>


            </div>

          </div>
        </main>
      )}
    </>
  )
}
