import ModalPagoABLE from "../components/ModalPagoAble";
import ModalPagoZELLE from "../components/ModalPagoZelle";
import MUnit2 from "../components/Plan/MUnit2";
import Planasync from "../components/Plan/Planasync";

export default function Plan(){
    return(
        <>
            {/* <Planasync/>
            <MUnit2/> */}
            <ModalPagoZELLE open={true}/>
            {/* <ModalPagoABLE open={true}/> */}
        </>
    )
}