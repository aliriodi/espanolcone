import dbConnect from '../../../config/mongo'
import Formulario from '../../../models/Formulario'



export default async function getAllForms(req, res) {

  try {
    

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');



    console.log('LOOKING FORMS');

    const forms = await Formulario.find().exec();

    console.log('FORMS FOUND');

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

