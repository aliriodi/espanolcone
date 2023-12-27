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
            <div className={`flex max-w-[90%] relative overflow-hidden rounded-[5px] border-2 border-${mainColor}
            md:flex-col md:max-w-full`}>
                {
                    columns?.length > 0 &&
                    columns?.map((column, index)=>
                        <ul
                        key={index}
                        className={`flex-grow-[1] border-l-2 border-${mainColor} first:border-none max-w-[470px]
                        md:border-none`}>

                            <h3 className={`text-white bg-${mainColor} text-center py-3`}>{column?.title}</h3>

                            <div className="p-4 pb-5 text-violet_dark text-[18px] bg-white h-full
                            md:text-[16px]" dangerouslySetInnerHTML={{ __html: column?.content }}></div>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}