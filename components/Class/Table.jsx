import { useEffect, useState } from "react"

 
export default function Table({ value, color }){
    const [ columns, setColumns ] = useState(value) 
    const [ mainColor, setMainColor ] = useState(color) 

    useEffect(()=>{
        setColumns(value)
        setMainColor(color ? color : "primary")
    },[value])
    return(
        <div className=" flex w-full justify-center">
            <div className={`flex max-w-[90%] relative overflow-hidden rounded-[5px] border-2 border-${mainColor}`}>
                {
                    columns?.length > 0 &&
                    columns?.map(column=>
                        <div className={`flex-grow-[1] border-l-2 border-${mainColor} first:border-none`}>
                            <h3 className={`text-white bg-${mainColor} text-center py-3`}>{column?.title}</h3>
                            <div className="p-3 text-violet_dark text-[18px]" dangerouslySetInnerHTML={{ __html: column?.content }}></div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}