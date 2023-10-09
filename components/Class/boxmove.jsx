import React, { useState } from 'react';
import styles from '../../styles/boxmove.module.css';
import { Rnd } from "react-rnd";

export default function Boxmove(props) {
  const [state, setState] = useState({ x: props.option.x, y: props.option.y });
  const [boxShadowcolor, setBoxShadowcolor] = useState('0px 0px 20px yellow');
  const [cXmax, setCXmaxe] = useState(0); 
  // Las coordenadas del lugar correcto donde quieres incrustar la caja
  const correctPosition = { x: (0)/2, y: (0)/2 };
 //Seleccionando el donumento <div id="value"> que tiene id=valor de la solucion real
  const sol = document.querySelector("#"+props.option.value)
//Seleccionando el documento <span id='valor1'> que tiene id numero de valor
  const sol1 = document.querySelector("#"+props.option.id)
 //si los componentes con los div id o span id existen hacer 


 if (sol && sol1) {
  
    // Obtenemos las coordenadas y dimensiones del elemento "sol"
    sol1.addEventListener("mouseup", function (event) { 
    
      // Obtenemos las coordenadas del elemento "sol1" relativas a su elemento padre (en este caso, "sol")
      const sol1Rect = sol1.getBoundingClientRect();
  const solRect = sol.getBoundingClientRect();
  

    if(cXmax<sol1Rect.left){setCXmaxe(sol1Rect.right)}
  //  console.log(typeof(sol1Rect.left),solRect.left)
    const correctPosition = { x: (0.5*sol1Rect.left+0.5*sol1Rect.right), y: (0.5*sol1Rect.top+0.5*sol1Rect.bottom) };
      // Comparamos las coordenadas para verificar si "sol1" está contenido dentro de "sol"
    if (event.button === 0 &&
      sol1Rect.top +10>= solRect.top &&
      sol1Rect.bottom-10 <= solRect.bottom &&
      sol1Rect.left >= solRect.left &&
      sol1Rect.right <= solRect.right
    ) {
    
  //  console.log('correct position',correctPosition)
  //  console.log((solRect.top+solRect.bottom)/2)
  //  console.log((sol1Rect.top+sol1Rect.bottom)/2)
    
     
      setBoxShadowcolor('0px 0px 20px green');
    } else {
      //console.log("sol1 no está dentro de sol.");
      //console.log(solRect.top)
      //console.log(sol1Rect.top) 
      setBoxShadowcolor('0px 0px 20px red');
      if (event.button === 0 && (
        Math.abs(sol1Rect.top -solRect.top) >= 200 ||
        sol1Rect.bottom-solRect.bottom <=-100  ||
        sol1Rect.left -solRect.left >= 310 ||
        sol1Rect.right-solRect.right <= -100)
      ) {
       // console.log('arriba',sol1Rect.top -solRect.top)
       // console.log('abajo',sol1Rect.bottom-solRect.bottom)
       // console.log('izquierda',sol1Rect.left -solRect.left)
      //  console.log('derecha',sol1Rect.right-solRect.right)
     setState({x: props.option.x, y: props.option.y})
      }
    };
   
  });
}

  
    // if(sol&&sol1){ 
   
  // sol.addEventListener("mouseup", function() {
  //  //console.log(sol1.id.substring(0, sol1.id.length - 1))
  //  // Esta función se ejecutará cuando se haga clic en el elemento con id="sol"
  //   if(sol.id===sol1.id.substring(0, sol1.id.length - 1)){
  //     //console.log(sol1)
  //     console.log(sol.id)
  //     console.log(sol1.id)
  //   console.log("Se hizo clic en el elemento "+props.option.value);}
  // });
// }

  const handleDrag = (e, d) => {
    // Calcula la distancia entre la caja y el lugar correcto
    const distance = Math.sqrt((d.x - correctPosition.x) ** 2 + (d.y - correctPosition.y) ** 2);

    // Establece un umbral de distancia para determinar cuándo se debe incrustar la caja
    const threshold = 40;
   // console.log('distance',distance)
    // if(180<d.x&&d.x<600&&-158<d.y&&d.y<-12){setState({x:d.x,y:d.y})}else{setState({ x: props.option.x, y: props.option.y })}
    setState({x:d.x,y:d.y})
    if (distance < threshold) {
      // Si la caja está lo suficientemente cerca, ajusta la posición al lugar correcto
      setState(correctPosition);
    
      setBoxShadowcolor('0px 0px 20px green');
    } else {
      // Si la caja se aleja del lugar correcto, mantén la posición actual
      setState({ x: d.x, y: d.y });
      setBoxShadowcolor('0px 0px 20px red');
    
    }
  };
 

  return (
    <div>
      <div key={props.option.id} className={styles[props.option.id]}>
        <Rnd
          id={props.option.id}
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

