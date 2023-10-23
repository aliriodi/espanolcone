
import dbConnect from '../../../config/mongo'
import User from '../../../models/Users'


export default async function IdUser(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {

        console.log('CONNECTING TO MONGO DB');

        await dbConnect()
    
        console.log('CONNECTED TO MONGO DB');

        const userid = await User.findById({_id:id});

        if (!userid) {
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({userid});
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    default:
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
};
