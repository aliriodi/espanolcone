import dbConnect from '../../../../config/mongo'
import UnitReview from '../../../../models/UnitReview'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addUnitReview(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('CREATING DOCUMENT');
   // console.log(req.body)
    const review = await UnitReview.create(req.body)

    console.log('CREATED DOCUMENT', review);

    res.json({ review })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
