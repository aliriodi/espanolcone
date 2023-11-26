import dbConnect from '../../../config/mongo'
import Class from '../../../models/Class'


// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse}  res 
//  */

//prueba
export default async function getAllClass(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    //console.log(req.query)

    console.log('GETTING DOCUMENT');
    const class1 = await Class.findOne({ id: req.query.id }).exec();

    //console.log(users.password)
    console.log('GOT DOCUMENT');

    
    // Verifica procedencia de solicitud 
    if(req.headers.accept == "*/*"){
      // Solicitud desde el codigo
      res.status(200).json({ class1 });
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

