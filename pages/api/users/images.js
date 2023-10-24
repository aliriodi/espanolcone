import dbConnect from '../../../config/mongo';
import Users from '../../../models/Users';

export default async function getUsersWithImage(req, res) {
  try {
    console.log('CONNECTING TO MONGO DB');
    await dbConnect();
    console.log('CONNECTED TO MONGO DB');

    console.log('QUERYING DATABASE FOR USERS WITH IMAGE');

    // Utiliza el método .find() de Mongoose con una consulta que verifica si el campo 'image' no es igual a null
    const usersWithImage = await Users.find({ image: { $ne: null } }).exec();

    console.log('RETRIEVED USERS WITH IMAGE');

    res.json({ usersWithImage });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}


