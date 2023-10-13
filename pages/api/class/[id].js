// pages/api/products/[id].js
import dbConnect from '../../../config/mongo'
import Class from '../../../models/Class'


export default async function Idclass(req, res) {
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

        const class1 = await Class.findById({_id:id});

        if (!class1) {
          return res.status(404).json({ message: 'Class not found' });
        }

        return res.status(200).json({class1});
      } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    default:
      return res.status(405).json({ message: `Method ${method} not allowed` });
  }
};
