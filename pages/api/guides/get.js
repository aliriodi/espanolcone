import dbConnect from '../../../config/mongo'
import Users from '../../../models/Users'

// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse}  res 
//  */


export default async function getAllTechers(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');



    console.log('LOOKING GUIDES');

    const guides = await Users.find({ role: 'guide' }).exec();

    console.log('GUIDES FOUND');

    // Verifica procedencia de solicitud 
    if(req.headers.accept == "*/*"){
      // Solicitud desde el codigo
      res.status(200).json({ guides });
    }
    else{
      // Solicitud desde el navegador
      res.status(200).json({ message: "Acceso Denegado" });
    }

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

