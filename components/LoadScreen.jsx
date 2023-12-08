import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Image from 'next/image'
import Logo from '../public/imgs/logo.png'

export default function LoadScreen(){
    const {data: session, status} = useSession();
    const [changeSizeLogo, setChangeSizeLogo] = useState(false)

    useEffect(()=> status == "loading" ? setChangeSizeLogo(true) : setChangeSizeLogo(false) ,[status])
    
    return(
        <div className={`fixed bg-primary w-screen h-screen z-[999] transition-all flex justify-center items-center ${status != "loading" && "opacity-0 z-[-9]"}`}>
            <Image className={`
            w-[${changeSizeLogo ? "200px" : "10px"}] transition-all duration-1000
            `} src={Logo} width={100} height={100}/>
        </div>
    )
}