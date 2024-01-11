import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Logo from '../../public/imgs/logo-gradient.png';
import Image from 'next/image';
import { faCircleCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PlansAync from '../Plan/PlansAync';

export default function ModalListTourist({setOpen}) {
    const { t } = useTranslation('index');

   


   

   
    return (
        <div>
            <div
                onClick={() => setOpen(false)}
                className='fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]'>



                <div
                onClick={(e) => e.stopPropagation()}
                className='bg-white rounded-md p-5 flex flex-col w-[700px] relative
                md:w-full md:rounded-none'>

                    {/* Boton de cerrar modal */}
                    <FontAwesomeIcon
                        onClick={() => setOpen(false)}
                        icon={faX}
                        className='absolute right-5 top-5 text-violet_dark w-[12px] z-50 ursor-pointer'/>
                    
                    {/* Logo */}
                    <div className=' flex justify-center flex-col items-center relative mb-[30px]'>
                        <Image  src={Logo} className='' style={{ width: '100px' }} alt="Logo" />
                    </div>

                    <PlansAync closePlan={setOpen}/ >
                

                
                
                    
                </div>
            </div>
        </div>
    )
}
