import React from 'react';
import style from '../../styles/plan.module.css'
const plan = require('./planes.json');

export default function Planasync({}) {
  const plan1 = [];
  const numberPlans = Object.keys(plan).length;
  Object.keys(plan).map((planX) =>
    plan[planX].type.includes('Asinc') ? plan1.push(plan[planX]) : null
  );

  return (
    <div className={style['location']}>
      <table className={style['table1']}>
        <thead>
          <tr>
            <th className={style['th']}>BENEFICIOS</th>
            <th className={style['th']}>MENSUAL<p>{plan1[0].ammountUnit}$usd</p></th>
            <th className={style['th']}>ANUAL<p>{plan1[1].ammountUnit}$usd</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={style['td']}></td>
            <td className={style['td']}></td>
            <td className={style['tdo']}><strong>MEJOR PRECIO</strong></td>
          </tr>
          {plan1[0]?.items?.map((item, index) => (
            <tr key={index}>
              <td
               className={style['tdleft']}
                dangerouslySetInnerHTML={{ __html: item.value }}
              ></td>
              <td className={style['td']}>
                {item.include ? 'X' : ''}
              </td>
              {/* aca mapeo el index del otro plan para renderizar las X */}
              <td className={style['td']}>
                {plan1[1].items[index].include ? 'X' : ''}
              </td>
            </tr>
          ))}
          {/* Resto de las filas */}
           <tr>
            <td ></td>
            {/* aca deberian ir las plataformas de pago */}
            <td className={style['tdnoborder']} >
              <button className={style['button']}> Pagar</button>
            </td>
            <td className={style['tdnoborder']} >
              <button className={style['button']}> Pagar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
