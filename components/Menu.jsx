import Image from 'next/image'
import Logo from '../public/imgs/logo-primary.png'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';

export default function Menu(){
  
    return(
        <>
        <div className='bg-white flex flex-col fixed px-4 py-4 h-screen'>
            {/* Logo */}
            <div>
                <Link href="/home">
                    <Image src={Logo} className='' style={{width: '108px'}} alt="logo" />
                </Link>
            </div>

            {/* Opciones */}
            <nav className='my-8' style={{fontWeight: '500'}}>

                {/* Inicio */}
                <Link href="/home" className='p-2 rounded-md border border-gray-clear flex item-center my-5' >

                    {/* Icono y texto */}
                    <div className='flex item-center mr-20 self-center' style={{alignItems:'center'}}>
                        <FontAwesomeIcon icon={faHouse} className='mr-2'/>
                        <p className=''>Inicio</p>
                    </div>

                    {/* Notificacion */}
                    <div className='flex item-center' style={{alignItems:'center'}}>
                        <p
                        className='text-white bg-primary px-2 py-0 rounded-full mr-2'>
                            2
                        </p>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </Link>
                
                {/* Clases */}
                <Link href="/home" className='p-2 rounded-md border border-gray-clear flex item-center my-5' >

                    {/* Icono y texto */}
                    <div className='flex item-center mr-20 self-center' style={{alignItems:'center'}}>
                        <FontAwesomeIcon icon={faHouse} className='mr-2'/>
                        <p>Clases</p>
                    </div>

                    {/* Notificacion */}
                    <div className='flex item-center' style={{alignItems:'center'}}>
                        <p
                        className='text-white bg-primary px-2 py-0 rounded-full mr-2'>
                            2
                        </p>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </Link>

                {/* Logros */}
                <Link href="/home" className='p-2 rounded-md border border-gray-clear flex item-center my-5' >

                    {/* Icono y texto */}
                    <div className='flex item-center mr-20 self-center' style={{alignItems:'center'}}>
                        <FontAwesomeIcon icon={faHouse} className='mr-2'/>
                        <p>Logros</p>
                    </div>

                    {/* Notificacion */}
                    <div className='flex item-center' style={{alignItems:'center'}}>
                        <p
                        className='text-white bg-primary px-2 py-0 rounded-full mr-2'>
                            2
                        </p>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </Link>
                
            </nav>
        </div>
        </>
    )
}

