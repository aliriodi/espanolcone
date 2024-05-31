//import { parseISO, isSameDay } from 'date-fns';
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isAfter,
    isBefore,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import useStudent from '../hooks/useStudent';
import { useState } from 'react';

export function HoursMeetingTeacher({ teacherCards, renders, selectedDay, idTeacher, takeHoursMeet, deltaTime }) {
    const { handleAddStudentsCalendarGroup, isSubmitting } = useStudent();
    const [selectedMeet, setSelectedMeet] = useState(null);

    // console.log('render', renders.user)

    const handleSelectMeet = (datetime) => {
        setSelectedMeet(datetime);
        takeHoursMeet(datetime);
    };

    return (
        <div className="flex flex-col items-center">
            {teacherCards?.map((teacher) => (
                teacher.calendarGroup.map((hoursMeet) => (

                    isSameDay(parseISO(hoursMeet.startDatetime), selectedDay) && (idTeacher === teacher._id) && (
                        <button
                            key={hoursMeet.startDatetime}
                            type="button"
                            className='bg-purple-500 text-center text-white rounded-[5px] py-2 mt-2 w-40'
                            onClick={() => handleSelectMeet(hoursMeet.startDatetime)}
                        >
                            {format(new Date(parseISO(hoursMeet.startDatetime).getTime() + deltaTime), "HH:mm")} -
                            {format(new Date(parseISO(hoursMeet.endDatetime).getTime() + deltaTime), "HH:mm")}

                            {/* 
                            userstartDatetime: format(new Date(parseISO(calendar1.startDatetime).getTime() + deltaTime2), "yyyy-MM-dd'T'HH:mm"),
                             userendDatetime: format(new Date(parseISO(calendar1.endDatetime).getTime() + deltaTime2), "yyyy-MM-dd'T'HH:mm")
                            */}
                        </button>
                    )
                ))
            ))}
            {selectedMeet && (
                <button
                    disabled={isSubmitting}
                    className='bg-primary text-center text-white rounded-[5px] py-2 px-4 mt-4 w-40'
                    onClick={() => handleAddStudentsCalendarGroup(renders.user, { startDatetime: selectedMeet, teacherEmail: teacherCards.email })}
                >
                    CONFIRMAR
                </button>
            )}
        </div>
    );
}
