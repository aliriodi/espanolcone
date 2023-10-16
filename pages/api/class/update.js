import dbConnect from '../../../config/mongo'
import Class from '../../../models/Class'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addClass(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;
    const _id = req.body._id;
    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('UPDATING DOCUMENT');
   // console.log(req.body)
   const class1 = await Class.findOneAndUpdate({ _id: _id }, req.body, { new: false })
   // const class1 = Class.findByIdAndUpdate(_id, req.body, { new: true });
    console.log('UPDTATED DOCUMENT', class1);

    res.json({ class1 })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
