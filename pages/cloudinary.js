import { useDispatch , useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getuser } from "../redux/ECEActions";
import CLOUDYNARY from "../components/cloudinary/cloudinary"


export default function Cloudynary(){
    const dispatch = useDispatch();
    useEffect(() => 
    { dispatch(getuser());  }, [dispatch]);
    
    const {  userL } = useSelector((state) => state.datos);
    return(
        <div>
            {/* le paso por props el ancho de la foto cuando llamo el componente */}
        
        {/* Si lo paso asi carga la imagen sin llenar nombre referncial de la imagen */}
         {/* <CLOUDYNARY  userL={userL} width={"100px"}/> */}
        
         <CLOUDYNARY  name={true} userL={userL} width={"100px"}/>
        
        </div>
    )}


