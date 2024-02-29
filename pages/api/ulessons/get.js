import dbConnect from '../../../config/mongo'
import Ulesson from '../../../models/Ulessons'

// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse}  res 
//  */


export default async function getAllUlesson(req, res) {
  // const {
  //   query: { formats, level, page, maxResults },
  // } = req;

  try {
    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');



    console.log('TAKING CLASS');

    const ulessons = await Ulesson.find().exec();

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

