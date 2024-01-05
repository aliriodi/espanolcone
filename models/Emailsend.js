import { Schema, model, models } from 'mongoose'


const emailsendSchema = new Schema(
  {
    email: {
      type: String,
      unique:true
    },
    suscribe : {
        type:Boolean
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
)


const emailsend  = models.emailsend || model('emailsend', emailsendSchema )

export default emailsend
