import dbConnect from '../../../config/mongo'
import Users from '../../../models/Users'

// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse}  res 
//  */


export default async function getAllUsers(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');



    console.log('CREATING DOCUMENT');

    const users = await Users.find().exec();

    console.log('CREATED DOCUMENT');

    res.json({ users })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

