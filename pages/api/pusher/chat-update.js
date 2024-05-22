import axios from "axios";
import { pusher } from "../../../lib/index";

// presence channel handler
export default async function handler(req, res) {
  const { messages, userID, chatId, budget } = req.body;
  
  // trigger a new post event via pusher
  await pusher.trigger(`presence-channel`, `chat-update`, {
    messages,
    userID,
    chatId,
    budget
  });

  res.json({ status: 200 });
  // try {
    
  //   await axios.post(`/api/chat/add/message/${chatId}`,{})
  //   // console.log(response.data); // Manejar la respuesta según sea necesario
  // } catch (error) {
  //   console.error(error);
  // }
}
