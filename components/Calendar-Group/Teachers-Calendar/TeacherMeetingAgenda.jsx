import React, { useState, useEffect } from 'react';

export const TeacherMeetingAgenda = (props) => {
    const { teacherCards, idTeacher, selectedDay, hoursMeet, deltaTime } = props;
    const [selectedDescription, setSelectedDescription] = useState('');

    useEffect(() => {
        // Recorre los teacherCards y encuentra la descripción que cumpla con las condiciones
        teacherCards.forEach((teach) => {
            if (idTeacher === teach._id) {
                teach.calendarGroup.forEach((day) => {
                    if (new Date(day.startDatetime) - new Date(hoursMeet) === -deltaTime) {
                        setSelectedDescription(day.description);
                    }
                });
            }
        });
    }, [teacherCards, idTeacher, hoursMeet, deltaTime]);

    return (
        <div>
            Temario:<br />
            {
                teacherCards.map((teach) => (
                    idTeacher === teach._id && teach.calendarGroup.map((day) => (
                        new Date(day.startDatetime) - new Date(hoursMeet) === -deltaTime &&
                        <p key={day.startDatetime}>{day.description}</p>
                    ))
                ))
            }
            {/* Muestra la descripción seleccionada */}
            {/* {selectedDescription && <p>Descripción seleccionada: {selectedDescription}</p>} */}
        </div>
    );
}


