import dbConnect from '../../../config/mongo'
import Emailsend from '../../../models/Emailsend'

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
    console.log(req.body)
    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('UPDATING DOCUMENT');

    const result = await Emailsend.updateOne({email:email},{$set:updates })
    
   // console.log('UPDATED DOCUMENT', result);
    
   res.json({ message: 'Email valor actualizado con éxito',email });

 //  res.json({ result })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
