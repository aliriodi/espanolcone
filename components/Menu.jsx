// import Image from 'next/image'
// import Logo from '../public/imgs/logo-primary.png'
// import Link from 'next/link'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';

// export default function Menu(){

//     return(
//         <>
//         <div className='bg-white flex flex-col fixed px-4 py-4 h-screen'>
//             {/* Logo */}
//             <div>
//                 <Link href="/home">
//                     <Image src={Logo} className='' style={{width: '108px'}} alt="logo" />
//                 </Link>
//             </div>

//             {/* Opciones */}
//             <nav className='my-8' style={{fontWeight: '500'}}>

//                 {/* Inicio */}
//                 <Link href="/home" className='p-2 rounded-md border border-gray-clear flex item-center my-5' >

//                     {/* Icono y texto */}
//                     <div className='flex item-center mr-20 self-center' style={{alignItems:'center'}}>
//                         <FontAwesomeIcon icon={faHouse} className='mr-2'/>
//                         <p className=''>Inicio</p>
//                     </div>

//                     {/* Notificacion */}
//                     <div className='flex item-center' style={{alignItems:'center'}}>
//                         <p
//                         className='text-white bg-primary px-2 py-0 rounded-full mr-2'>
//                             2
//                         </p>
//                         <FontAwesomeIcon icon={faAngleRight} />
//                     </div>
//                 </Link>

//                 {/* Clases */}
//                 <Link href="/home" className='p-2 rounded-md border border-gray-clear flex item-center my-5' >

//                     {/* Icono y texto */}
//                     <div className='flex item-center mr-20 self-center' style={{alignItems:'center'}}>
//                         <FontAwesomeIcon icon={faHouse} className='mr-2'/>
//                         <p>Clases</p>
//                     </div>

//                     {/* Notificacion */}
//                     <div className='flex item-center' style={{alignItems:'center'}}>
//                         <p
//                         className='text-white bg-primary px-2 py-0 rounded-full mr-2'>
//                             2
//                         </p>
//                         <FontAwesomeIcon icon={faAngleRight} />
//                     </div>
//                 </Link>

//                 {/* Logros */}
//                 <Link href="/home" className='p-2 rounded-md border border-gray-clear flex item-center my-5' >

//                     {/* Icono y texto */}
//                     <div className='flex item-center mr-20 self-center' style={{alignItems:'center'}}>
//                         <FontAwesomeIcon icon={faHouse} className='mr-2'/>
//                         <p>Logros</p>
//                     </div>

//                     {/* Notificacion */}
//                     <div className='flex item-center' style={{alignItems:'center'}}>
//                         <p
//                         className='text-white bg-primary px-2 py-0 rounded-full mr-2'>
//                             2
//                         </p>
//                         <FontAwesomeIcon icon={faAngleRight} />
//                     </div>
//                 </Link>

//             </nav>
//         </div>
//         </>
//     )
// }

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Logo from '../public/imgs/logo-primary.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import SignOutBtn from './signOut/SignOutBtn';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
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
        <div className="bg-white flex flex-col fixed px-1 py-1 h-screen" ref={menuRef}>
            {/* Opciones */}
            <nav className="my-8" style={{ fontWeight: '500' }}>


                {/* Contenido del menú */}
                {isOpen && (
                    <div>
                        {/* Logo */}
                        <Link href="/home">
                            <Image src={Logo} className='mb-5 ml-8 mt-5' style={{ width: '108px' }} alt="logo" />
                        </Link>
                        <ul className="ml-auto ">
                            <li>
                                <Link href="/home">
                                    <div className="flex item-center mb-5 mr-20 self-center">
                                        <FontAwesomeIcon icon={faHouse} className="mr-2" />
                                        <p>Inicio</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/home">
                                    <div className="flex item-center mb-5 mr-20 self-center">
                                        <FontAwesomeIcon icon={faHouse} className="mr-2" />
                                        <p>Clases</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/Home">
                                    <div className="flex item-center mr-20 self-center">
                                        <FontAwesomeIcon icon={faHouse} className="mr-2" />
                                        <p>Logros</p>
                                    </div>
                                </Link>
                            </li>
                            <li>
                              <SignOutBtn />
                            </li>
                        </ul>
                    </div>
                )}
                {/* Botón para abrir/cerrar el menú */}
                <button
                    className="p-2 rounded-md border border-gray-clear flex item-center my-5"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </nav>
        </div>
    );
};

export default Menu;
