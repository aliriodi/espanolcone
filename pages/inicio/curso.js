import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faBookOpen, faCheck, faListCheck } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import Select from 'react-select'
import { classid } from '../../redux/ECEActions'
import { useDispatch } from "react-redux";


export default function Curso(){
    const {data: session,status} = useSession();

    const [levels, setLevels] = useState()

    const [currentLevel, setCurrentLevel] = useState()

    const [lastTestDone, setLastTestDone] = useState()

    const dispatch = useDispatch()

    useEffect(()=>{
        // Actualiza Niveles
        setLevels(session?.user.classes.map((level)=>
                {
                    return{
                        value: level.level,
                        label: level.level,
                        modules: level.units
                    }
                }
            )
        )

        // Actualiza lastTestDone
        console.log("lastTestDone ",session?.user.position)
    },[session])

    useEffect(()=>
    {
        // Actualiza Nivel Actual si no tiene un valor
        if(!currentLevel && levels)setCurrentLevel(levels[0])

        console.log(session)
    },[levels])

    function handleChangeSelect(e){
        setCurrentLevel(e)
    }

    function handleUnit(e){
        // e.preventDefault()
        dispatch(classid("1"));
    }

    return(
        <>
        <Menu />

        <section className="ml-[225px] relative py-[60px] px-[40px]">
            {/* Bienvenido */}
            <div
            className='flex justify-center py-[30px] rounded-[8.12px] items-center flex-col relative mx-[20px]'
            style={{background:'linear-gradient(38.12deg, #7834E4 40.17%, #0E98B6 122.83%)'}}>
                {/* Icono */}
                <FontAwesomeIcon
                className='text-[28px] text-white p-[21px] bg-primary rounded-full mb-[28px] shadow-[0px_5.410437107086182px_5.410437107086182px_#00000040]'
                icon={faMedal}
                />

                {/* Titulo */}
                {session ?
                <h1 className="text-white text-[28px]">Felicidades, {session.user.first_name}</h1>
                :
                <h1 className="text-white text-[28px]">Felicidades</h1>
                }

                {/* Texto */}
                <p className='text-white text-[21px] mt-[21px]'>Has tenido un excelente progreso en tus clases y tu nivel de español.</p>

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
            <div className="bg-white rounded-[8.12px] flex items-center justify-between px-[40px] py-[10px] my-[24px] shadow-[0px_4.982935428619385px_29.897613525390625px_#0000000F] mx-[20px]">
                {/* Text */}
                <p className="text-[18px]">
                    Estas en el {currentLevel?.label}
                </p>

                {/* Select */}
                <Select
                value={currentLevel}
                options={levels}
                className="text-[18px] min-w-[230px]"
                onChange={handleChangeSelect}/>
            </div>

            {/* Modulos */}
            <div className="w-full flex flex-wrap">
                {currentLevel?.modules?.length > 0 &&
                currentLevel?.modules.map((module)=>(
                    <Link
                    onClick={handleUnit}
                    key={module.number}
                    href={'/inicio/unidad'}
                    className={`bg-white flex flex-col shadow-[0px_0px_4px_#00000040] rounded-[8px] py-[12px] justify-center min-w-[145px] items-center mx-[20px] mb-[50px] relative
                    transition-all hover:min-w-[160px]
                    ${!module.enable && "pointer-events-none opacity-50"}`}>
                        
                        {/* Icono */}
                        <FontAwesomeIcon
                        className="text-white bg-success rounded-full w-auto text-[48px] p-[16px]"
                        icon={faBookOpen}/>

                        {/* Unidad */}
                        <p className="text-[18px] mt-[16px] font-medium text-violet_dark">UNIDAD</p>

                        {/* Numero de Unidad */}
                        <p className="text-[18px] font-bold text-violet_dark">{module.number}</p>

                        {/* Check */}
                        {
                        module.done &&
                            <FontAwesomeIcon
                            className="absolute bg-secondary text-white top-1 right-1 rounded-full py-[6px] px-[7px] text-[20px]"
                            icon={faCheck}/>
                        }

                    </Link>
                )) 
                }
                

            </div>

        </section>
        </>
    )
}