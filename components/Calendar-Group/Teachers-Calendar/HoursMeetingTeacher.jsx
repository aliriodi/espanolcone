import { format, isSameDay, parseISO } from 'date-fns';
import useStudent from '../hooks/useStudent';
import { useState } from 'react';

export function HoursMeetingTeacher({ teacherCards, renders, selectedDay, idTeacher, takeHoursMeet, deltaTime, description }) {
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
        <div className="flex flex-col items-center w-full pt-5 mr-5">
            {teacherCards?.map((teacher) => (
                teacher?.calendarGroup?.map((hoursMeet, index) => (
                    isSameDay(parseISO(hoursMeet.startDatetime), selectedDay) && (idTeacher === teacher._id) && (
                        <div key={index}>
                            <button
                                type="button"
                                className='focus:outline-none font-medium rounded-lg text-sm px-10 py-2.5 mb-2 w-60 border-solid border-[2px] border-primary hover:bg-primary transition-all'
                                onClick={() => handleSelectMeet(
                                    format(new Date(parseISO(hoursMeet.startDatetime).getTime() + deltaTime), "yyyy-MM-dd'T'HH:mm"), format(new Date(parseISO(hoursMeet.endDatetime).getTime() + deltaTime), "yyyy-MM-dd'T'HH:mm"), teacher)}
                            >
                                <time dateTime={hoursMeet.startDatetime}>{format(new Date(parseISO(hoursMeet.startDatetime).getTime() + deltaTime), "HH:mm")}</time>{' '}
                                -{' '}
                                <time dateTime={hoursMeet.endDatetime}>{format(new Date(parseISO(hoursMeet.endDatetime).getTime() + deltaTime), "HH:mm")}</time>
                            </button>
                        </div>
                    )
                ))
            ))}
            {selectedMeet && (
                <button
                    disabled={isSubmitting}
                    className='bg-primary text-center text-white rounded-[5px] py-2 px-4 mt-4 w-60'
                    onClick={() => handleAddMeetToCalendarGroup(renders.user, selectedTeacher, selectedMeet, selectedMeetEnd, description)}
                >
                    CONFIRMAR
                </button>
            )}
        </div>
    );
}
