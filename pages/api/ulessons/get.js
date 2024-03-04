import dbConnect from '../../../config/mongo'
import Ulesson from '../../../models/Ulessons'

// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse}  res 
//  */


export default async function getAllUlesson(req, res) {
  const {
    query: { 
      topics,
      formats,
      level,
      page = 1,
      maxResults = 10
    },
  } = req;

  try {
    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');



    console.log('TAKING CLASS');

    // Crea un objeto para almacenar los criterios de búsqueda
    const filter = {};

    // Agrega los criterios de búsqueda si están presentes en los parámetros de consulta
    if (topics) filter.topics = topics;
    if (formats) filter.formats = { $in: formats.split(',') }; // Si formats es una lista separada por comas

    if (level) filter.level = level;

    // Realiza la búsqueda en la base de datos utilizando el esquema definido
    const ulessons = await Ulesson.find(filter)
      .limit(Number(maxResults)) // Limita el número de resultados devueltos
      .skip((page - 1) * maxResults); // Paginación

    console.log('CLASS TAKEN');
    
    // Verifica procedencia de solicitud 
    if(req.headers.accept == "*/*"||true){
      // Solicitud desde el codigo
      res.status(200).json({ ulessons });
    }
    else{
      // Solicitud desde el navegador
      res.status(200).json({ message: "Acceso Denegado" });
    }
    // res.status(200).json({ message: "Acceso Denegado" });

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

