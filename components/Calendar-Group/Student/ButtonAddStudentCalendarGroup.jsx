
import { parseISO, isSameDay } from 'date-fns';
import useStudent from '../hooks/useStudent';

export default function ButtonAddStudentCalendarGroup({ personSchedule, renders, selectedDay }) {

    const { handleAddStudentsCalendarGroup, isSubmitting } = useStudent()


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
                        onClick={() => handleAddStudentsCalendarGroup(renders.user, { ...hoursMeet, teacherEmail: personSchedule.email })}
                        disabled={isSubmitting}
                    >
                        {hoursMeet.startDatetime.split('T')[1]} - {hoursMeet.endDatetime.split('T')[1]}
                    </button>
                )
            ))}
        </>
    );
}
