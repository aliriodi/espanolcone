import { Schema, model, models } from 'mongoose'


const UserSchema = new Schema(
  {
    // id: {
    //   type: mongoose.Types.ObjectId,
    // },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    rol: {       //opcional para uso nuestro
      type: String,
    },
    phone1: {
      type: String,
    },
    phone2: {
      type: String,
    },
    postcode: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false
    },
    // image: {
    //   type: Object,
    // },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    image2: {
      type: String,
    },
    aux: {
      type: Object,
    },
    aux2:{
      type: Object,
    },
    role: {  //opcional para uso nuestro
      type: ["user", "admin","guide","banned","teacher"],
   //   default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Users = models.Users || model('Users', UserSchema)

export default Users
