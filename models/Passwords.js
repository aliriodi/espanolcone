import { Schema, model, models } from 'mongoose'


const PasswordsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false
    }

  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Passwords = models.Passwords || model('Passwords', PasswordsSchema)

export default Passwords
