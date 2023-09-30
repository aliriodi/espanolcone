import React, { useState } from 'react'
import styles from '../../styles/boxmove.module.css'
import { Rnd } from "react-rnd";
//https://geekflare.com/es/best-drag-and-drop-react-libraries/
export default function boxmove(props) {
    //levo el array de objetos con [{value,id}] a un array de valores b = [option1,option2,...]
    // const b  = props.options.map(option=>option.value) 
    const [state, setState] = useState({ x: props.option.x, y: props.option.y })


    return (
        <div >
            {<div key={props.option.id} className={styles[props.option.id]}>
                <Rnd
                    size={{ width: props.option.width, height: props.option.height }}
                    position={{ x: state.x, y: state.y }}
                    onDragStop={(e, d) => { setState({ x: d.x, y: d.y }) }}
                    style={{
                        backgroundColor: '#4CCFEB',
                        display:'flex',
                        alignItems: 'center', // Centra verticalmente
                        justifyContent: 'center', // Centra horizontalmente
                    }}
                >{props.option.value}</Rnd></div>
            }

        </div>
    )

}