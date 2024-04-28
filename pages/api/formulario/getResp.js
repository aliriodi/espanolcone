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
      console.log('FORMS FOUND RECALCULANDO');
      let p1op1=0,p1op2=0,p1op3=0,p1op4=0;
      let p2op1=0,p2op2=0,p2op3=0,p2op4=0;
   
      forms.map(elemento=>{
                            elemento.pregunta1.includes('Individuales online')? p1op1=1+p1op1:p1op1;
                            elemento.pregunta1.includes('Grupales Online')? p1op2=1+p1op2:p1op2;
                            elemento.pregunta1.includes('Grupales OnlineGrupales presenciales en salón de clases (si estás en CBA)')? p1op3=1+p1op3:p1op3;
                            elemento.pregunta1.includes('Grupales presenciales en diferentes lugares  (si estás en CBA)')? p1op4=1+p1op4:p1op4;
                            elemento.pregunta2.includes('En la mañana despues de las 9:00am')? p2op1=1+p2op1:p2op1;
                            elemento.pregunta2.includes('En la mañana despues de las 11:00 am')? p2op2=1+p2op2:p2op2;
                            elemento.pregunta2.includes('En la tarde despues de las 3:00pm')? p2op3=1+p2op3:p2op3;
                            elemento.pregunta2.includes('Otro horario')? p2op4=1+p2op4:p2op4; })
   console.log('DESPACHANDO');
      res.status(200).json( [{p1:[p1op1,p1op2,p1op3,p1op4]},{p2:[p2op1,p2op2,p2op3,p2op4]}] );
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

