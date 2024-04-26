import dbConnect from '../../../config/mongo'
import Formulario from '../../../models/Formulario'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addForm(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('CREATING DOCUMENT');

    const form = await Formulario.create(req.body)

    console.log('CREATED DOCUMENT', form);

    res.json({ form })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
