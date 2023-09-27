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

    res.json({ class1 })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

