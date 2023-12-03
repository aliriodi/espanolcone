
import dbConnect from '../../../config/mongo'
import Class from '../../../models/Class'


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

        const class1 = await Class.findById({_id:id});

        if (!class1) {
          return res.status(404).json({ message: 'Class not found' });
        }

        
        // Verifica procedencia de solicitud 
        if(req.headers.accept == "*/*"||true){
          // Solicitud desde el codigo
          return res.status(200).json({class1});
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
