import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
//https://codesandbox.io/p/devbox/reactchartjs-react-chartjs-2-grouped-cfm95?embed=1&file=%2FApp.tsx%3A1%2C1-74%2C1
//https://react-chartjs-2.js.org/examples/grouped-bar-chart



export default function BarChart({data1,data2}) {
    const labels = ['Pregunta 1', 'Pregunta 2'];
    const Respuestas = [{rp10:'Individuales online',
                         rp11:'Grupales Online',
                         rp12:'Grupales presenciales en salón de clases (si estás en CBA)',
                         rp13:'Grupales presenciales en diferentes lugares (si estás en CBA)'},
                         {rp20:'En la mañana despues de las 9:00 AM',
                         rp21:'En la mañana despues de las 11:00 AM',
                         rp22:'En la tarde despues de las 3:00 PM',
                         rp23:'Otro horario'}]
    
    const options = {
        plugins: {
          title: {
            display: true,
            text: 'Pregunta asdsah',
          },
        },
        responsive: true,
        interaction: {
          mode: 'index' ,
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            min: 0, // Establecer el valor mínimo en el eje y
            max: 4+Math.max(...[20,11]), // Establecer el valor máximo en el eje y
          },
        },
      };
      

    const data = {
        labels,
        datasets: [
          {
            label: labels[0]?Respuestas[0].rp10:Respuestas[1].rp20,
            data: [data1[0],data2[0]],
            backgroundColor: '#4CCFEB',
            stack: 'Stack 0',
          },
          {
            label: 'Dataset 2',
            data: [data1[1],data2[1]],
            backgroundColor: '#33bb99',
            stack: 'Stack 1',
          },
          {
            label: 'Dataset 3',
            data: [data1[2],data2[2]],
            backgroundColor: '#FF7438',
            stack: 'Stack 2',
          },
          {
              label: 'Dataset 4',
              data: [data1[3],data2[3]],
              backgroundColor: '#8438FF',
              stack: 'Stack 3',
            },
        ],
      };
      
  return <Bar options={options} data={data} />;
}
