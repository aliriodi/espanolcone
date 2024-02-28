import dbConnect from '../../../config/mongo'
import Ulessons from '../../../models/Ulessons'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addUlesson(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('CREATING DOCUMENT');
   // console.log(req.body)
    const ulessons = await Ulessons.create(req.body)

    console.log('CREATED DOCUMENT', ulessons);

    res.json({ ulessons })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
