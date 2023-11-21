import dbConnect from '../../../config/mongo';
import Users from '../../../models/Users';

export default async function getUsersWithImage(req, res) {
  try {
    console.log('CONNECTING TO MONGO DB');
    await dbConnect();
    console.log('CONNECTED TO MONGO DB');

    console.log('QUERYING DATABASE FOR USERS WITH IMAGE');

    // Utiliza el método .find() de Mongoose con una consulta que verifica si el campo 'image' no es igual a null
    const usersWithImage = await Users.find({ image: { $ne: null } }).exec();

    console.log('RETRIEVED USERS WITH IMAGE');

    
    // Verifica procedencia de solicitud 
    console.log("/////////////////////////////// ",req.headers.accept == "*/*" ? "Solicitud desde Codigo": "Solicitud desde Navegador"," ///////////////////////////////")

    if(req.headers.accept == "*/*"){
      // Solicitud desde el codigo
      return res.status(200).json({ usersWithImage });
    }
    else{
      // Solicitud desde el navegador
      res.status(200).json({ message: "Acceso Denegado" });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}


