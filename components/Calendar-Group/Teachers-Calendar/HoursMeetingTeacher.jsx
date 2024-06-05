import {
    format,
    isSameDay,
    parseISO
} from 'date-fns';
import useStudent from '../hooks/useStudent';
import { useState } from 'react';


export function HoursMeetingTeacher({ teacherCards, renders, selectedDay, idTeacher, takeHoursMeet, deltaTime }) {
    const { handleAddMeetToCalendarGroup, isSubmitting } = useStudent();
    const [selectedMeet, setSelectedMeet] = useState(null);
    const [selectedMeetEnd, setSelectedMeetEnd] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    const handleSelectMeet = (datetime, datetimeEnd, teacher) => {
        setSelectedTeacher(teacher);
        setSelectedMeet(datetime);
        setSelectedMeetEnd(datetimeEnd);
        takeHoursMeet(datetime);
    };

    return (
        <div className="flex flex-col items-center">
            {teacherCards?.map((teacher) => (
                teacher.calendarGroup.map((hoursMeet, index) => (
                    isSameDay(parseISO(hoursMeet.startDatetime), selectedDay) && (idTeacher === teacher._id) && (
                        <li key={index}>
                            <button
                                type="button"
                                className='focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mb-2 w-full border-solid border-[2px] border-primary hover:bg-primary transition-all'
                                onClick={() => handleSelectMeet(
                                    format(new Date(parseISO(hoursMeet.startDatetime).getTime() + deltaTime), "yyyy-MM-dd'T'HH:mm"), format(new Date(parseISO(hoursMeet.endDatetime).getTime() + deltaTime), "yyyy-MM-dd'T'HH:mm"), teacher)}
                            >
                                <time datetime={hoursMeet.startDatetime}>{format(new Date(parseISO(hoursMeet.startDatetime).getTime() + deltaTime), "HH:mm")}</time>{' '}
                                -{' '}
                                <time datetime={hoursMeet.endDatetime}>{format(new Date(parseISO(hoursMeet.endDatetime).getTime() + deltaTime), "HH:mm")}</time>
                            </button>
                        </li>
                    )
                ))
            ))}
            {selectedMeet && (
                <button
                    disabled={isSubmitting}
                    className='bg-primary text-center text-white rounded-[5px] py-2 px-4 mt-4 w-40'
                    onClick={() => handleAddMeetToCalendarGroup(renders.user, selectedTeacher, selectedMeet, selectedMeetEnd)}
                >
                    CONFIRMAR
                </button>
            )}
        </div>
    );
}


// Todo: Al usuario le tengo que mandar la hora creada y la que el tiene. Tengo que hacer lo del temario
// Todo: Modal de pago. Renderizar todo en cada calendario. Pulir cualquier detalles de estilos... 