import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faBookOpen, faCheck, faListCheck, faBook, faPencil, faCircleInfo, faXmark, faLock } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../../../components/Menu";
import Select from 'react-select'
import { classid } from '../../../redux/ECEActions'
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Head from 'next/head'
import Copyright from "../../../components/Class/Copyright";
import Logo from '../../../public/imgs/logo-gradient.png';
//linea comentada mientras se desarrolla modal de pago real
//import PlansAync from '../../../components/Plan/PlansAync'

//para modal de pago
import PlansAync from '../../../components/landingComponents/ModalPagoLanding'
import { useTranslation } from 'next-i18next';
import nextI18NextConfig from "../../../next-i18next.config";

export default function Curso(){
    //para modal de pago TEMPORAL
    const { t } = useTranslation('index');
    //
    const {data: session,status} = useSession();
    
    const router = useRouter();
    const { level } = router.query;

    const [levels, setLevels] = useState()

    const [currentLevel, setCurrentLevel] = useState()

    const [missingUnits, setMissingUnits] = useState()

    const [openModalPay, setOpenModalPay] = useState(false)

    const dispatch = useDispatch()
    

    useEffect(()=>{
        // Actualiza Niveles
        setLevels(session?.user.classes.map((level, index)=>
                {
                    return{
                        index:index,
                        value: level.level,
                        label: level.level,
                        modules: level.units
                    }
                }
            )
        )
    },[session])
    
    useEffect(()=>
    {
        // Actualiza Nivel Actual si no tiene un valor
        let newLevel = levels?.find((l)=> l.label == `Nivel ${level}`)
        if(!currentLevel && levels)setCurrentLevel(newLevel ? newLevel : levels[0])
        
    },[levels])

    useEffect(()=>{
        // actualiza la cantidad de unidades disponibles

        let newMissingUnits = []

        for(let i = 0; i < (12 - currentLevel?.modules?.length); i++){
            newMissingUnits.push({ number : (i + currentLevel?.modules?.length) + 1})
        }
        
    //    console.log(currentLevel)

        setMissingUnits(newMissingUnits)
    },[currentLevel])

    function handleChangeSelect(e){
        setCurrentLevel(e)
        router.push(`/inicio/curso?level=${e?.value?.slice(e?.value?.length - 2, e?.value?.length)}`)
    }

    function handleModalPay(){

    }
    return(
        <>
        <Head>
            <title>Nivel {level} | Español con E</title>
        </Head>

        <Menu />

        <section className="relative py-[119px] px-[40px] overflow-hidden
        md:ml-0 md:px-[25px]">
            {/* Bienvenido */}
            <div
            className='flex justify-center py-[30px] rounded-[8.12px] items-center flex-col relative mx-[20px]
            md:mx-0'
            style={{background:'linear-gradient(38.12deg, #7834E4 40.17%, #0E98B6 122.83%)'}}>
                {/* Icono */}
                <FontAwesomeIcon
                className='text-[28px] text-white p-[21px] bg-primary rounded-full mb-[28px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040] z-10'
                icon={faMedal}
                />

                {/* Titulo */}
                {session ?
                <h1 className="text-white text-[28px]
                md:text-[24px]">Felicidades, {session.user.first_name}</h1>
                :
                <h1 className="text-white text-[28px]
                md:text-[24px]">Felicidades</h1>
                }

                {/* Texto */}
                <p className='text-white text-[21px] mt-[21px] text-center
                md:text-[14px]'>Has tenido un excelente progreso en tus clases y tu nivel de español.</p>

                {/* Imagen de la Derecha */}
                <Image
                className="absolute top-0 right-0"
                width={178}
                height={75}
                alt=""
                src={'https://res.cloudinary.com/dfddh08q8/image/upload/v1696941677/images/imagen_2023-10-10_094118748_tgzx2o.png'}/>

                {/* Imagen de la Izquierda */}
                <Image
                className="absolute top-0 left-0"
                width={178}
                height={75}
                alt=""
                src={'https://res.cloudinary.com/dfddh08q8/image/upload/v1696941779/images/imagen_2023-10-10_094259869_dhejox.png'}/>
            </div>

            {/* Selecionar Nivel */}
            {
                levels?.length > 0 &&
                <div className="bg-white rounded-[8.12px] flex items-center justify-between px-[40px] py-[10px] my-[24px] shadow-[0px_4.982935428619385px_29.897613525390625px_#0000000F] mx-[20px]
                md:mx-0 md:flex-col">
                    {/* Text */}
                    <p className="text-[18px]
                    md:mb-2 md:text-[16px]">
                        Estas en el {currentLevel?.label}
                    </p>

                    {/* Select */}
                    <Select
                    value={currentLevel}
                    options={levels}
                    className="text-[18px] min-w-[230px]
                    md:mt-2 md:text-[16px]"
                    onChange={handleChangeSelect}/>
                </div>
            }

            {/* Modulos */}
            <div className="w-full flex flex-wrap">
                {
                currentLevel?.modules?.length > 0 ?

                <>
                    {
                        // Modulo
                        currentLevel?.modules.map((module, index)=>(
                            <Link
                            onClick={()=> module.toPay == true && setOpenModalPay(true)}
                            key={module.number}
                            href={module.toPay == true ? "#" :`/inicio/curso/unidad?classId=${module.unitID}&currentLevelIndex=${currentLevel.index}&currentUnitIndex=${index}`}
                            as={module.toPay == true ? "#" :`/inicio/curso/unidad?classId=${module.unitID}&currentLevelIndex=${currentLevel.index}&currentUnitIndex=${index}`}
                            className={`bg-white flex flex-col shadow-[0px_0px_4px_#00000040] rounded-[8px] py-[12px] justify-center min-w-[145px] items-center mx-[20px] mb-[50px] relative
                            transition-all hover:min-w-[160px]
                            md:py-[8px] md:px-[10px] md:mb-[10px]
                            ${!module.enable && "opacity-50"}
                            ${!module.enable && session && !session?.user?.role?.includes("admin") && "pointer-events-none"}
                            md:mx-0 md:w-full md:flex-row md:justify-evenly`}>
                                
                                {/* Icono */}
                                <FontAwesomeIcon
                                className="text-white bg-success rounded-full w-auto text-[48px] p-[16px]
                                md:text-[24px] md:p-[8px]"
                                icon={module.enable || module.done ? faBookOpen : faBook}/>

                                <div className="flex flex-col items-center
                                md:flex-row md:mx-auto">
                                    {/* Unidad */}
                                    <p className="text-[18px] mt-[16px] font-medium text-violet_dark
                                    md:mt-0 md:mr-3 md:text-[16px]">UNIDAD</p>

                                    {/* Numero de Unidad */}
                                    <p className="text-[18px] font-bold text-violet_dark
                                    md:text-[16px]">{module.number}</p>
                                </div>

                                {/* Pagar */}
                                {
                                module.toPay == true &&
                                <FontAwesomeIcon className="absolute top-2 right-2 text-violet_dark" icon={faLock}/>
                                }

                                {/* Check */}
                                {
                                module.done &&
                                    <FontAwesomeIcon
                                    className="absolute bg-secondary text-white right-1 rounded-full py-[6px] px-[7px] text-[20px]
                                    md:text-[15px]"
                                    icon={faCheck}/>
                                }

                            </Link>
                        ))
                    } 

                    {
                        // Modulos faltentes
                        missingUnits &&
                        missingUnits?.length > 0 &&

                        missingUnits.map((module)=>(
                            <div
                            key={module.number}
                            className={`bg-white flex flex-col shadow-[0px_0px_4px_#00000040] rounded-[8px] py-[12px] justify-center min-w-[145px] items-center mx-[20px] mb-[50px] relative
                            md:py-[8px] md:px-[10px] md:mb-[10px]
                            md:mx-0 md:w-full md:flex-row md:justify-evenly`}>
                                
                                {/* Icono */}
                                <FontAwesomeIcon
                                className="text-white bg-success rounded-full w-auto text-[48px] p-[16px]
                                md:text-[24px] md:p-[8px]"
                                icon={faBook}/>

                                {/* Unidad */}
                                <div className="flex flex-col items-center
                                md:flex-row md:mx-auto">
                                    {/* Unidad */}
                                    <p className="text-[18px] mt-[16px] font-medium text-violet_dark
                                    md:mt-0 md:mr-3 md:text-[16px]">UNIDAD</p>

                                    {/* Numero de Unidad */}
                                    <p className="text-[18px] font-bold text-violet_dark
                                    md:text-[16px]">{module.number}</p>
                                </div>

                                {/* Proximamente */}
                                <span className="bg-white absolute w-full h-full flex justify-center items-center font-medium opacity-[60%] rounded-[8px] "></span>

                                <span className="absolute w-full h-full flex justify-center items-center font-semibold
                                md:justify-start">

                                    {/* Info */}
                                    <div className=" absolute top-2 right-2 text-violet_dark text-[18px] cursor-pointer info-icon">
                                        <FontAwesomeIcon className="opacity-[50%]" icon={faCircleInfo}/>
                                        <div className="info-popup md:right-0">
                                            Estamos preparando nuevas actividades para que puedas disfrutar de experiencias emocionantes y enriquecedoras. 🚀
                                        </div>
                                    </div>
                                    
                                    {/* Texto */}
                                    <p className="bg-gradient-to-r from-success to-warning w-full text-center py-2 text-white
                                    md:py-1 md:text-[14px] md:w-auto md:h-full md:items-center md:flex md:px-2 md:rounded-[8px_0_0_8px]">
                                        Muy pronto . . .
                                    </p>

                                </span>
                            </div>
                        ))
                    }
                </>
                :
                (
                    // En caso de NO haber Modulos
                    <div className="flex justify-center items-center min-h-[400px] w-full mt-8 flex-col text-light text-[21px]">

                        <FontAwesomeIcon icon={faBookOpen} className="mb-4 text-[2em]"/>
                        
                        <p className="text-light text-[21px] text-center
                        md:text-[14px] ">
                            Aún no tienen clases disponibles
                        </p>
                    </div>
                )
                }

            </div>

            {/* Modal de pago */}
            {
                openModalPay &&
                <div
                onClick={()=>setOpenModalPay(false)}
                className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-50'>

                    <div
                    onClick={(e) => e.stopPropagation()}
                    className='bg-white rounded-md p-5 relative
                    md:w-full md:px-0 md:rounded-none'>
                        {/* Titulo */}
                        <div class="flex items-center mb-[30px] flex-col">
                            <Image alt="Logo302" src={Logo} width={492} height={313} class="w-[123px] h-[78px]"/>
                            <h3 class=" font-medium text-[28px] bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text min-h-[28px] text-center">Elige algunas de nuestras opciones</h3>
                        </div>

                        {/* Contenido */}
                        <div>
                            {/* <PlansAync closePlan={(value)=>setOpenModalPay(value)}/> */}
                            {/*Modal de pago que no anda aun */}
                      { <PlansAync setOpen={setOpenModalPay} email2={session?.user?.email} / >}
                        </div>
                    </div>
                </div>
            }

        </section>

        <Copyright/>
        </>
    )
}