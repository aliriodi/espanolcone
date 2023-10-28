import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { classid } from '../redux/ECEActions'
import Image from 'next/image';
import Logo from '../public/imgs/logo-gradient.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard, faPen, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import SignOutBtn from './signOut/SignOutBtn';
import { setshowClass } from '../redux/ECEActions';
import { useSession } from "next-auth/react";
import Class from '../components/Class/Class'
import Courses from '../pages/courses'

const Menu = () => {
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    //   console.log(useSelector((state) => state.datos).showClass)
    useSelector((state) => state.datos).showClass
    const [showClass, setShowClass] = useState(useSelector((state) => state.datos).showClass);
    const [mostrarComponenteA, setMostrarComponenteA] = useState(false)
    const toggleComponenteA = () => {
        setMostrarComponenteA(!mostrarComponenteA);
        setMostrarComponenteB(false);
        setMostrarComponenteC(false);
        // <Link href={'/courses'}/>;
        // <Courses id="1"/>

    };
    const [mostrarComponenteB, setMostrarComponenteB] = useState(false)
    const toggleComponenteB = () => {
        setMostrarComponenteB(!mostrarComponenteB);
        setMostrarComponenteA(false);
        setMostrarComponenteC(false);
    };
    const [mostrarComponenteC, setMostrarComponenteC] = useState(false)
    const toggleComponenteC = () => {
        setMostrarComponenteC(!mostrarComponenteC);
        setMostrarComponenteB(false);
        setMostrarComponenteA(false);
    };
    const showHideClass = () => {
        //Para Redux
        dispatch(setshowClass(!showClass))
        //Para el componente
        setShowClass(!showClass);

    };
    const menuRef = useRef(null);

    const [currentPathName, setCurrentPathName] = useState("")

    useEffect(() => {
        setCurrentPathName(window.location.pathname)

        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        // Agregar el event listener cuando se monta el componente
        document.addEventListener('click', handleClickOutside);

        // Limpiar el event listener cuando se desmonta el componente
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
    };


    return (
        <>
            {/* Nav Bar */}
            <div className='w-full absolute px-[40px] py-[8px]'>
                <div className='bg-white shadow-[0px_4px_24px_#18292F1A] flex justify-between px-[18px] py-[12px] rounded-[8px] items-center'>

                    {/* Boton de Menu */}
                    <button 
                    ref={menuRef}
                    onClick={() => setIsOpen(!isOpen)}>
                        <FontAwesomeIcon
                        icon={faBars}
                        className='text-[20px] text-violet_dark cursor-pointer'/>
                    </button>

                    {/* Datos de Usuario */}
                    <div className='flex items-center'>
                        {/* Notificaciones */}
                        <FontAwesomeIcon
                        className='mr-[22px] text-[20px] text-violet_dark'
                        icon={faBell}/>

                        {/* Nombre y Rol de Usuario */}
                        <div className='mr-[14px]'>
                            {/* Nombre */}
                            <p className='text-end text-violet_dark text-[14px]'>{session?.user?.first_name}</p>

                            {/* Rol */}
                            <p className='text-end text-[#B9B9C3] text-[12px]'>{session?.user?.role[0]}</p>
                        </div>

                        {/* Imagen de Usuario */}
                        <Image
                        className='w-[38px] h-[38px] bg-primary rounded-full'
                        src={session?.user?.image?.url}
                        width={38}
                        height={38}/>
                    </div>

                </div>
            </div>

            {/* Menu */}
            <div className={`bg-white fixed ${isOpen && "px-1"} py-1 h-screen z-20 shadow-[0px_0px_15px_#0000000D]`}>

                {/* Opciones */}
                <nav className="my-8 flex flex-row-reverse  h-full justify-between" style={{ fontWeight: '500' }}>

                    {/* Contenido del menú */}
                    {isOpen && (
                        <div className=' flex flex-col justify-between mx-[14px] mb-10 min-w-[225px]'>

                            {/* Seccion Superior */}
                            <div>
                                {/* Logo */}
                                <div >
                                    <Link href="/inicio/home" >
                                        <Image src={Logo} className='mb-[10px]' style={{ width: '80px' }} alt="logo" />
                                    </Link>

                                </div>

                                {/* Opciones Principales */}
                                <ul className="text-title_color">

                                    {/* Inicio */}
                                    <li>
                                        <Link
                                            className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all    
                                            ${currentPathName == '/inicio/home' && "bg-primary text-white"}
                                        hover:bg-primary hover:text-white`}
                                            href="/inicio/home">
                                            <FontAwesomeIcon icon={faHouse} className="  mr-[10px]" />
                                            <p>Inicio</p>
                                        </Link>
                                    </li>

                                    {/* Curso */}
                                    <li>
                                        <Link
                                            className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                            ${currentPathName == '/inicio/curso' && "bg-primary text-white"}
                                        hover:bg-primary hover:text-white`}
                                            href="/inicio/curso">
                                            <FontAwesomeIcon icon={faLaptop} className="  mr-[10px]" />
                                            <p>Curso</p>
                                        </Link>
                                    </li>

                                    {/* Profesores */}
                                    <li>
                                        <Link
                                            className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                            ${currentPathName == '/teachers' && "bg-primary text-white"}
                                        hover:bg-primary hover:text-white`}
                                            href="/teachers" >
                                            <FontAwesomeIcon icon={faChalkboardUser} className="mr-[10px]" />
                                            <p>Profesores</p>

                                        </Link>
                                    </li>

                                    {/* Guías turisticos */}
                                    <li>
                                        <Link
                                            className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                            ${currentPathName == '/tourGuides' && "bg-primary text-white"}
                                        hover:bg-primary hover:text-white`}
                                            href="/tourGuides">
                                            <FontAwesomeIcon icon={faPersonHiking} className=" mr-[10px]" />
                                            <p>Guías turisticos</p>
                                        </Link>
                                    </li>

                                    {/* Cargar Clase */}
                                    {session && session.user && session.user.role.includes('admin') ?
                                        <li>
                                            <Link
                                                className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                            ${currentPathName == '/inicio/cargarclase' && "bg-primary text-white"}
                                        hover:bg-primary hover:text-white`}
                                                href="/inicio/cargarclase">
                                                <FontAwesomeIcon icon={faPen} className=" mr-[10px]" />
                                                <p>Cargar Clase</p>
                                            </Link>
                                        </li>
                                        : null}

                                </ul>
                            </div>

                            {/* Opciones de Perfil */}
                            <div>

                                {/* Mi Perfil */}
                                <div className="text-title_color">
                                    <Link
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/inicio/profile' && "bg-primary text-white"}
                                        hover:bg-primary hover:text-white`}
                                        href="/inicio/profile">
                                        <FontAwesomeIcon icon={faAddressCard} className=" mr-[10px]" />
                                        <p>Mi Perfil</p>
                                    </Link>
                                </div>

                                {/* Cerrar Secion */}
                                <SignOutBtn />

                            </div>
                        </div>
                    )}

                    {/* Botón para abrir/cerrar el menú */}
                    {/* <button
                        className=" h-screen items-center p-2 rounded-md border border-gray-clear flex item-center my-5"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FontAwesomeIcon className="" icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
                    </button> */}
                </nav>
            </div>
        </>
    );
};

export default Menu;
