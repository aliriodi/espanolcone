/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { format, isSameDay, parseISO, isAfter, isBefore } from 'date-fns';
import esLocale from 'date-fns/locale/es';

import Head from 'next/head';
import Menu from "../../../components/Menu";
import NavBarAdmin from '../../../components/admin/NavBarAdmin';

export default function HoraProfesores() {
    const [profesores, setProfesores] = useState([]);
    const [profesoresM, setProfesoresM] = useState([]);
    const [filteredProfesores, setFilteredProfesores] = useState([]);
    const [totalHorasOcupadas, setTotalHorasOcupadas] = useState(0);
    const [totalHorasLibres, setTotalHorasLibres] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/teachers/getasignacion/');
                const res2 = await res.json();
                setProfesoresM(res2.profesor);
                setProfesores(res2.profesor);
                setFilteredProfesores(res2.profesor);
                setTotalHorasOcupadas(res2.totalHorasOcupadas);
                setTotalHorasLibres(res2.totalHorasLibres);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleFilter = () => {
        if (!startDate || !endDate) {
            return;
        }

        const profesoresNew = profesoresM.map(profesor => {
            const filterCalendar = profesor.calendar.filter(day => {
                const date = parseISO(day.startDatetime);
                return isAfter(date, startDate) && isBefore(date, endDate);
            });

            return {
                ...profesor,
                calendar: filterCalendar,
            };
        });

        horaProfesor(profesoresNew);
    };

    const horaProfesor = (profesores) => {
        let totalHorasOcupadas = 0;
        let totalHorasLibres = 0;

        const updatedProfesores = profesores.map(prof => {
            let horasOcupadas = 0;
            let horasLibres = 0;

            prof.calendar.forEach(entry => {
                if (entry.assigned) {
                    horasOcupadas++;
                    totalHorasOcupadas++;
                } else {
                    horasLibres++;
                    totalHorasLibres++;
                }
            });

            return {
                ...prof,
                horasOcupadas,
                horasLibres,
            };
        });

        setProfesores(updatedProfesores);
        setFilteredProfesores(updatedProfesores);
        setTotalHorasOcupadas(totalHorasOcupadas);
        setTotalHorasLibres(totalHorasLibres);
    };

    const clearFilter = () => {
        setStartDate(null);
        setEndDate(null);
        setFilteredProfesores(profesoresM);
       horaProfesor(profesoresM)
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
