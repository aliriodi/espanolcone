import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Logo from '../public/imgs/logo-primary.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faHouse, faPersonHiking, faChalkboardUser, faLaptop, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import SignOutBtn from './signOut/SignOutBtn';
import { setshowClass } from '../redux/ECEActions';

const Menu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    //   console.log(useSelector((state) => state.datos).showClass)
    useSelector((state) => state.datos).showClass
    const [showClass, setShowClass] = useState(useSelector((state) => state.datos).showClass);

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
                                    <Link href="/courses" >
                                        <div className="flex items-center justify-start mb-5 self-center ">

                                            Curso
                                            {/* <a onClick={(e) => { e.preventDefault(); showHideClass(); }}>Curso</a> */}

                                        </div>

                                    </Link>
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
