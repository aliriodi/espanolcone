import useStudent from "../hooks/useStudent"


export const TeacherCardsButton = (props) => {
    const { teacherCards,
            takeCardId, 
            renders ,
            hasclass,
            checkTeacherAvailability2} = props


    const { handleSelectTeacherId, selectedTeacherId } = useStudent()




    return (
        <div className="flex flex-wrap justify-center mt-20">
            {
                teacherCards.map((teacher) => {
                    const isSelected = selectedTeacherId === teacher._id;


                    return (renders?.user._id !== teacher._id &&
                        <div
                            key={teacher._id}
                            className={`m-4 ${isSelected ? 'shadow-lg border-4 border-blue-500' : ''}`}
                            onClick={() => takeCardId(teacher._id)}>
                                      
                            <div className="flex flex-col items-center pb-10">
                      
                                {/* <div className="w-24 h-24 mb-3 rounded-full shadow-lg overflow-hidden">
                                    <img className="object-cover w-full h-full" src={teacher.image.url} alt={`${teacher.first_name} ${teacher.last_name}`} ></img>
                                            
                                </div> */}
                                <div className="relative w-24 h-24 mb-3 rounded-full shadow-lg overflow-hidden">
  <img className="object-cover w-full h-full" src={teacher.image.url} alt={`${teacher.first_name} ${teacher.last_name}`} />
 { checkTeacherAvailability2(teacher._id) &&
   <span className='absolute w-4 h-4 bg-green-500 top-3 right-3 rounded-full border-2 border-white'></span>}
</div>
                                <h5 className="mb-1 text-xl font-medium text-gray-900">{teacher.first_name} {teacher.last_name}</h5>
                                <span className="text-sm text-gray-500">Profesor(a)</span>
                                {/* <span className="text-sm text-gray-500">{teacher.role}</span> */}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}
