
import dbConnect from '../../../../config/mongo'
import Chat from '../../../../models/Chat'


export default async function ChatID(req, res) {
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

        const findChat = await Chat.findById({_id:id});

        if (!findChat) {
          return res.status(404).json({ message: 'Chat no existe' });
        }

        
        // Verifica procedencia de solicitud 
        console.log("/////////////////////////////// ",req.headers.accept == "*/*" || true ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

        if(req.headers.accept == "*/*" || true){
          // Solicitud desde el codigo
          return res.status(200).json({findChat});
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
