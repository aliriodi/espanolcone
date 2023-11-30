import React, { useState } from 'react';
import style from '../../styles/plan.module.css'
import { useSession } from "next-auth/react";
const plan = require('./planes.json');

export default function Plansync({ Confirm}) {
  const [valorInput, setValorInput] = useState(4);
  const { data: session, status, update } = useSession();
  const plan1 = [];
  const numberPlans = Object.keys(plan).length;
  Object.keys(plan).map((planX) =>
    plan[planX].type.includes('Sinc') ? plan1.push(plan[planX]) : null
  );
  function validarEntrada(event) {
    // console.log(typeof(event.target.value))
    // console.log(typeof(parseInt(event.target.value, 10)))    
    // console.log(parseInt(event.target.value, 10))
    // console.log(isNaN(parseInt(event.target.value, 10)))
    if(isNaN(parseInt(event.target.value, 10))){setValorInput(parseInt(4,10))}
    else(setValorInput(parseInt(event.target.value,10)))
   }

  return (
    <div className={style['location']}>
      <table className={style['table2']}>
        <tbody>
          <tr>
            <td  >
                   1 Clase {plan1[0].ammountUnit}$usd
                     
            </td>
            <td >
                <button onClick={()=>Confirm({qty:1,cost:plan1[0].ammountUnit})} className={style['button']}>Pagar</button>
            </td>
          </tr>
          <tr>
            <td >
                    
                    <label htmlFor="numeroInput">A partir de 4 clases {plan1[1].ammountUnit}$usd </label>
<input 
  type="number" 
  id="numeroInput" 
  name="numeroInput" 
  min={4}
  onChange={validarEntrada}
  value={valorInput}
  
></input>
             </td>
            <td >
            <span style={{paddingTop:'30px',    alignItems: 'center', justifyContent: 'center',}}>  monto <strong>{plan1[1].ammountUnit*valorInput}$usd</strong></span>
                     <button onClick={()=>Confirm({qty:valorInput,cost:plan1[1].ammountUnit*valorInput})} className={style['button']}>Pagar</button>

            </td>
          </tr>
        </tbody>
      </table>
   
    </div>
  );
}
