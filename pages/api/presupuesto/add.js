import dbConnect from '../../../config/mongo'
import Presupuesto from '../../../models/Presupuesto'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addReceipt(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('CREATING DOCUMENT');

    const presupuesto = await Presupuesto.create(req.body)

    console.log('CREATED DOCUMENT', presupuesto);
    console.log('CREATED DOCUMENT');

    res.json({ presupuesto })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
