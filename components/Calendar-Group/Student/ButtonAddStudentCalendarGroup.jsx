import React from 'react'
import { parseISO, isSameDay } from 'date-fns';
import useStudents from './hooks/useStudents';

export const ButtonAddStudentCalendarGroup = ({ personSchedule, renders, selectedDay }) => {


    const { useAddStudentsCalendar, isSubmitting } = useStudents();


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
                        disabled={isSubmitting}
                    >
                        {hoursMeet.startDatetime.split('T')[1]} - {hoursMeet.endDatetime.split('T')[1]}
                    </button>
                )
            ))}
        </>
    );
}
