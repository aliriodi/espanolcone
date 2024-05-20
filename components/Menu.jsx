import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { classid } from '../redux/ECEActions'
import Image from 'next/image';
import Logo from '../public/imgs/logo-gradient.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faAngleRight, faMugHot, faCalendarDays, faEnvelope, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard, faPen, faBell, faBars, faUser, faMoneyBill, faArrowLeft, faUserTie, faMessage, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import SignOutBtn from './signOut/SignOutBtn';
import { setshowClass } from '../redux/ECEActions';
import { useSession } from "next-auth/react";
import Class from '../components/Class/Class'
import ModalPago from './ModalPagoPAYPAL';
import ModalSendEmail from './ModalSendEmail';
import { useRouter } from 'next/navigation';

const Menu = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    //variable para activar modal de enviar emails
    const [isOpenMail, setIsOpenMail] = useState(false);
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

    //#region  Modal de Paypal
    const [paypalModal, setPaypalModal] = useState(false)

    const openPaypalModal = () => {
        setPaypalModal(true)
    }

    const handleChangePaypalModal = (data) => {
        setPaypalModal(data)
    }
    //#endregion

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


    const [isOpenModal, setIsOpenModal] = useState(false);


    return (
        <>
            {/* Nav Bar */}
            {
                !props.onlyMenu ?
                    (
                        <div className={`w-full absolute px-[60px] py-[20px] z-50
                md:px-[25px]`}>
                            <div className='bg-white shadow-[0px_4px_24px_#18292F1A] flex justify-between px-[18px] py-[12px] rounded-[8px] items-center'>

                                {/* Boton de Menu */}
                                <button
                                    ref={menuRef}
                                    onClick={() => setIsOpen(!isOpen)}>
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className='text-[20px] text-violet_dark cursor-pointer' />
                                </button>

                                {/* Datos de Usuario */}
                                <div className='flex items-center'>

                                    {/* Notificaciones */}
                                    {/* <FontAwesomeIcon
                                    className='mr-[22px] text-[20px] text-violet_dark'
                                    icon={faBell} /> */}

                                    {/* Mensajes */}
                                    <Link href={"/inicio/chat/null"}>
                                        <FontAwesomeIcon className='mr-[22px] text-[25px] text-violet_dark' icon={faCommentDots} />
                                    </Link>

                                    {/* Nombre y Rol de Usuario */}
                                    <div className='mr-[14px]'>
                                        {/* Nombre */}
                                        <p className='text-end text-violet_dark text-[14px]'>{session?.user?.first_name}</p>

                                        {/* Rol */}
                                        <p className='text-end text-[#B9B9C3] text-[12px]'>{session?.user?.role[0]}</p>
                                    </div>

                                    {/* Imagen de Usuario */}
                                    <Link
                                        href={"/inicio/profile"}
                                        className='w-[38px] h-[38px] rounded-full bg-[#B9B9C3] flex justify-center items-center '>
                                        {
                                            session?.user?.image ?
                                                <Image
                                                    alt="session.user.image"
                                                    className='w-[38px] h-[38px] bg-primary rounded-full object-cover'
                                                    src={session.user.image.url ?
                                                        session.user.image.url :
                                                        session.user.image}
                                                    width={38}
                                                    height={38} />
                                                :
                                                <FontAwesomeIcon className="text-violet_dark" icon={faUser} />

                                        }
                                    </Link>
                                </div>

                            </div>
                        </div>
                    )
                    :
                    (
                        <button
                            className='bg-white shadow-[0px_4px_24px_#18292F1A] absolute top-[20px] left-[50px] h-[50px] w-[50px] rounded-full flex items-center justify-center
                        hover:bg-gray_light transition-all
                        md:top-[10px] md:left-[10px]'
                            ref={menuRef}
                            onClick={() => setIsOpen(!isOpen)}>
                            <FontAwesomeIcon
                                icon={faBars}
                                className='text-[20px] text-violet_dark cursor-pointer' />
                        </button>
                    )

            }

            {/* Volver a Atras */}
            <div
                onClick={
                    () => {
                        if (props.redirectPath) router.push(props.redirectPath)
                        else history.back()
                    }
                }
                className={`bg-white shadow-[0px_4px_24px_#18292F1A] absolute ${currentPathName == '/inicio/home' || currentPathName == '/inicio/calendar' ? "top-[20px]" : "top-[100px]"} left-[60px] h-[50px] w-[50px] rounded-full flex items-center justify-center z-[49] cursor-pointer opacity-[0.7]
            hover:opacity-[1] transition-all
            md:left-[25px]`}>
                <FontAwesomeIcon
                    className='text-violet_dark text-[20px]'
                    icon={faArrowLeft} />
            </div>

            {/* Menu */}
            <div className={`
            ${!props?.permanentOpen && "fixed"}  
            ${!isOpen ? "left-[-300px]" : "left-0"}
            bg-white  max-w-[277px] px-1 py-1 h-screen z-[60] shadow-[0px_0px_15px_#0000000D] transition-all
            md:text-[14px]`}>

                {/* Opciones */}
                <nav className="my-8 flex flex-row-reverse  h-full justify-between overflow-auto menu" style={{ fontWeight: '500' }}>
                    <div className=' flex flex-col justify-between mx-[14px] mb-10 min-w-[225px]'>

                        {/* Seccion Superior */}
                        <div>
                            {/* Logo */}
                            <div >
                                <Link href="/inicio/home" >
                                    <Image src={Logo} className='mb-[10px]' style={{ width: '80px' }} alt="Logo" />
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
                                {/*Express */}
                                <li>
                                    <Link
                                        href={'/inicio/MiniLessons'}
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/inicio/MiniLessons' && "bg-primary text-white"}
                                    hover:bg-primary hover:text-white`}>
                                        <FontAwesomeIcon className="mr-[5px]" icon={faMugHot} />
                                        Español Express
                                    </Link>

                                </li>

                                {/* Calendario */}
                                <li>
                                    <Link
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/inicio/calendar' && "bg-primary text-white"}
                                    hover:bg-primary hover:text-white`}
                                        href="/inicio/calendar">
                                        <FontAwesomeIcon icon={faCalendarDays} className=" mr-[10px]" />
                                        <p>Agenda</p>
                                    </Link>
                                </li>
                                {/* Calendario Grupal */}
                                <li>
                                    <Link
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/inicio/calendar' && "bg-primary text-white"}
                                    hover:bg-primary hover:text-white`}
                                        href="/inicio/calendarGroup">
                                        <FontAwesomeIcon icon={faCalendarDays} className=" mr-[10px]" />
                                        <p>Agenda grupal</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/inicio/calendar' && "bg-primary text-white"}
                                    hover:bg-primary hover:text-white`}
                                        href="/inicio/formGroup">
                                        <FontAwesomeIcon icon={faCalendarDays} className=" mr-[10px]" />
                                        <p>Formulario grupal</p>
                                    </Link>
                                </li>


                                {/* Profesores */}
                                <li>
                                    <Link
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/teachers' && "bg-primary text-white"}
                                    hover:bg-primary hover:text-white`}
                                        href="/inicio/teachers" >
                                        <FontAwesomeIcon icon={faChalkboardUser} className="mr-[10px]" />
                                        <p>Profesores</p>

                                    </Link>
                                </li>

                                {/* Guías turisticos */}
                                {/* <li>
                                    <Link
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/tourGuides' && "bg-primary text-white"}
                                    hover:bg-primary hover:text-white`}
                                        href="/inicio/tourGuides">
                                        <FontAwesomeIcon icon={faPersonHiking} className=" mr-[10px]" />
                                        <p>Guías turisticos</p>
                                    </Link>
                                </li> */}

                                {/* Guia Turistico */}
                                <li className='relative'>

                                    {/* <span className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all opacity-[50%]`}> */}
                                    <Link
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                                     ${currentPathName == '/inicio/tourGuides' && "bg-primary text-white"}
                                                    hover:bg-primary hover:text-white`}
                                        href="/inicio/tourGuides">
                                        {/* icon */}
                                        <FontAwesomeIcon icon={faPersonHiking} className=" mr-[10px]" />

                                        {/* Texto */}
                                        <p>Guías turisticos</p>
                                    </Link>
                                    {/* </span> */}

                                    {/* Muy pronto */}
                                    {/* <p className='absolute font-semibold bg-gradient-to-r from-success to-warning top-0 right-0 text-white h-full flex items-center rounded-[0_7px_7px_0] p-2'>Muy pronto . . .</p> */}

                                    {/* borde */}
                                    {/* <span className='border-2 border-success rounded-[7px] w-full h-full absolute top-0'></span> */}
                                </li>

                                {/* Para enviar Emails */}
                                <li>
                                    <button
                                        className={`flex items-center w-full justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                            && "bg-primary text-white"}
                                        hover:bg-primary hover:text-white`}
                                        onClick={() => setIsOpenMail(true)}>
                                        <FontAwesomeIcon icon={faEnvelope} className="  mr-[10px]" />
                                        <p>Contáctanos</p>
                                    </button>
                                    {isOpenMail && <ModalSendEmail open={setIsOpenMail} />}
                                </li>

                                {/* Panel Admin */}
                                {
                                    session && session.user && session.user.role.includes('admin') &&
                                    <li>
                                        <Link
                                            className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/inicio/admin' && "bg-primary text-white"}
                                    hover:bg-primary hover:text-white`}
                                            href={"/inicio/admin/"}>
                                            <FontAwesomeIcon icon={faUserTie} className=" mr-[10px]" />
                                            <p>Administracion</p>
                                        </Link>
                                    </li>
                                }
                                {/* RUTAS LINGÜÍSTICAS: */}
                                {/* <li>
                                    <Link
                                        className={`flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-[#A4ACB91A] border-solid border-[1px] rounded-[7px] transition-all
                                        ${currentPathName == '/inicio/rutaslinguistic' && "bg-primary text-white"}
                                    hover:bg-primary hover:text-white`}
                                        href="/inicio/rutaslinguistic">
                                        <FontAwesomeIcon icon={faPlane} className="  mr-[10px]" />
                                        <p>Rutas Lingüísticas</p>
                                    </Link>
                                </li> */}

                                {/* ////////// Pronto ////////// */}


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
                </nav>
            </div>
        </>
    );
};

export default Menu;
