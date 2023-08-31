import { signOut } from "next-auth/react"
import { redirect } from 'next/navigation'; 
export default function SignOutBtn(){
    const handleSignOut = async () => {
        await signOut('google', { callbackUrl: '/' }); // Redirige al usuario a la página de inicio después de cerrar la sesión
        redirect('/home')
    };
    return (
        <button
            onClick={()=>handleSignOut()}// Te devuelve al formulario de iniciar sesion 
            type='submit'
            className='bg-red-500 text-white px-5 py-2 rounded mr-5'>
                Salir de cuenta
        </button>
    )
}