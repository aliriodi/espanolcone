import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { classid } from '../redux/ECEActions'
import Image from 'next/image';
import Logo from '../public/imgs/logo-primary.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard , faPen} from '@fortawesome/free-solid-svg-icons';
import SignOutBtn from './signOut/SignOutBtn';
import { setshowClass } from '../redux/ECEActions';
import { useSession } from "next-auth/react";
import Class from '../components/Class/Class'
import Courses from '../pages/courses'

const Menu = () => {
    const dispatch = useDispatch();
    const {data: session,status} = useSession();
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

    useEffect(() => {
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
        <div className="bg-white fixed px-1 py-1 h-screen" ref={menuRef}>
            {/* Opciones */}
            <nav className="my-8 flex flex-row-reverse  h-full justify-between  " style={{ fontWeight: '500' }}>


                {/* Contenido del menú */}
                {isOpen && (
                    <div className=' flex flex-col justify-between ml-10  mb-10'>

                        {/* Logo */}
                        <div >
                            <Link href="/inicio/home" >
                                <Image src={Logo} className='mb-5 ml-8 mt-5' style={{ width: '108px' }} alt="logo" />
                            </Link>
                            <ul className="ml-auto mt-[100px] ">
                                <li>
                                    <Link href="/inicio/home">
                                        <div className="flex items-center justify-start mb-5 self-center ">
                                            <FontAwesomeIcon icon={faHouse} className="  mr-[10px]" />
                                            <p>Inicio</p>
                                        </div>
                                    </Link>
                                </li>

                                <li>
                                    {/* <Link href="/courses" > */}
                                    <div className="flex items-center justify-start mb-5 self-center " onClick={toggleDropdown}>
                                        <FontAwesomeIcon className="mr-[10px]" icon={faLaptop} />
                                        Curso
                                        {/* <a onClick={(e) => { e.preventDefault(); showHideClass(); }}>Curso</a> */}
                                        {/* {alert(isOpenDropdown)} */}
                                        {isOpenDropdown && (
                                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <div className="px-4 py-2" role="menuitem">
                                                        <div onClick={() => dispatch(classid('652550a40411e033932b2521'))}
                                                            className="flex items-center justify-start mb-5 self-center ">
                                                            <FontAwesomeIcon className="mr-[10px]" icon={faChalkboardUser} />
                                                            <i className="fa-duotone "></i>
                                                            <Link href={'/courses'} >
                                                               <p>clase 1</p>
                                                            </Link>
                                                        </div>
                                                        {/* <div>  {mostrarComponenteA && <Class id={0} />}</div> */}
                                                    </div>
                                                    <div className="px-4 py-2" role="menuitem">
                                                        <div
                                                            onClick={() => dispatch(classid("65285a70bb78bea94a6b1369"))}
                                                            className="flex items-center justify-start mb-5 self-center  ">
                                                            <FontAwesomeIcon className="mr-[10px]" icon={faChalkboardUser} />
                                                            <i className="fa-duotone "></i>
                                                            <Link href={'/courses'} >
                                                                <p>clase2</p>
                                                            </Link>
                                                        </div>
                                                        {/* {mostrarComponenteB && <Class id={1} />} */}
                                                    </div>
                                                    <div className="px-4 py-2" role="menuitem">
                                                        <div
                                                            onClick={() => dispatch(classid('652b19e63288483e7dec262f'))}
                                                            className="flex items-center justify-start mb-5 self-center ">
                                                            <FontAwesomeIcon className="mr-[10px]" icon={faChalkboardUser} />
                                                            <i className="fa-duotone fa-chalkboard-user"></i>
                                                            <Link href={'/courses'} >
                                                                <p>clase 3</p>
                                                            </Link>


                                                        </div>
                                                        {/* {mostrarComponenteC && <Class id={2} />} */}
                                                        {/* </Link> */}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <Link href="/teachers" >
                                        <div className="flex items-center justify-start mb-5 self-center ">
                                            <FontAwesomeIcon icon={faChalkboardUser} className="mr-[10px]" />
                                            <i className="fa-duotone "></i>
                                            <p>Profesores</p>
                                        </div>

                                    </Link>
                                </li>
                               

                                <li>
                                    <Link href="/tourGuides">
                                        <div className="flex items-center justify-start mb-5 self-center ">
                                            <FontAwesomeIcon icon={faPersonHiking} className=" mr-[10px]" />
                                            <p>Guías turisticos</p>
                                        </div>
                                    </Link>
                                </li>
                                {session && session.user && session.user.role.includes('admin')?
                                <li>
                                    <Link href="/inicio/cargarclase">
                                        <div className="flex items-center justify-start mb-5 self-center ">
                                            <FontAwesomeIcon icon={faPen} className=" mr-[10px]" />
                                            <p>Cargar Clase</p>
                                        </div>
                                    </Link>
                                </li>
                                :null}

                            </ul>
                        </div>
                        <div>

                            <div>
                                <Link href="/inicio/home">
                                    <div className="flex items-center justify-start mb-5 self-center ">
                                        <FontAwesomeIcon icon={faAddressCard} className=" mr-[10px]" />
                                        <p>Mi Perfil</p>
                                    </div>
                                </Link>

                            </div>
                            <div>
                                <SignOutBtn />
                            </div>

                        </div>
                    </div>
                )}
                {/* Botón para abrir/cerrar el menú */}
                <button
                    className=" h-screen items-center p-2 rounded-md border border-gray-clear flex item-center my-5"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FontAwesomeIcon className="" icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
                </button>
            </nav>
        </div>
    );
};

export default Menu;
