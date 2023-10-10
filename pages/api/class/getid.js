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
    res.json({ class1 })
  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

