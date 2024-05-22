import dbConnect from '../../../config/mongo'
import Class from '../../../models/Class'

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

    const class1 = await Class.find().exec();

    console.log('CLASS TAKEN');
    
    // Verifica procedencia de solicitud 
    if(req.headers.accept == "*/*"||true){
      // Solicitud desde el codigo
      //Decclaro los classResume
      
      const classResume = [];
      class1.map((e)=>{
        
        classResume.push(
       { _id: e._id,
        level:e.level,
        unit: e.unit,
        description: e.description,
        sheets: [e.sheets[0]]
         })})

      res.status(200).json({ classResume });
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

