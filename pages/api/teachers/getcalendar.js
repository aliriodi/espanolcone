import dbConnect from '../../../config/mongo'
import Users from '../../../models/Users'
import { parseISO, isAfter, isEqual ,addDays, startOfDay} from 'date-fns';

export default async function getTeachersWithAgendaFromTomorrow(req, res) {
  try {
    console.log('CONNECTING TO MONGO DB');
    await dbConnect();
    console.log('CONNECTED TO MONGO DB');

    console.log('LOOKING FOR TEACHERS WITH AGENDA FROM TOMORROW');

    const tomorrow = startOfDay(addDays(new Date(), 1));

    const teachersWithAgenda = await Users.find({
      role: 'teacher',
      //$gte mayor o igual
      //'calendar.startDateTime': { $gte: tomorrow }
    }).exec();
    const  output = []

//Mapeo para mostrar solo los teachers que tienen disponibilidad de horario 
//No asignada y posibles a agednar a partir de mañana
    teachersWithAgenda.map(teacher=>
        teacher.calendar.some(calendar1=> 
          ((isAfter(parseISO(calendar1.startDatetime),tomorrow) || isEqual(parseISO(calendar1.startDatetime),tomorrow))
          &&!calendar1.assigned?
          output.push(teacher):null)))

//console.log(output.length,teachersWithAgenda.length)

    console.log('TEACHERS WITH SCHEDULE FROM TOMORROW FOUND');
//console.log(teachersWithAgenda)
    res.json({ teachers: output });
  } catch (error) {
    console.error(error);
    res.json({ error });
  }
}
