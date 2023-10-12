import dbConnect from '../../../config/mongo'
import Users from '../../../models/Users'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function updateUsers(req, res) {

  try {
    //pasar por body 
    const { email, updates } = req.body; 
  //  console.log('email',email)
  //  console.log('updates',updates)
    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('UPDATING DOCUMENT');

    const result = await Users.updateOne({email:email},{$set:updates })

   // console.log('UPDATED DOCUMENT', result);
    
   res.json({ message: 'Usuario actualizado con éxito' });

 //  res.json({ result })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
