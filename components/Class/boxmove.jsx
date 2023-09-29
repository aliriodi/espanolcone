import React , {useState}from 'react'
import styles from '../../styles/boxmove.module.css'
import { Rnd } from "react-rnd";
//https://geekflare.com/es/best-drag-and-drop-react-libraries/
export default function boxmove(props) {
   //levo el array de objetos con [{value,id}] a un array de valores b = [option1,option2,...]
    const b  = props.options.map(option=>option.value) 
   
    
    
  return (
    <div >
         {b.map(out=>
         <div key={out} className={styles["item"]}>
         <Rnd >{out}</Rnd></div>
         )}
  
    </div>
  )

}