import React, { useState, useEffect } from 'react';

export const TeacherMeetingAgenda = (props) => {
    const { teacherCards, idTeacher, selectedDay, hoursMeet, deltaTime, takeDescriptionMeet } = props;
    const [selectedDescription, setSelectedDescription] = useState('');

    useEffect(() => {
        // Recorre los teacherCards y encuentra la descripción que cumpla con las condiciones
        teacherCards.forEach((teach) => {
            if (idTeacher === teach._id) {
                teach.calendarGroup.forEach((day) => {
                    if (new Date(day.startDatetime) - new Date(hoursMeet) === -deltaTime) {
                        takeDescriptionMeet(day.description);
                        setSelectedDescription(day.description)
                    }
                });
            }
        });
    }, [teacherCards, idTeacher, hoursMeet, deltaTime]);

    return (
        <div>
            {selectedDescription && <p>Temario de la clase: <br /> {selectedDescription}</p>}
        </div>
    );
}


