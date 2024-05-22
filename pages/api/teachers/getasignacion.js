import dbConnect from '../../../config/mongo'
import Users from '../../../models/Users'

export default async function getFilteredTeachers(req, res) {
  try {
   await dbConnect();
    console.log('CONNECTED TO MONGO DB');

    console.log('LOOKING TEACHERS');

    // Obtener todos los profesores
    const teachers = await Users.find({ role: 'teacher' })
    //  .select('first_name last_name email calendar')
      .exec();

    console.log('TEACHERS FOUND');

    // Mapear los datos de los profesores y extraer el campo calendar
    const profesor = teachers.map(({ first_name, last_name, email, calendar }) => ({
      first_name,
      last_name,
      email,
      calendar,
      horasOcupadas:0,
      horasLibres:0

    }));
    

    // Calcular la cantidad de horas ocupadas y libres
    let totalHorasOcupadas = 0;
    let totalHorasLibres = 0;

    // Recorrer cada profesor y su calendario
    profesor.forEach(prof => {
      let horasOcupadas = 0;
      let horasLibres = 0;
      prof.calendar.forEach(entry => {
        // Si hay un evento en el calendario, consideramos la hora como ocupada
        if (entry.assigned) {
          totalHorasOcupadas++;
          horasOcupadas++;
          prof.horasOcupadas = horasOcupadas
        } else {
          totalHorasLibres++;
          horasLibres++;
          prof.horasLibres = horasLibres
        }
      });
    
    });

    // Verificar procedencia de la solicitud 
    if (true || req.headers.accept === "*/*") {
      // Solicitud desde el código
      res.status(200).json({ profesor, totalHorasOcupadas, totalHorasLibres });
    } else {
      // Solicitud desde el navegador
      res.status(200).json({ message: "Acceso Denegado" });
    }

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
