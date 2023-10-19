import { signOut } from "next-auth/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

export default function SignOutBtn() {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' }); // Redirige al usuario a la página de inicio después de cerrar la sesión

    };
    return (
        <button
            onClick={() => handleSignOut()}// Te devuelve al formulario de iniciar sesion 
            type='submit'
            className='w-full flex items-center justify-start my-[20px] self-center px-[15px] py-[12px] border-danger border-solid border-[1px] rounded-[7px] text-danger transition-all
            hover:bg-danger hover:text-white'>
                <FontAwesomeIcon icon={faPowerOff} className=" mr-[10px]" />
                <p>Salir de cuenta</p>
        </button>
    )
}
