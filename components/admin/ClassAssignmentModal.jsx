import { useEffect, useState } from "react"

export default function ClassAssignmentModal({ open, handlerModalClass }){
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        setIsOpen(open)
        console.log(open)
    },[open])

    function handlerClose(e){
        e.stopPropagation()
        // setIsOpen(false)
        // handlerModalClass(false)
    }
    
    return(
        <>
            {
                isOpen &&
                <div
                onClick={handlerClose}
                className="fixed top-0 left-0 w-screen h-screen bg-[#3333]">

                </div>
            }
        </>
    )
}