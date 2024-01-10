import { useEffect, useState } from "react"
import Image from 'next/image';
import Spinner from "../Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function UnitList({ unit, indexUnit, indexLevel, handlerChangeUnit, handlerLastUnitDone }){
    const [isOpen, setIsOpen] = useState(false)
    const [firstPage, setFirstPage ] = useState(null)
    const [maxPages, setMaxPages] = useState(0)
    const [assigned, setAsigned] = useState(unit?.assigned)

    useEffect(()=>{
        if(isOpen && !firstPage){
            fetch('/api/class/'+unit?.unitID)
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((response) => {
                setMaxPages(response.class1?.sheets?.length)
                setFirstPage(response.class1?.sheets[0]);
                console.log(response.class1?.sheets[0])
                console.log(response.class1?.sheets[0].data?.find(element => element?.type == "image"))
                

            })
            .catch((error) => {
                // Handle any errors
                console.error('Fetch error:', error);
            });
        }
    },[isOpen])

    useEffect(()=>{
        let newUnit = {
            ...unit,
            assigned: assigned
        }
        handlerChangeUnit(indexLevel, indexUnit, newUnit)
    },[assigned])

    function lastUnitDone(e){
        e.stopPropagation()

        let newUnit = {
            ...unit,
            assigned: assigned
        }
        handlerLastUnitDone(indexLevel, indexUnit, newUnit,maxPages)
    }

    return(
        <li
        onClick={()=>setIsOpen(!isOpen)}
        className={`py-3 mx-[16px] px-2 relative transition-all cursor-pointer overflow-hidden
        ${isOpen ? "border-2 my-1 rounded-[7px]" : "border-b-2 last-of-type:border-none"}
        hover:bg-gray_light`}>

            {/* Encabezado */}
            <div
            className="flex items-center justify-between">

                {/* Titulo */}
                <div className="flex items-center">
                    {/* CheckBox */}
                    <input
                    value={assigned}
                    checked={assigned}
                    onChange={(e)=>setAsigned(!assigned)}
                    onClick={(e)=>e.stopPropagation()}
                    className="checkbox mr-2"
                    type="checkbox"/> 

                    {/* Nombre */}
                    {unit?.name}
                </div>

                {/* Check de unidad Echa */}
                {
                    unit?.done &&
                    <FontAwesomeIcon icon={faCircleCheck} className=" text-secondary z-20"/>
                }

                {/* Unidad actual */}
                {
                    !unit?.done && unit?.enable &&
                    <div className="w-[14px] h-[14px] rounded-full bg-success border-2 border-white z-20"></div>
                }
            </div>

            {/* Contenido */}
            {
                isOpen &&

                (
                    firstPage ?
                    <div className="mt-3 flex justify-between">

                        {/* Descripciones */}
                        <div className="w-1/2 flex flex-col justify-between">
                            <div>
                                {/* Titulo */}
                                <p className=" font-semibold text-[31px]">
                                    {firstPage?.data?.find(element => element?.type == "title")?.value}
                                </p>

                                {/* Descripcion */}
                                <p>
                                    {unit?.description}
                                </p>
                            </div>

                            {/* Boton */}
                            {
                                assigned &&
                                <button
                                onClick={lastUnitDone}
                                className={` w-fit py-2 px-6 rounded-[7px] transition-all ${!unit.done && unit.enable ? "pointer-events-none border-2 border-success text-success font-medium" : "btn-success"}`}>
                                    {!unit.done && unit.enable ? "Unidad actual" : "Marcar como unidad actual"}
                                </button>
                            }
                        </div>

                        {/* Imagen */}
                        <div className="w-1/2">
                            <img
                            className="w-[200px] h-[200px] rounded-full object-cover relative z-20 ml-[10%] "
                            src={firstPage?.data?.find(element => element?.type == "image")?.value}/>

                            {/* Ellipse */}
                            <span className="flex w-1/2 h-full absolute bg-gradient-to-r from-warning to-success top-0 right-0 z-10 rounded-[0_0_0_100%]"></span>
                        </div>
                    </div>
                    :
                    <div className="w-full py-3 flex justify-center">
                        <Spinner/>
                    </div>
                )
            }
        </li>
    )
}