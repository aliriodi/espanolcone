import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";

export default function Alert({children, color = "primary", open, closeAlert}) {
    
    return(
        <div className={`
        ${!open ? "absolute right-[650px] opacity-0 z-[-1]" : "relative right-0"}
        w-[650px] text-${color} rounded-[4px] flex items-center overflow-hidden my-2 transition-all
        md:w-[95%] md:mx-auto`}>

            {/* Contenido */}
            <div className=' flex-grow-[1] p-3 z-[20] font-medium
            md:text-[14px]'>
                {children}
            </div>

            {/* Boton para cerrar */}
            <div
            onClick={closeAlert}
            className="p-3 cursor-pointer z-[20]">
                <FontAwesomeIcon className=" w-3 h-3" icon={faX}/>
            </div>

            {/* Fondo */}
            <div className={`w-full h-full absolute bg-${color} opacity-[12%] z-[15]`}></div>
            <div className="w-full h-full absolute bg-white z-10"></div>

        </div>
    )
}