import { signOut } from "next-auth/react"

export default function SignOutBtn(){
    return (
        <button
            onClick={()=>signOut('google',{ callbackUrl: '/' })}// Te devuelve al formulario de iniciar secion 
            type='submit'
            className='bg-red-500 text-white px-5 py-2 rounded mr-5'>
                Salir de cuenta
        </button>
    )
}