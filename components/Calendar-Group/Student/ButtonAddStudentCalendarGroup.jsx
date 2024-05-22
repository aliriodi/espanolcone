import { useState } from 'react';
import { parseISO, isSameDay } from 'date-fns';

export default function ButtonAddStudentCalendarGroup({ personSchedule, renders, selectedDay }) {


    async function useAddStudentsCalendar(student, classDetails) {

        const { first_name, last_name, image, email, country } = student;
        const { students, studentLimit, id, startDatetime, endDatetime, teacherEmail } = classDetails;

        // Verifica si el límite de estudiantes se ha superado
        if (students.length >= studentLimit) {
            return alert('El límite de estudiantes anotado se ha superado');
        }

        // Agrega el estudiante a la clase localmente
        const updatedStudents = [...students, { first_name, last_name, image, email, country }];

        // Crea la estructura de datos actualizada para la clase
        const updatedClassDetails = {
            ...classDetails,
            students: updatedStudents
        };



        try {
            const response = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: teacherEmail, updates: { calendarGroup: updatedClassDetails } }),
            });

            const data = await response.json();
            console.log(data);
            alert('El estudiante se ha anotado correctamente.');
        } catch (error) {
            console.error(error);
            alert('Hubo un problema al anotar al estudiante.');
        }

        // Imprime el resultado para verificación
        console.log(`Estudiantes anotados en la clase ${id} (${startDatetime} - ${endDatetime}):`, updatedStudents);
        console.log('Cantidad de estudiantes anotados:', updatedStudents.length);
    };



    if (!personSchedule || !personSchedule.calendarGroup || !renders) {
        return null; // o algún indicador de carga
    }

    return (
        <>
            {personSchedule?.calendarGroup?.length && personSchedule.calendarGroup.map((hoursMeet) => (
                isSameDay(parseISO(hoursMeet.startDatetime), selectedDay) && (
                    <button
                        type="button"
                        className='bg-success text-center text-white rounded-[5px] py-2 mt-4 mx-1'
                        key={hoursMeet.startDatetime}
                        onClick={() => useAddStudentsCalendar(renders?.user, { ...hoursMeet, teacherEmail: 'teacher@example.com' })} // Asegúrate de pasar el correo electrónico del profesor

                    >
                        {hoursMeet.startDatetime.split('T')[1]} - {hoursMeet.endDatetime.split('T')[1]}
                    </button>
                )
            ))}
        </>
    );
}
