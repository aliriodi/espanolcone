// import React, { useState } from 'react'
// import styles from '../../styles/boxmove.module.css'
// import { Rnd } from "react-rnd";
// //https://geekflare.com/es/best-drag-and-drop-react-libraries/
// export default function Boxmove(props) {
//     //levo el array de objetos con [{value,id}] a un array de valores b = [option1,option2,...]
//     // const b  = props.options.map(option=>option.value) 
//     const [state, setState] = useState({ x: props.option.x, y: props.option.y })
//     const [boxShadowcolor,setBoxShadowcolor]=useState('0px 0px 10px yellow')
    

//     return ( 
//         <div >
//             {<div key={props.option.id} className={styles[props.option.id]}>
//                 <Rnd
//                     size={{ width: props.option.width, height: props.option.height }}
//                     //bounds={{ top: yMin, right: xMax, bottom: yMax, left: xMin }}
//                     //bounds={{ top: 653, right: 1024 , bottom: 726, left: 723 }}
//                     position={{ x: state.x, y: state.y }}
//                     onDragStop={(e, d) => {if(180<d.x&&d.x<600&&-158<d.y&&d.y<-12){setState({x:d.x,y:d.y})}else{setState({ x: props.option.x, y: props.option.y })}
//                                        // console.log('x:',d.x,'y:',d.y,'option:',props.option.value)
//                                          if(props.option.xmin<d.x&&d.x<props.option.xmax&&props.option.ymin<d.y&&d.y<props.option.ymax){setBoxShadowcolor('0px 0px 10px green')}
//                                           else(setBoxShadowcolor('0px 0px 10px red'))  
                                         
//                                          //setState({ x: d.x, y: d.y });
//                                          //console.log(d) 
//                                  }}
//                                      //if(319<d.x<497){setState({x:d.x,y:state.y}else{setState({ x: props.option.x, y: props.option.y })})}
//                                       //if(723<d.x<1024 && 653<d.y<726){setState({ x: d.x, y: d.y }) }else(setState({ x: props.option.x, y: props.option.y }))
//                     onDrag={(e, d) => { 
//                                   // Este evento se dispara continuamente mientras se arrastra
//                        // console.log('Nueva posición durante el arrastre:', { x: d.x, y: d.y , valor:props.option.value});
                        
//                         //   setState({ x: d.x, y: d.y });
//                       }}
                    
                      
//                     style={{
//                         zIndex: 1000,
//                         backgroundColor: '#4CCFEB',
//                         display:'flex',
//                         alignItems: 'center', // Centra verticalmente
//                         justifyContent: 'center', // Centra horizontalmente
//                         borderRadius: '8px', // Agrega el radio de borde que desees
//                         boxShadow:boxShadowcolor,
//                     }}
//                 >{props.option.value}</Rnd></div>
//             }
    
//         </div>
//     )


// }
import React, { useState } from 'react';
import styles from '../../styles/boxmove.module.css';
import { Rnd } from "react-rnd";

export default function Boxmove(props) {
  const [state, setState] = useState({ x: props.option.x, y: props.option.y });
  const [boxShadowcolor, setBoxShadowcolor] = useState('0px 0px 20px yellow');

  // Las coordenadas del lugar correcto donde quieres incrustar la caja
  const correctPosition = { x: (props.option.xmin+props.option.xmax)/2, y: (props.option.ymin+props.option.ymax)/2 };

  const handleDrag = (e, d) => {
    // Calcula la distancia entre la caja y el lugar correcto
    const distance = Math.sqrt((d.x - correctPosition.x) ** 2 + (d.y - correctPosition.y) ** 2);

    // Establece un umbral de distancia para determinar cuándo se debe incrustar la caja
    const threshold = 40;
    if(180<d.x&&d.x<600&&-158<d.y&&d.y<-12){setState({x:d.x,y:d.y})}else{setState({ x: props.option.x, y: props.option.y })}
    if (distance < threshold) {
      // Si la caja está lo suficientemente cerca, ajusta la posición al lugar correcto
      setState(correctPosition);

      setBoxShadowcolor('0px 0px 20px green');
    } else {
      // Si la caja se aleja del lugar correcto, mantén la posición actual
      //setState({ x: d.x, y: d.y });
      setBoxShadowcolor('0px 0px 20px red');
    }
  };

  return (
    <div>
      <div key={props.option.id} className={styles[props.option.id]}>
        <Rnd
          size={{ width: props.option.width, height: props.option.height }}
          position={state}
          onDragStop={handleDrag}
          style={{
            zIndex: 1000,
            backgroundColor: '#4CCFEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            boxShadow: boxShadowcolor,
          }}
        >
          {props.option.value}
        </Rnd>
      </div>
    </div>
  );
}

