
import dbConnect from '../../../config/mongo'
import Presupuesto from '../../../models/Presupuesto'


export default async function handler(req, res) {
  console.log('7 entre')
  if (req.method === 'GET') {
    const { idUser, idUsuario } = req.query;
console.log('9 entre')
    try {
      // Conecta a la base de datos
      await dbConnect();

      // Busca en la tabla de presupuestos si hay un registro con las variables proporcionadas
      const presupuesto = await Presupuesto.findOne({ idUser, idGuide,validado: false  });

      if (presupuesto) {
        // Si se encuentra un presupuesto con las variables proporcionadas, devuelve un mensaje de éxito
        res.status(200).json({presupuesto});
      } else {
        // Si no se encuentra un presupuesto con las variables proporcionadas, devuelve un mensaje de error
        res.status(404).json({ message: 'No se encontró ningún presupuesto con estas variables.' });
      }
    } catch (error) {
      // Si ocurre un error al conectar la base de datos o buscar en la tabla de presupuestos, devuelve un mensaje de error
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  } else {
    // Si no se envía una solicitud GET, devuelve un mensaje de error
    res.status(405).json({ message: 'Método no permitido.' });
  }
}
