import dbConnect from '../../../config/mongo'
import Ulessons from '../../../models/Ulessons'

// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse}  res 
//  */


export default async function getAllClass(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');



    console.log('TAKING CLASS');

    const ulessons = await Ulessons.find().exec();

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

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

