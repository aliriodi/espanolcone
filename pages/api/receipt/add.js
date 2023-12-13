import dbConnect from '../../../config/mongo'
import Receipt from '../../../models/Receipt'

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

    const receipt = await Receipt.create(req.body)

    console.log('CREATED DOCUMENT', receipt);
    console.log('CREATED DOCUMENT');

    res.json({ receipt })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
