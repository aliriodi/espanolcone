import dbConnect from '../../../config/mongo'
import Emailsend from '../../../models/Emailsend'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addEmail(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('CREATING EMAIL');

    const email = await Emailsend.create(req.body)

    console.log('CREATED EMAIL', email);

    res.json({ email })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
