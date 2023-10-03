import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function SuccessPopUp(props){
    const[showPopUp, setshowPopUp] = useState(false)

    const {data: session,status} = useSession();
    // console.log(props.showPopUp)
    
    useEffect(()=>setshowPopUp(props.showPopUp),[props.showPopUp])

    function closePopup(){
        props.onShowSuccessPopUp(false)
        setshowPopUp(false)
    }

    return(
        <>
            {showPopUp &&
            (<div className="w-full h-full bg-[#000a] absolute top-0 left-0 flex justify-center items-center">
                <div className="p-2 bg-white min-w-[40%] rounded-[8px] flex flex-col items-center">
                    {/* Felicitaciones */}
                    <h3 className="">¡Felicitaciones  Luis !</h3>

                    {/* Texto */}
                    <p className="text-[#6E6B7B] my-3">Realizaste la actividad con éxito</p>

                    {/* Boton */}
                    <button onClick={closePopup} className="btn-primary px-[22px] py-[10px]">Aceptar</button>
                </div>
            </div>)
            }
        </>
    )
}