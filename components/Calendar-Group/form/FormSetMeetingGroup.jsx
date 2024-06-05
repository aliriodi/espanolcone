import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from '../../../redux/ECEActions';
import { useRouter } from 'next/router';

export const FormSetMeetingGroup = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [newCalendar2, setNewCalendar2] = useState([]);
    const [formData, setFormData] = useState({
        teacher: '',
        topic: '',
        date: '',
        startMeetTime: '',
        endMeetTime: '',
        studentCount: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        dispatch(fetchTeachers());
    }, [dispatch]);

    const cards = useSelector((state) => state.datos.cards);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'teacher') {
            calendarTeacher(value);
        }
    };

    const calendarTeacher = (teacherEmail) => {
        const teacherCard = cards.find(card => card.email === teacherEmail);
        if (teacherCard) {
            setNewCalendar2(teacherCard.calendarGroup || []);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { date, startMeetTime, endMeetTime, ...rest } = formData;

        const newcalendar = {
            id: '',
            assigned: true,
            preassgined: false,
            studentLimit: rest.studentCount,
            students: [{
                utnscheduled: '',
                userstartDatetime: '',
                userendDatetime: '',
            }],
            first_name: rest.teacher,
            description: rest.topic,
            startDatetime: `${date}T${startMeetTime}`,
            endDatetime: `${date}T${endMeetTime}`,
            utnCreated: -3,
            locationCreated: '',
            locationscheduled: '',
        };

        try {
            await fetch('/api/users/update', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: rest.teacher, updates: { calendarGroup: [...newCalendar2, newcalendar] } }),
            }).then(response => response.json()).then(data => console.log(data));

            alert('La clase se ha asignado correctamente.');
            router.push('/inicio/calendarGroup');
        } catch (error) {
            console.error(error);
        }
        console.log(newcalendar);
    };

    return (
        <form className='mt-44 px-44' onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="teacher" className="block mb-2 text-sm font-medium text-gray-900">Seleccionar Profesor/es</label>
                    <select id="teacher" name="teacher" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={handleInputChange}>
                        <option value="">Selecciona profesor/es</option>
                        {cards && cards.map((card) => (
                            <option key={card._id} value={card.email}>{card.first_name}  || {card.email}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-900">Temario</label>
                    <input type="text" id="topic" name="topic" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Temario" required onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Seleccionar Fecha</label>
                    <input type="date" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="startMeetTime" className="block mb-2 text-sm font-medium text-gray-900">Seleccionar Hora de inicio</label>
                    <input type="time" id="startMeetTime" name="startMeetTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required value={formData.startMeetTime} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="endMeetTime" className="block mb-2 text-sm font-medium text-gray-900">Seleccionar Hora de Finalizacion</label>
                    <input type="time" id="endMeetTime" name="endMeetTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required value={formData.endMeetTime} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="studentCount" className="block mb-2 text-sm font-medium text-gray-900">Seleccionar Cantidad Estudiantes</label>
                    <input type="number" id="studentCount" name="studentCount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required value={formData.studentCount} onChange={handleInputChange} />
                </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>
    );
};
