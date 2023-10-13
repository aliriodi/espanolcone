import React from 'react';
import { useSession } from "next-auth/react";
import Menu from "../Menu"

export default function CargarclaseFE() {
  const {data: session,status} = useSession();
  

  return (
    <>
      <Menu />
     
       {session && session.user ?
       <div className='origin-top'>
              <div className="translate-x-1/2 w-1/2 h-2  block bg-[--primary] border-[--orange] border-4 p-10">
                <h1 className="translate-x-px -translate-y-full text-black text-[28px]">¡Hola {session.user.first_name}!</h1>
                <h2 className="translate-x-px -translate-y-full  text-black text-[28px]">Tu rol es: {(session.user.role[0])}</h2>
                {session.user.role.includes('admin')?
                   <div>
               
                   
                   </div>
                
                
                :<h1>Su rol no cumple con el perfil para entrar en esta seccion, sus datos han sido enviados al adminitrador de la pagina</h1>}

              </div>
              </div>
             
             
             :
             
             
             <h1 className="">¡Hola!</h1>
            }

    </>
  )
}
