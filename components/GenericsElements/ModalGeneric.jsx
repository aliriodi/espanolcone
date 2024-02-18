import { useEffect, useState } from "react"

export default function ModalGeneric({ children, open, changeModal }){
    
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        changeModal(false)
    }
    
    useEffect(() => {
        setIsOpen(open)
    }, [open])

    return(
        <>
            {
                !isOpen &&
                <div
                onClick={closeModal}
                className="fixed w-screen min-h-screen top-0 left-0 bg-[#000000aa] flex flex-col justify-center items-center z-[999]">

                    <div className=" bg-white rounded-[7px]">
                        {children}
                    </div>

                </div>
            }
        </>
    )
}