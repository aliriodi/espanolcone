import React, { useState } from 'react'
import styles from '../../styles/boxmove.module.css'
import { Rnd } from "react-rnd";
//https://geekflare.com/es/best-drag-and-drop-react-libraries/
export default function Boxmove(props) {
    //levo el array de objetos con [{value,id}] a un array de valores b = [option1,option2,...]
    // const b  = props.options.map(option=>option.value) 
    const [state, setState] = useState({ x: props.option.x, y: props.option.y })
    const [boxShadowcolor,setBoxShadowcolor]=useState('0px 0px 10px yellow')

    return (
        <div >
            {<div key={props.option.id} className={styles[props.option.id]}>
                <Rnd
                    size={{ width: props.option.width, height: props.option.height }}
                    //bounds={{ top: yMin, right: xMax, bottom: yMax, left: xMin }}
                    //bounds={{ top: 653, right: 1024 , bottom: 726, left: 723 }}
                    position={{ x: state.x, y: state.y }}
                    onDragStop={(e, d) => {if(180<d.x&&d.x<600&&-158<d.y&&d.y<-12){setState({x:d.x,y:d.y})}else{setState({ x: props.option.x, y: props.option.y })}
                                        console.log('x:',d.x,'y:',d.y,'option:',props.option.value)
                                         if(props.option.xmin<d.x&&d.x<props.option.xmax&&props.option.ymin<d.y&&d.y<props.option.ymax){setBoxShadowcolor('0px 0px 10px green')}
                                         else(setBoxShadowcolor('0px 0px 10px red'))  
                                         //setState({ x: d.x, y: d.y });
                                         //console.log(d) 
                                 }}
                                     //if(319<d.x<497){setState({x:d.x,y:state.y}else{setState({ x: props.option.x, y: props.option.y })})}
                                      //if(723<d.x<1024 && 653<d.y<726){setState({ x: d.x, y: d.y }) }else(setState({ x: props.option.x, y: props.option.y }))
                    onDrag={(e, d) => { 
                                  // Este evento se dispara continuamente mientras se arrastra
                       // console.log('Nueva posición durante el arrastre:', { x: d.x, y: d.y , valor:props.option.value});
                        
                        //   setState({ x: d.x, y: d.y });
                      }}
                    
                      
                    style={{
                        zIndex: 1000,
                        backgroundColor: '#4CCFEB',
                        display:'flex',
                        alignItems: 'center', // Centra verticalmente
                        justifyContent: 'center', // Centra horizontalmente
                        borderRadius: '8px', // Agrega el radio de borde que desees
                        boxShadow:boxShadowcolor,
                    }}
                >{props.option.value}</Rnd></div>
            }

        </div>
    )


}
