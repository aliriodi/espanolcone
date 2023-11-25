import dbConnect from '../../../config/mongo'
import Plan from '../../../models/Plan'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addPlans(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('CREATING DOCUMENT');

    const plan = await Plan.create(req.body)

    console.log('CREATED DOCUMENT', plan);

    res.json({ plan })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
