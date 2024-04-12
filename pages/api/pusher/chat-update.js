import { pusher } from "../../../lib/index";

// presence channel handler
export default async function handler(req, res) {
  const { message, username, chatId } = req.body;
  
  // trigger a new post event via pusher
  await pusher.trigger(`presence-channel`, `chat-update`, {
    message,
    username,
    chatId
  });


  res.json({ status: 200 });
}
