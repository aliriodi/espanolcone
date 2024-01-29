import dbConnect from '../../../../config/mongo'
import Post from '../../../../models/Post'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function addUsers(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('CREATING DOCUMENT POST');

    const post = await Post.create(req.body)

    console.log('CREATED DOCUMENT POST', post);

    res.json({ post })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
