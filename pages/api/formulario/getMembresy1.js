import dbConnect from '../../../config/mongo'
import Membresy from '../../../models/Formulario4'



export default async function getAllForms(req, res) {

  try {
    

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');



    console.log('LOOKING MEMBRESY1');

    const forms = await Membresy.find().exec();

    console.log('MEMBRESY 1 FOUND');

    // Verifica procedencia de solicitud 
    if(req.headers.accept == "*/*"){
      // Solicitud desde el 
       res.status(200).json({ forms });
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

