
export const TeacherMeetingAgenda = (props) => {

    const { teacherCards, idTeacher, selectedDay, hoursMeet, deltaTime } = props


    return (
        <div>Temario:<br />

            {
                teacherCards.map((teach) => (
                    (idTeacher === teach._id) && (teach.calendarGroup.map((day) => {
                        return (new Date(day.startDatetime) - new Date(hoursMeet) === -deltaTime) &&
                            <p key={day.description}>{day.description}</p>
                    }))
                ))
            }

        </div>

    )
}
