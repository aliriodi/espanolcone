import axios from "axios"
import { useEffect, useState } from "react"
import BodyGeneric from "../../../components/GenericsElements/BodyGeneric";
import Link from 'next/link';

export default function MiniLessons() {
  const [miniLessons, setMiniLessons] = useState(null)
  
  useEffect(()=>{
    getMiniLesson()
  },[])

  async function getMiniLesson(){
    let lessons;
    
    try{
      lessons = await axios.get('/api/ulessons/get')
    }
    catch(e){
      console.log(e)
    }
    console.log(lessons?.data?.ulessons)

    setMiniLessons(lessons?.data?.ulessons)
  }

  return (
    <BodyGeneric>
      <div
      className="grid grid-cols-3 gap-7 mt-[50px]
      lg:grid-cols-2
      md:grid-cols-1">
        {
          miniLessons &&
          miniLessons?.map((lesson, index)=>
            <Link
            key={index}
            href={`/inicio/MiniLessons/${lesson?._id}`}
            className="min-w-[300px] h-[270px] bg-dark rounded-[14px] relative overflow-hidden shadow-[0px_4px_24px_#18292F1A] flex items-end
            md:w-full">
              
              {/* Nivel */}
              <p
              className="text-[21px] font-semibold w-14 h-14 text-white flex justify-center items-center bg-primary absolute top-0 left-0 z-20 rounded-[0_0_100%_0] ">
                {lesson?.level}</p>

              <div
              className="w-full bg-gradient-to-t from-[#000] to-transparent z-20 text-white p-4">

                {/* Descripcion */}
                <p className=" text-[31px] relative font-bold">{lesson?.description}</p>

                {/* Formatos */}
                <p className="relative">{lesson?.formats}</p>

              </div>

              {/* Imagen */}              
              <img 
              className="absolute w-full h-full object-cover bg-light z-10 top-0 left-0"
              src={lesson?.image}/>
            </Link>            
          )
        }
      </div>
    </BodyGeneric>
  )
}