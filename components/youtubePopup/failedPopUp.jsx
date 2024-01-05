import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function FailedPopUp(props){
    const[showPopUp, setShowPopUp] = useState(false)

    useEffect(()=>{
        setShowPopUp(props.showPopUp)
        if(props?.inEvaluation)closePopup()
    },[props.showPopUp])

    function closePopup(){
        props.onShowFailedPopUp(false)
        setShowPopUp(false)
    }

    function showPopUpAgain(){
        props.onShowPopUp(true)
        setShowPopUp(true)
    }


    return(
        <>
        {showPopUp && (
        <div className="w-full h-full bg-[#000a] absolute top-0 left-0 flex justify-center items-center">
            <div className="p-2 bg-white min-w-[40%] rounded-[8px] flex flex-col items-center">

                {/* No pudiste lograrlo */}
                <h3>Esta vez no pudiste lograrlo</h3>

                {/* Texto */}
                <p className="text-[#6E6B7B]  my-3">¿Deseas  volver a intentarlo?</p>

                {/* Botones */}
                <div className="flex justify-between w-full mt-5">
                    <button onClick={closePopup} className="btn-primary-border px-[22px] py-[10px] w-full mr-1">No</button>
                    <button onClick={showPopUpAgain} className="btn-primary px-[22px] py-[10px] w-full ml-1">Si</button>
                </div>
            </div>
        </div>
        )}
        </>
    )
}