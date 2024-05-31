import { isSameDay, parseISO } from "date-fns"

export const TeacherMeetingAgenda = (props) => {

    const { teacherCards, idTeacher, selectedDay, hoursMeet } = props


    return (
        <div>Temario:<br />

            {
                teacherCards.map((teach) => (
                    (idTeacher === teach._id) && (teach.calendarGroup.map((day) => (
                        (day.startDatetime === hoursMeet) && <p key={day.startDatetime}>
                            {day.description}
                        </p>

                    )))
                ))
            }

        </div>

    )
}
