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



    console.log('LOOKING TEACHERS');

    const teachers = await Users.find({ role: 'teacher' }).exec();

    console.log('TEACHERS FOUND');

    res.json({ teachers })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

