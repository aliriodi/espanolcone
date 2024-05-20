const useStudents = () => {

    const useAddStudentsCalendar = (student, classDetails) => {
        const { first_name, last_name, image, email, country } = student;
        const { students, studentLimit, id, startDatetime, endDatetime } = classDetails;

        // Verifica si el límite de estudiantes se ha superado
        if (students.length >= studentLimit) {
            return alert('El límite de estudiantes anotado se ha superado');
        }

        // Agrega el estudiante a la clase
        students.push({ first_name, last_name, image, email, country });

        // Imprime el resultado para verificación
        console.log(`Estudiantes anotados en la clase ${id} (${startDatetime} - ${endDatetime}):`, students);
        console.log('Cantidad de estudiantes anotados:', students.length);
    }

    return {
        useAddStudentsCalendar
    }
}

export default useStudents;