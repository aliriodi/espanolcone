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
    phone1: {
      type: String,
    },
    phone2: {
      type: String,
    },
    validate: {
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
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    aux: {
      type: Object,
    },
    test: {
      type: Object,
    },
    biblioteca: {
      type: Object,
    },
    role: {  //opcional para uso nuestro
      type: ["user", "admin", "student", "invitado", "guide", "banned", "teacher"],
      default: "user",
    },
    calendar: {  //opcional para uso nuestro
      type: ["fecha", "hora", "prof_name"],
      default: "user",
    },
    classes: {
      type: [{id: String,
              level: String,
              unit: String ,
              description:String}],
    },
    position: {
      type:{
            id:    String,
            index:   Number,
            maxpages: Number
          },
    },
    guide: {
      type: String,
    },
    language: {
      type: String,
    },
  
    plan: {
      name: {
        type: String
      },
      cost: {
        type: Number
      },//costo del plan
      features: {
        type: [Object]
      },
    },
    test: {
      name: {
        type: String
      },
      test: {
        type: [Object]
      },
      type: {
        type: [String],
      },
    },
    password: {
      type: String
    },

  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Users = models.Users || model('Users', UserSchema)

export default Users
