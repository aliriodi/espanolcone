import { Schema, model, models } from 'mongoose'


const ChatSchema = new Schema(
  {
    usersIDs:{
      type: [
        String
      ]
    },
    
    messages:{
      type: [
        {
          userID: String,
          messages: String,
          budget:{
            amount: Number,
            wasPayed: Boolean
          }      
        }
      ]
    },
    
    requests:{
      type: String
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Chat = models.Chat || model('Chat', ChatSchema)

export default Chat
