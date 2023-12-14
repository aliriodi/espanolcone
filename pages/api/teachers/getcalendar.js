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
    const maxResults = 10;

    const teachersWithAgenda = await Users.find({
      role: 'teacher'
    }).exec();

    const filteredTeachers = teachersWithAgenda.sort((a, b) => {
      const aCondition = a.calendar.some(calendar1 => (
        (isAfter(parseISO(calendar1.startDatetime), tomorrow) || isEqual(parseISO(calendar1.startDatetime), tomorrow)) && !calendar1.assigned
      ));
      const bCondition = b.calendar.some(calendar1 => (
        (isAfter(parseISO(calendar1.startDatetime), tomorrow) || isEqual(parseISO(calendar1.startDatetime), tomorrow)) && !calendar1.assigned
      ));

      a._doc = {...a._doc, active:aCondition}
      b._doc = {...b._doc, active:bCondition}

      if (aCondition && !bCondition) {
        return -1;
      } else if (!aCondition && bCondition) {
        return 1;
      } else {
        return 0;
      }
    }).slice(0, maxResults);

    const  output = filteredTeachers

    // teachersWithAgenda.map(
    // teacher=>
    //   teacher.calendar.some(calendar1=>(
    //   (isAfter(parseISO(calendar1.startDatetime),tomorrow) || isEqual(parseISO(calendar1.startDatetime),tomorrow)) && !calendar1.assigned ?
    //     output.push(teacher) : null)
    //   )
    // )

//Mapeo para mostrar solo los teachers que tienen disponibilidad de horario 
//No asignada y posibles a agednar a partir de mañana
  console.log('TEACHERS WITH SCHEDULE FROM TOMORROW FOUND');

  // Verifica procedencia de solicitud 
  console.log("/////////////////////////////// ",req.headers.accept == "*/*" ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

  if(req.headers.accept == "*/*"){
    // Solicitud desde el codigo
    res.status(200).json({ teachers: output });
  }
  else{
    // Solicitud desde el navegador
    res.status(200).json({ message: "Acceso Denegado" });
  }

  } catch (error) {
    console.error(error);
    res.json({ error });
  }
}
