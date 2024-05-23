/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

import Head from 'next/head';
import Menu from "../../../components/Menu";
import NavBarAdmin from '../../../components/admin/NavBarAdmin';

export default function HoraProfesores() {
    const [profesores, setProfesores] = useState([]);
    const [filteredProfesores, setFilteredProfesores] = useState([]);
    const [totalHorasOcupadas, setTotalHorasOcupadas] = useState(0);
    const [totalHorasLibres, setTotalHorasLibres] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    

    useEffect(() => {
        async function fetchData() {
            try {
                await fetch('/api/teachers/getasignacion/', { method: 'GET' })
                    .then(res => res.json())
                    .then(res2 => {
                        setProfesores(res2.profesor);
                        setFilteredProfesores(res2.profesor);
                        setTotalHorasOcupadas(res2.totalHorasOcupadas);
                        setTotalHorasLibres(res2.totalHorasLibres);
                    });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            {console.log(profesores)}
        }
        fetchData();
    }, []);

    const handleFilter = () => {
        if (startDate && endDate) {
            const filtered = profesores.filter(profesor => {
                //'estamos aca'
                let filterCalendar = [];
                
                profesor.calendar.forEach( day =>
                {
                   // if(day.startDatetime){
                const date =  new Date(day.startDatetime);
                //console.log('Fecha del profesor:', day.userstartDatetime);
             //   console.log(profesor)
              //  console.log('starDate',startDate)
              //  console.log('endDate',endDate)
              //  console.log('startDate-endDate',startDate-endDate)
                 if(date-startDate && endDate-date){
                    //console.log('fecha valida')
                 filterCalendar.push(day)
                }
                 else{
                    //console.log('fecha invalida')    
                    }
                //console.log('startDate-date',startDate-date)
                //console.log('endDate-date',endDate-date)
            //    return date >= startDate && date <= endDate;
            }
                //}
                ) 
                console.log(profesor.email)
                console.log('filteredCalendar',filterCalendar)
            } );
            const filteredate = filtered.filter(profesor => profesor.horasOcupadas > 0 || profesor.horasLibres > 0);
            const totalHorasOcupadasFiltered = filteredate.reduce((acc, profesor) => acc + profesor.horasOcupadas, 0);
            const totalHorasLibresFiltered = filteredate.reduce((acc, profesor) => acc + profesor.horasLibres, 0);

        setFilteredProfesores(filtered);
        setTotalHorasOcupadas(totalHorasOcupadasFiltered);
        setTotalHorasLibres(totalHorasLibresFiltered);
            
            // const totalHorasOcupadas = filtered.reduce((acc, profesor) => acc + profesor.horasOcupadas, 0);
            // const totalHorasLibres = filtered.reduce((acc, profesor) => acc + profesor.horasLibres, 0);

            // setFilteredProfesores(filtered);
            // setTotalHorasOcupadas(totalHorasOcupadas);
            // setTotalHorasLibres(totalHorasLibres);
        }
    };
    const horaProfesor = () => {
        // Calcular la cantidad de horas ocupadas y libres
    let totalHorasOcupadas = 0;
    let totalHorasLibres = 0;

    // Recorrer cada profesor y su calendario
    profesores.forEach(prof => {
      let horasOcupadas = 0;
      let horasLibres = 0;
      prof.calendar.forEach(entry => {
        // Si hay un evento en el calendario, consideramos la hora como ocupada
        if (entry.assigned) {
          totalHorasOcupadas++;
          horasOcupadas++;
          prof.horasOcupadas = horasOcupadas
        } else {
          totalHorasLibres++;
          horasLibres++;
          prof.horasLibres = horasLibres
        }
      });
    
    });
    }
     
    const clearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setFilteredProfesores(profesores);
         const totalHorasOcupadasOriginal = profesores.reduce((acc, profesor) => acc + profesor.horasOcupadas, 0);
    const totalHorasLibresOriginal = profesores.reduce((acc, profesor) => acc + profesor.horasLibres, 0);

    setTotalHorasOcupadas(totalHorasOcupadasOriginal);
    setTotalHorasLibres(totalHorasLibresOriginal);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            <div>
                <Head>
                    <title>Español con E | Bienvenidos</title>
                    <meta name="landing" content="welcome" />
                </Head>
                <Menu />
                <div className='px-[60px] py-[119px] md:px-[25px]'>
                    <NavBarAdmin />
                    <div className='flex space-x-4'>
                        <DatePicker
                            label="Fecha de inicio"
                            value={startDate}
                            onChange={(newDate) => setStartDate(newDate)}
                            renderInput={(params) => <input {...params} value={startDate ? format(startDate, 'dd/MM/yyyy') : ''} />}
                        />
                        <DatePicker
                            label="Fecha de fin"
                            value={endDate}
                             onChange={(newDate) => setEndDate(newDate)}
                            renderInput={(params) => <input {...params} value={endDate ? format(endDate, 'dd/MM/yyyy') : ''} />}
                        />
                        <button onClick={handleFilter} className='px-4 py-2 bg-blue-500 text-white rounded'>
                            Filtrar
                        </button>
                        <button onClick={clearFilter} className='px-4 py-2 bg-red-500 text-white rounded'>
                            Limpiar Filtro
                        </button>
                    </div>
                    <p className='text-light my-2'>Total General de horas Asignadas: {totalHorasOcupadas} </p>
                    <p className='text-light my-2'>Total General de horas Libres: {totalHorasLibres}</p>
                    
                    <section>
                        <p className="text-[18px] text-title_color font-medium border-b-2 pb-[25px] pt-[26px] px-[35px]">Distribucion de Horas</p>
                        <ul className="bg-[#F3F2F7] w-full flex py-[19px] px-[35px] font-semibold justify-between">
                            <li className="w-[100px]">Nombre</li>
                            <li className="w-[110px]">Apellido</li>
                            <li className="w-[200px]">Correo</li>
                            <li className="w-[158px]">Horas Asignadas</li>
                            <li className="w-[120px]">Horas Libres</li>
                            <li className="w-[120px]">Total de Horas</li>
                        </ul>
                        {filteredProfesores.map((profesor, index) => (
                            <ul className="bg-[#F3F2F7] w-full flex py-[19px] px-[35px] justify-between" key={index}>
                                <li className="w-[80px]">{profesor.first_name}</li>
                                <li className="w-[80px]">{profesor.last_name}</li>
                                <li className="w-[200px]">{profesor.email}</li>
                                <li className="w-[70px]">{profesor.horasOcupadas}</li>
                                <li className="w-[70px]">{profesor.horasLibres}</li>
                                <li className="w-[70px]">{profesor.horasOcupadas + profesor.horasLibres}</li>
                            </ul>
                        ))}
                    </section>
                </div>
            </div>
        </LocalizationProvider>
    );
}
