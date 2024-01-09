import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import UnitList from "./UnitList";

export default function ClassAssignmentList({level}){
    const [isOpen, setIsOpen] = useState(false)
    const [asigned, setAsigned] = useState(false)

    return(
        <div
        className={`px-[16px] py-[12px] rounded-[7px] bg-white flex flex-col transition-all ${isOpen && "shadow-[0px_4px_24px_#0000001F] my-2"}`}>

            {/* Encabezado */}
            <div
            onClick={()=>setIsOpen(!isOpen)}
            className="flex w-full justify-between cursor-pointer">

                {/* Titulo / Check box */}
                <div className="flex items-center">
                    <input
                    value={asigned}
                    checked={asigned}
                    onChange={(e)=>{
                        setAsigned(!asigned)
                    }}
                    onClick={(e)=>e.stopPropagation()}
                    className="checkbox mr-2"
                    type="checkbox"/> 
                    <h3>{level?.level}</h3>
                </div>

                {/* Flecha */}
                <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown}/>
            </div>

            {/* Unidades */}
            {
                isOpen &&
                <ul className={`${asigned == false  && "opacity-50 pointer-events-none"}`}>
                    {
                        level?.units && level?.units?.length > 0  &&
                        level?.units?.map((unit, index)=>
                        <UnitList key={index} unit={unit}/>
                        )
                    }
                </ul>
            }

        </div>
    )
}