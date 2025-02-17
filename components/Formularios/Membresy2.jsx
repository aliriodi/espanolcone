import React, { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';
import Menu from "../Menu";
import Head from 'next/head';
import BarChart from '../BarChart/Bartchart2';
import NavBarAdmin from '../admin/NavBarAdmin';

//https://codesandbox.io/p/devbox/reactchartjs-react-chartjs-2-grouped-cfm95?embed=1&file=%2FApp.tsx%3A1%2C1-74%2C1
//https://react-chartjs-2.js.org/examples/grouped-bar-chart

export default function FormResult() {
    const [resp, setResp] = useState('');
    const [qtyresp, setqytResp] = useState('');
    useEffect(
        () => {
            async function Resp() {
                const forms = await fetch('/api/formulario/get2').then(response => response.json())
                              .then(data => data.forms.filter(form => form.texto == 'Two'));
                setResp(await forms)
                const qty = await fetch('/api/formulario/getResp2').then(response => response.json());
                setqytResp(await qty)
            };
            Resp()

        }, []
    )
    //console.log(resp)
    //console.log(qtyresp)
    const respuesta1 = qtyresp[0]?.p1; // Datos de la primera respuesta
    const respuesta2 = qtyresp[1]?.p2;   // Datos de la segunda respuesta

//Ordenar por puntos

    //Seccion de evaluacion de Formulario
function evaluacion(puntos) {
    switch (puntos > 5) {
      case (puntos > 5 && puntos < 11):
        return 'A1.2'; 
      case (puntos > 10 && puntos < 16):
        return 'A2.1'; 
      case (puntos > 15 && puntos < 27):
        return ('A2.2');
      case (puntos > 26 && puntos < 35):
        return ('B1.1');
      case (puntos > 34 && puntos < 51):
        return ('B1.2');
      case (puntos > 50 && puntos < 61):
        return ('B2.1');
      case (puntos > 60 && puntos < 71):
        return ('B2.2');
      case (puntos > 70 && puntos < 81):
        return ('C1.1');
      case (puntos > 80):
        return ('C2.1');
      default:
        return ('A1.1');
    }
   
  }


    return (
        <div >
            <Head>
                <title>Español con E | Bienvenidos</title>
                <meta name="landing" content="welcome" />

            </Head>

                   
            {/* <div className='px-[60px] py-[119px] md:px-[25px]'>
            <NavBarAdmin />
            </div> */}
            <div className="flex justify-center ">
            
                {/* <div className='grid  gap-4 w-[90%] grid-cols-2 md:grid-cols-1 justify-items-center items-center'>
                    <div className='w-full '>
                        <h1 className="text-center">¿Qué tipo de clases te interesan?</h1>
                        <BarChart data1={respuesta1 ? respuesta1 : 0} label1={['Individuales online',
                            'Grupales Online',
                            'Grupales presenciales en salón de clases (si estás en CBA)',
                            'Grupales presenciales en diferentes lugares (si estás en CBA)']}
                            q1={'¿Qué tipo de clases te interesan?'}
                            title={''} />
                    </div>
                    <div className='w-full '>
                        <h1 className="text-center">¿Tienes alguna preferencia de horario o ubicación para las clases?</h1>
                        <BarChart data1={respuesta2 ? respuesta2 : 0} label1={['En la mañana despues de las 9:00 AM',
                            'En la mañana despues de las 11:00 AM',
                            'En la tarde despues de las 3:00 PM',
                            'Otro horario']}
                            q1={'¿Tienes alguna preferencia de horario o ubicación para las clases?'}
                            title={''} />
                    </div>
                </div> */}
            </div>
            <div className="flex justify-center pt-4">
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border">
                        <thead>
                            <tr>
                                <th className="border px-2 py-2">ID</th>
                                <th className="border px-2 py-2">Nombre</th>
                                <th className="border px-2 py-2">Email</th>
                                <th className="border px-2 py-2">Nivel</th>
                                <th className="border px-2 py-2">Puntos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resp ? resp.map((e,index) =>
                                <tr key={index}>
                                    <td className="border px-2 py-2">{ index +1 }</td>
                                    <td className="border px-2 py-2">{e.Name ? e.Name : 'Sin nombre'}</td>
                                    <td className="border px-2 py-2">{e.Email ? e.Email : 'Sin email'}</td>
                                    <td className="border px-2 py-2">{evaluacion(e.puntos)}</td>
                                    <td className="border px-2 py-2">{e.puntos}</td>
                                </tr>) : null}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


