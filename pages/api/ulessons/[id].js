
import dbConnect from '../../../config/mongo'
import Ulessons from '../../../models/Ulessons'


export default async function Idclass(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {

        console.log('CONNECTING TO MONGO DB');

        await dbConnect()
    
        console.log('CONNECTED TO MONGO DB');

        const ulesson = await Ulessons.findById({_id:id});

        if (!ulesson) {
          return res.status(404).json({ message: 'Class not found' });
        }

        
        // Verifica procedencia de solicitud 
        if(req.headers.accept == "*/*"||true){
          // Solicitud desde el codigo
          return res.status(200).json({ulesson});
        }
        else{
          // Solicitud desde el navegador
          res.status(200).json({ message: "Acceso Denegado" });
        }

      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    default:
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
};
