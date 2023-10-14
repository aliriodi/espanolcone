import { useSession } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal, faBookOpen, faCheck, faListCheck, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Menu from "../../components/Menu";
import Select from 'react-select'


export default function Unidad(){
    const {data: session,status} = useSession();


    return(
        <>

        <Menu />

        <section className="ml-[225px] relative py-[60px] px-[40px] ">
            
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

            {/* Unidades */}
            <div className=" mx-[20px] my-[32px] flex relative justify-between flex-wrap">

                {/* Mis Metas */}
                <Link href={'/courses'} className="mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative">
                    
                        {/* Contenido */}
                        <div className="flex items-center">
                            {/* Icono */}
                            <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                <Image
                                    alt=""
                                    width={36}
                                    height={36}
                                    src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1697119384/images/aprender-en-linea_7_cqjjwh.png"}/>
                            </span>

                            {/* Texto */}
                            <p className="ml-[32px] text-[24px] font-medium text-violet_dark">
                                Mis metas
                            </p>
                        </div>

                        {/* Check */}
                        <span>
                            <FontAwesomeIcon
                            className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                            icon={faCheck}/>
                        </span>
                </Link>
                
                {/* Comencemos */}
                <Link href={'/courses'} className="mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative">
                    
                        {/* Contenido */}
                        <div className="flex items-center">
                            {/* Icono */}
                            <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                <Image
                                    alt=""
                                    width={36}
                                    height={36}
                                    src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1696970606/images/book_kvtyqe.png"}/>
                            </span>

                            {/* Texto */}
                            <p className="ml-[32px] text-[24px] font-medium text-violet_dark">
                                Comencemos
                            </p>
                        </div>

                        {/* Check */}
                        <span>
                            <FontAwesomeIcon
                            className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                            icon={faCheck}/>
                        </span>
                </Link>

                {/* Aprendemos */}
                <Link href={'/courses'} className="mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative">
                    
                        {/* Contenido */}
                        <div className="flex items-center">
                            {/* Icono */}
                            <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                <Image
                                    alt=""
                                width={36}
                                height={36}
                                src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1696961818/images/head_ddujqx.png"}/>
                            </span>

                            {/* Texto */}
                            <p className="ml-[32px] text-[24px] font-medium text-violet_dark">
                                Aprendemos
                            </p>
                        </div>

                        {/* Check */}
                        <span>
                            <FontAwesomeIcon
                            className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                            icon={faCheck}/>
                        </span>
                </Link>
                
                {/* Practiquemos */}
                <Link href={'/courses'} className="mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative">
                    
                        {/* Contenido */}
                        <div className="flex items-center">
                            {/* Icono */}
                            <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                <Image
                                    alt=""
                                    width={36}
                                    height={36}
                                    src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1697119720/images/hacer-clic_1_zr9rai.png"}/>
                            </span>

                            {/* Texto */}
                            <p className="ml-[32px] text-[24px] font-medium text-violet_dark">
                                Practiquemos
                            </p>
                        </div>

                        {/* Check */}
                        <span>
                            <FontAwesomeIcon
                            className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                            icon={faCheck}/>
                        </span>
                </Link>
                
                {/* Mis retos */}
                <Link href={'/courses'} className="mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative">
                    
                        {/* Contenido */}
                        <div className="flex items-center">
                            {/* Icono */}
                            <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                <Image
                                    alt=""
                                    width={36}
                                    height={36}
                                    src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1697119604/images/aprobacion_2_tne492.png"}/>
                            </span>

                            {/* Texto */}
                            <p className="ml-[32px] text-[24px] font-medium text-violet_dark">
                                Mis retos
                            </p>
                        </div>

                        {/* Check */}
                        <span>
                            <FontAwesomeIcon
                            className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                            icon={faCheck}/>
                        </span>
                </Link>
                
                {/* Evaluemos */}
                <Link href={'/courses'} className="mb-[24px] bg-white shadow-[0px_0px_4px_#00000040] rounded-[8px] min-w-[49%] py-[10px] px-[25px] flex items-center justify-between relative">
                    
                        {/* Contenido */}
                        <div className="flex items-center">
                            {/* Icono */}
                            <span className="bg-success rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                <Image
                                    alt=""
                                    width={36}
                                    height={36}
                                    src={"https://res.cloudinary.com/dfddh08q8/image/upload/v1697119795/images/idea_1_sxrdhn.png"}/>
                            </span>

                            {/* Texto */}
                            <p className="ml-[32px] text-[24px] font-medium text-violet_dark">
                                Evaluemos
                            </p>
                        </div>

                        {/* Check */}
                        <span>
                            <FontAwesomeIcon
                            className=" bg-secondary text-white rounded-full py-[6px] px-[7px] text-[20px]"
                            icon={faCheck}/>
                        </span>
                </Link>

            </div>
        </section>


        </>
    )
}