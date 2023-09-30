import { signOut } from "next-auth/react"

export default function SignOutBtn() {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' }); // Redirige al usuario a la página de inicio después de cerrar la sesión

    };
    return (
        <button
            onClick={() => handleSignOut()}// Te devuelve al formulario de iniciar sesion 
            type='submit'
            className='bg-primary text-white px-5 py-2 rounded mr-5'>
            Salir de cuenta
        </button>
    )
}
