import { useState } from 'react';

const useStudents = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const useAddStudentsCalendar = async (student, classDetails) => {
        const { first_name, last_name, image, email, country } = student;
        const { students, studentLimit, id, startDatetime, endDatetime, teacherEmail } = classDetails;

        // Verifica si el límite de estudiantes se ha superado
        if (students.length >= studentLimit) {
            return alert('El límite de estudiantes anotado se ha superado');
        }

        // Agrega el estudiante a la clase localmente
        const updatedStudents = [...students, { first_name, last_name, image, email, country }];
        
        // Crea la estructura de datos actualizada para la clase
        const updatedClassDetails = {
            ...classDetails,
            students: updatedStudents
        };

        // Enviar datos al servidor
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: teacherEmail, updates: { calendarGroup: updatedClassDetails } }),
            });

            const data = await response.json();
            console.log(data);
            alert('El estudiante se ha anotado correctamente.');
        } catch (error) {
            console.error(error);
            alert('Hubo un problema al anotar al estudiante.');
        } finally {
            setIsSubmitting(false);
        }

        // Imprime el resultado para verificación
        console.log(`Estudiantes anotados en la clase ${id} (${startDatetime} - ${endDatetime}):`, updatedStudents);
        console.log('Cantidad de estudiantes anotados:', updatedStudents.length);
    };

    return {
        useAddStudentsCalendar,
        isSubmitting
    };
};

export default useStudents;
