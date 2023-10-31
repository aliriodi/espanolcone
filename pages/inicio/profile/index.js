import Image from 'next/image';
import Menu from '../../../components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Profile(){
    const { data: session, status } = useSession();
    useEffect(()=>console.log(session))

    return(
        <>
        <Menu/>

        <section className='py-[119px] px-[60px]
        md:px-[25px]'>

            {/* Parte Superior */}
            <div className='w-full h-[410px] rounded-[10px] overflow-hidden flex flex-col shadow-[0_1px_2px_#00000033]'
            style={{ background: 'linear-gradient(38.12deg, #33bb99, #4CCFEB )' }}>

                {/* Fondo de Perfil */}
                <div className='h-[350px] flex-grow-1 flex items-end px-[22px]'>

                    {/* Imagen */}
                    
                    {session?.user?.image?.url ?
                        <Image
                        className='bg-gray_clear w-[125px] h-[125px] bottom-[-11px] relative rounded-[10px] object-cover'
                        src={session?.user?.image?.url}
                        width={125}
                        height={125}/>
                        :
                        <span className='bg-gray_clear w-[125px] h-[125px] bottom-[-11px] relative rounded-[10px] flex justify-center items-center'>
                            <FontAwesomeIcon className='text-violet_dark text-[3em]' icon={faUser}/>
                        </span>
                    }

                    <div className='ml-[15px]'>
                        {/* Nombre */}
                        <p className='text-[24px] text-white font-medium'>{session?.user?.first_name}</p>

                        {/* Apellido */}
                        <p className='text-[24px] text-white font-medium'>{session?.user?.last_name}</p>

                        {/* Email */}
                        <p className='text-white'>{session?.user?.email}</p>
                    </div>
                </div>

                {/* Edicion de perfil */}
                <div className='bg-white p-[12px] flex justify-end '>
                    <Link href={"./profile/edit"} className='btn-primary px-[55px] py-[9px]'>
                        Editar
                        <FontAwesomeIcon className='ml-[6px]' icon={faPenToSquare}/>
                    </Link>
                </div>

            </div>

            {/* Parte Inferior */}
            <div className='flex mt-[24px] w-full justify-between'>

                {/* Parte de la Izquierda */}
                <div className='w-[45%] rounded-[10px] overflow-hidden shadow-[0px_4px_24px_#0000000F]'>
                    {/* Acerca de Mi */}
                    <div className='bg-white relative px-[22px] py-[26px]'>
                        <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Acerca de Mi</p>

                        <p className='text-violet_dark py-2'>
                            Mi nombre es Luis, vivo en Rio de Janeiro y soy estudiante de la carrera de Marketing.
                            Uno de mis hobbies es realizar viajes por toda latinoamerica.
                        </p>
                    </div>
                </div>

                {/* Parte de la Derecha */}
                <div className='bg-white w-[52%] rounded-[10px] relative px-[22px] py-[26px] shadow-[0px_4px_24px_#0000000F]'>
                    <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Certificado</p>

                    {/* Certificado */}
                    <div className='py-2'>
                        <p className='text-[#B9B9C3]'>Sin certificados</p>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}