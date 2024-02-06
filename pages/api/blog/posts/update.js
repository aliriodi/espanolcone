import dbConnect from '../../../../config/mongo'
import Posts from '../../../../models/Post'

/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse}  res 
 */


export default async function updateUsers(req, res) {

  try {
    //pasar por body 
    const { slug, updates } = req.body; 
    console.log('slug',slug)
  //  console.log('updates',updates)
    console.log('CONNECTING TO MONGO DB');
    //console.log(req.body)
    
    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('UPDATING POST');

    const result = await Posts.updateOne({slug:slug},{$set:updates})
    
    console.log('UPDATED DOCUMENT', result);
    console.log(updates)
    
   res.json({ message: 'POST actualizado con éxito',slug });

 //  res.json({ result })

  } catch (error) {
    console.log(error);
    res.json({ error })
  }
}
