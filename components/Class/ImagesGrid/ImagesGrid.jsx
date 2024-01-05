import { useEffect, useState } from "react"
import Image from 'next/image';

export default function ImagesGrid({ images, center }){

    const [currentImages, setCurrentImages] = useState([])

    useEffect(()=> setCurrentImages(images) ,[images])
    
    return(
        <div className='w-full flex flex-wrap justify-evenly my-10'>

            { currentImages?.length > 0 && currentImages?.map((image, index)=>

                <div
                key={index}
                className={`relative mb-[70px] mx-8 flex flex-col ${center && "items-center"}
                md:w-full`}>

                    {/* Imagen */}
                    <div className='w-[370px] h-[250px] bg-violet_dark rounded-[5px] relative shadow-[0px_14px_28px_#77869966] overflow-hidden
                    md:w-full'>
                        
                        {
                            image?.src &&
                            <img className="w-full h-full object-cover" src={image?.src} width='100' height='100' alt={`Image ${index}`}/>
                        }
                        
                    </div>

                    {/* Texto */}
                    {
                        image?.text &&
                        <p
                        className="w-full font-medium text-[1.33rem] text-violet_dark mt-5"
                        dangerouslySetInnerHTML={{ __html: image?.text }}>
                        </p>
                    }

                </div>

            )}
            
        </div>
    )
}