
import { parseISO, isSameDay } from 'date-fns';
import useStudent from '../hooks/useStudent';

export function HoursMeetingTeacher({ teacherCards, renders, selectedDay, idTeacher, takeHoursMeet }) {

    const { handleAddStudentsCalendarGroup, isSubmitting } = useStudent()


    return (
        <>
            {teacherCards?.map((teach) => (teach.calendarGroup?.length)) && teacherCards?.map((teacher) => (teacher.calendarGroup.map((hoursMeet) => (
                isSameDay(parseISO(hoursMeet.startDatetime), selectedDay) && (idTeacher === teacher._id) && (
                    <div>

                        <button
                            type="button"
                            className='bg-success text-center text-white rounded-[5px] py-2 mt-4 mx-1'
                            key={hoursMeet.startDatetime}
                            onClick={() => takeHoursMeet(hoursMeet.startDatetime)}

                        >
                            {hoursMeet.startDatetime.split('T')[1]} - {hoursMeet.endDatetime.split('T')[1]}
                        </button>

                    </div>
                )
            ))))}
            {/* 1era Que el profesor sea el profesor seleccionado */}
            {/* 2da que haya seleccionado un meet */}
            {/* 3era Que el dia corresponda al dia seleccionado */}
            {/* 4ta Que el alumno tenga disponibilidad de clases , en este momento va ser un true */}
            {/*  si la 4ta no se da se renderiza boton de PAGO */}
            <button disabled={isSubmitting} onClick={() => handleAddStudentsCalendarGroup(renders.user, { ...hoursMeet, teacherEmail: teacherCards.email })}> CONFIRMAR</button>
        </>
    );
}
