
import dbConnect from '../../../config/mongo'
import Formulario from '../../../models/Formulario2'

//El formulario 2 son los dos formmularios de 
// /FormLevel 
// /FormLevel2
// En la misma tabla hay un elemento que dice Texto: One o Two
// One  es /FormLevel
// Two  es /FormLevel2
export default async function GetByEmail(req, res) {
  const {
    query: { email },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        console.log("/////////////////////// ",email," ///////////////////////")
        console.log('CONNECTING TO MONGO DB');
        await dbConnect();
        console.log('CONNECTED TO MONGO DB',);

        console.log('/api/users/[email] user with email:', email);

        const totalResults = await Formulario.countDocuments({
          $or: [
             { Email: { $regex: new RegExp(email, 'i') } },
          ],
        });

        const results = await Formulario.findOne({ Email :email}).select('-createdAt -updatedAt -password')

        // if (!results || results.length === 0) {
        //   return res.status(404).json({ message: 'No se encontraron usuarios' });
        // }

        console.log(
          "/////////////////////////////// ",
          req.headers.accept === "*/*" ? "Solicitud desde Codigo" : "Solicitud desde Navegador",
          " ///////////////////////////////"
        );

        if (req.headers.accept === "*/*") {
          // Solicitud desde el código
        //  console.log(results)
       //   console.log(totalResults)
         
          return res.status(200).json({ results, totalResults });
        } else {
          // Solicitud desde el navegador
          res.status(200).json({ message: "Acceso Denegado" });
        }
      } catch (error) {
        console.error('Error al buscar en MongoDB:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    default:
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
};
