import Image from 'next/image';
import Menu from '../../../components/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUser, faStar } from '@fortawesome/free-solid-svg-icons';
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
            <div className='w-full h-[410px] rounded-[10px] overflow-hidden flex flex-col shadow-[0_1px_2px_#00000033] relative
            md:h-[310.92px]'
            style={{ background: session && 
                    session?.user?.role?.includes("admin") ? 'linear-gradient(38.12deg, #3b3c3d, #fcc235 )' :
                    session?.user?.role?.includes("teacher") ? 'linear-gradient(38.12deg, #8438ff, #3cbbd6 )' :  'linear-gradient(38.12deg, #33bb99, #4CCFEB )'
                }}>
                
                {/* Iconos de fondo */}
                {/* <div className='absolute flex justify-center items-center w-full h-full z-10 text-[#0003] text-[10em] 
                md:right-[-50%]'>
                    <FontAwesomeIcon icon={faUser}/>
                </div> */}

                {/* Fondo de Perfil */}
                <div className='h-[350px] flex-grow-1 flex items-end px-[22px] z-40'>

                    {/* Imagen */}
                    
                    {session?.user?.image?.url ?
                        <Image
                        className='bg-gray_clear w-[125px] h-[125px] bottom-[-11px] relative rounded-[10px] object-cover
                        md:w-[100px] md:h-[100px]'
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
                        <p className='text-[24px] text-white font-medium
                        md:text-[18px]'>{session?.user?.first_name}</p>

                        {/* Apellido */}
                        <p className='text-[24px] text-white font-medium
                        md:text-[18px]'>{session?.user?.last_name}</p>

                        {/* Email */}
                        <p className='text-white
                        md:text-[12px]'>{session?.user?.email}</p>
                    </div>
                </div>

                {/* Edicion de perfil */}
                <div className='bg-white p-[12px] flex justify-end  z-30'>
                    <Link href={"./profile/edit"} className='btn-primary px-[55px] py-[9px]
                    md:text-[14px] md:px-[40px]'>
                        Editar
                        <FontAwesomeIcon className='ml-[6px]' icon={faPenToSquare}/>
                    </Link>
                </div>

            </div>

            {/* Parte Inferior */}
            <div className='flex mt-[24px] w-full justify-between
            md:flex-col'>

                {/* Parte de la Izquierda */}
                <div className='bg-white w-[45%] rounded-[10px] overflow-hidden shadow-[0px_4px_24px_#0000000F]
                md:w-full'>
                    {/* Acerca de Mi */}
                    <div className='bg-white relative px-[22px] py-[26px]'>
                        <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Acerca de Mi</p>

                        {
                            session?.user?.content
                            ?
                            <p className='text-violet_dark py-2 
                            md:text-[14px]'>
                                {session?.user?.content}
                            </p>
                            :
                            <p className='text-[#B9B9C3] 
                            md:text-[14px]'>
                                Sin descripsion
                            </p>

                        }
                    </div>
                </div>

                {/* Parte de la Derecha */}
                {
                    session?.user?.role?.includes("teacher") && 
                    <div className='bg-white w-[52%] rounded-[10px] relative px-[22px] py-[26px] shadow-[0px_4px_24px_#0000000F]
                    md:w-full md:mt-2'>
                        <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Metodología</p>

                        {/* Metodologias */}
                        {session?.user?.enfoquePedagogico ? (
                        <p className='text-violet_dark py-2'>{session?.user?.enfoquePedagogico}</p>
                        ) : (
                        <p className='text-violet_dark py-2'>No hay metodología cargada</p>
                        )}

                        {/* Puntos */}
                        <ul>
                        {session?.user?.puntos && session?.user?.puntos.length > 0 && (
                            session?.user?.puntos.map((punto, index) => (
                            <li
                            className='text-violet_dark ml-2 mb-1'
                            key={index}>
                                <FontAwesomeIcon icon={faStar} className='mr-1'/>
                                {punto}
                            </li>
                            ))
                        ) }
                        </ul>
                        {
                            session?.user?.despedida &&
                            <p className='text-violet_dark py-2'>
                                {session?.user?.despedida}
                            </p>
                        }
                    </div>
                }
                {
                    session?.user?.role?.includes("user") &&
                    <div className='bg-white w-[52%] rounded-[10px] relative px-[22px] py-[26px] shadow-[0px_4px_24px_#0000000F]
                    md:w-full md:mt-2'>
                        <p className='text-[18px] text-title_color font-medium border-b-2 py-2'>Certificado</p>

                        {/* Certificado */}
                        <div className='py-2'>
                            <p className='text-[#B9B9C3]'>Sin certificados</p>
                        </div>
                    </div>
                }
            </div>
        </section>
        </>
    )
}