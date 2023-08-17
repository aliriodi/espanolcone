import { useDispatch , useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getuser } from "../redux/ECEActions";
import CREATEUSER from "../components/CreateUser/CreateUser"

export default function CreateUser(){
    const dispatch = useDispatch();
    useEffect(() => 
    { dispatch(getuser());  }, [dispatch]);
    
    const {  userL } = useSelector((state) => state.datos);
    return(
        <div>

         <CREATEUSER userL={userL}/>

        </div>
    )}


