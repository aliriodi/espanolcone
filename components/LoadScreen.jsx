import { useSession } from "next-auth/react"
import Image from 'next/image'
import Logo from '../public/imgs/logo.png'

export default function LoadScreen(){
    const {data: session, status} = useSession();
    
    return(
        status &&
        <div className={`fixed bg-primary w-screen h-screen transition-all flex justify-center items-center ${status != "loading" ? "opacity-0 z-[-9]" : "z-[999]"}`}>
            <Image className={`
            w-[10px] transition-all duration-1000 animate-wider
            `} src={Logo} alt={'EspanolconE'} width={100} height={100}/>
        </div>
    )
}