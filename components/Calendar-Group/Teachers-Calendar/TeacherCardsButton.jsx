import useStudent from "../hooks/useStudent"

export const TeacherCardsButton = (props) => {
    const { teacherCards, takeCardId, renders, deltaTime } = props
    const { selectedTeacherId } = useStudent()

    // Filtrar y ordenar los maestros
    const teachersWithUTN = teacherCards.filter(teacher => teacher.calendarGroup.some(calendar => calendar.utnCreated === -3));
    const teachersWithoutUTN = teacherCards.filter(teacher => !teacher.calendarGroup.some(calendar => calendar.utnCreated === -3));
    const sortedTeachers = [...teachersWithUTN, ...teachersWithoutUTN];

    return (
        <div className="flex flex-wrap justify-center mt-20">
            {
                sortedTeachers.map((teacher) => {
                    const isSelected = selectedTeacherId === teacher._id;
                    const isAvailable = teacher.calendarGroup.some(calendar => calendar.utnCreated === -3);

                    return (renders?.user._id !== teacher._id &&
                        <div
                            key={teacher._id}
                            className={`m-4 ${isSelected ? 'shadow-lg border-4 border-blue-500' : ''} ${isAvailable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                            onClick={() => isAvailable && takeCardId(teacher._id)}>
                            <div className="flex flex-col items-center pb-10">
                                <div className={`w-24 h-24 mb-3 rounded-full shadow-lg overflow-hidden ${isAvailable ? '' : 'grayscale'}`}>
                                    <img className="object-cover w-full h-full" src={teacher.image.url} alt={`${teacher.first_name} ${teacher.last_name}`} />
                                </div>
                                <h5 className="mb-1 text-xl font-medium text-gray-900">{teacher.first_name} {teacher.last_name}</h5>
                                <span className="text-sm text-gray-500">{teacher.role}</span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
