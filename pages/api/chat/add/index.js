import axios from 'axios';
import dbConnect from '../../../../config/mongo'
import Chat from '../../../../models/Chat'
import Users from '../../../../models/Users'

export default async function addChat(req, res) {

  try {
    const { usersIDs, requests } = req.body;

    console.log('CONNECTING TO MONGO DB');

    await dbConnect()

    console.log('CONNECTED TO MONGO DB');

    console.log('CREATING DOCUMENT');

    let allUser = await Users.find({ _id: { $in: usersIDs } });
    
    if(!allUser) return
    const newChat = await Chat.create({ usersIDs, requests })

    // En caso de un chat individual
    allUser = allUser.map(async (user, index)=>{

      user.chats = [
        ...user?.chats,
        {
          chatName: `${allUser[index == 0 ? 1 : 0].first_name ? allUser[index == 0 ? 1 : 0].first_name : ""} ${allUser[index == 0 ? 1 : 0].last_name ? allUser[index == 0 ? 1 : 0].last_name : ""}`,

          chatID: newChat.id,
          
          userID: allUser[index == 0 ? 1 : 0].id
        }
      ]

      const result = await Users.updateOne({ email: user.email },{ $set: user })
  
      return result
    })

    return res.status(200).json({allUser});

  } catch (error) {

    console.log(error);
    res.json({ error })

  }
}
