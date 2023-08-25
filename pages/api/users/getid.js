import dbConnect from '../../../config/mongo'
import Users from '../../../models/Users'
import Passwords from '../../../models/Passwords'

// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse}  res 
//  */


export default async function getAllUsers(req, res) {

  try {
    // const { first_name, last_name, email } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');
    
    //console.log(req.query)

    console.log('CREATING DOCUMENT');
    const passwords = await Passwords.findOne({ email: req.query.email }).exec();
    
    //console.log(users.password)
    console.log('CREATED DOCUMENT');
    if(passwords.password===req.query.password){
      const users = await Users.findOne({ email: req.query.email }).exec();
      res.json({ users })}
    else{
        res.json( {text:"Password Invalido"} )}
      } catch (error) {
    console.log(error);
    res.json({ error })
  }
}

