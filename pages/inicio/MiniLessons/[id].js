import { useEffect, useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import Spinner from "../../../components/Spinner"
import Menu from '../../../components/Menu'
import ActivityElement from "../../../components/GenericsElements/Activity/ActivityElement"
import ActivityTemplate from "../../../components/GenericsElements/Activity/ActivityTemplate"

export default function MiniLesson() {
    const [loading, setLoading] = useState(false)
    const [lesson, setLesson] = useState(null)
    const router = useRouter();
    const { id } = router.query;

    useEffect(()=>{
        if(!lesson) getMiniLesson()
    },[id])
    
    async function getMiniLesson(){
        // Este metodo se encarga de obtener las Mini Lecciones
        setLoading(true)
        
        if(!id) return;
        try{
            let newLessons = await axios.get(`/api/ulessons/${id}`) 
            setLesson(newLessons?.data?.ulesson)
            setLoading(false)
        }
        catch(e){
            console.log(e)
            setLoading(false)
        }
    }

    return (
        <>
            <Menu/>

            {
                lesson && !loading ?
                <>
                    <div className="z-20
                    md:px-[25px]">
                        <ActivityTemplate sheetsOfSection={lesson?.sheets[1]}/>
                    </div>

                    {/* Imagen de fondo */}
                    <img 
                    className="fixed w-screen h-screen object-cover grayscale-[100] opacity-50 z-10"
                    src="https://res.cloudinary.com/dfddh08q8/image/upload/v1702577131/images/q62um76zmll8buy7r8ik.png"/>
                </>
                
                :

                <div>
                    No se encontro ninguna Mini 
                </div>
            }

            {/* Loader */}
            {
                loading &&
                <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-30">
                    <div
                    className="inline-block  h-16 w-16 animate-spin rounded-full border-white border-[10px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    />
                </div>
            }

            
            {/* Background */}
            <div className="fixed w-screen h-screen bg-gradient-to-br from-primary to-success z-0"/>
        </>
    )
}

