import React, { useState } from 'react'
import styles from '../../styles/boxmove.module.css'
import { Rnd } from "react-rnd";
//https://geekflare.com/es/best-drag-and-drop-react-libraries/
export default function Boxmove(props) {
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
                    onDrag={(e, d) => { 
                        // Este evento se dispara continuamente mientras se arrastra
                        console.log('Nueva posición durante el arrastre:', { x: d.x, y: d.y , valor:props.option.value});
                     //   setState({ x: d.x, y: d.y });
                      }}
                    style={{
                        zIndex: 1000,
                        backgroundColor: '#4CCFEB',
                        display:'flex',
                        alignItems: 'center', // Centra verticalmente
                        justifyContent: 'center', // Centra horizontalmente
                        borderRadius: '8px', // Agrega el radio de borde que desees
                    }}
                >{props.option.value}</Rnd></div>
            }

        </div>
    )

}