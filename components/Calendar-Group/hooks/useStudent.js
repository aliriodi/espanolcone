
import { useState } from 'react';

const useStudent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddMeetToCalendarGroup = async (student, teacher, selectedMeet, selectedMeetEnd) => {
        const { first_name, last_name, image, email, country } = student;
        const { calendarGroup, first_name: teacherFirstName, last_name: teacherLastName, email: teacherEmail, image: teacherImage } = teacher;

        
       
        // Actualizar el grupo de calendario del profesor
        const updatedCalendarGroupTeacher = calendarGroup.map(group => {
            if (group.startDatetime) {
                if (group.students.length >= group.studentLimit) {
                    alert('El límite de estudiantes anotado se ha superado');
                    return group;
                }

                // Agrega el estudiante al grupo de calendario del profesor
                const updatedStudents = [...group.students, { first_name, last_name, image, email, country, userstartDatetime: selectedMeet, userendDatetime: selectedMeetEnd,  }];
                return { ...group, students: updatedStudents };
            }
            console.log(group)
            return group;
        });


        // Actualizar el grupo de calendario del estudiante
        const updatedCalendarGroupStudent = student.calendarGroup ? [...student.calendarGroup] : [];
        updatedCalendarGroupStudent.push({
            startDatetime: selectedMeet,
            endDatetime: selectedMeetEnd,
            teacherFirstName,
            teacherLastName,
            teacherEmail,
            teacherImage,
           
        });

        // Enviar datos al servidor para el profesor
        setIsSubmitting(true);
        try {
            const responseTeacher = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: teacherEmail, updates: { calendarGroup: updatedCalendarGroupTeacher } }),
            });

            const dataTeacher = await responseTeacher.json();
            console.log('Profesor:', dataTeacher);

            // Enviar datos al servidor para el estudiante
            const responseStudent = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, updates: { calendarGroup: updatedCalendarGroupStudent } }),
            });

            const dataStudent = await responseStudent.json();
            console.log('Estudiante:', dataStudent);
            alert('El estudiante se ha anotado correctamente.');
        } catch (error) {
            console.error(error);
            alert('Hubo un problema al anotar al estudiante.');
        } finally {
            setIsSubmitting(false);
        }

        // Imprime el resultado para verificación
        console.log(`Estudiantes anotados en la clase (${selectedMeet} - ${selectedMeetEnd}):`, updatedCalendarGroupTeacher);
    };

    return {
        handleAddMeetToCalendarGroup,
        isSubmitting,
    };
};

export default useStudent;
