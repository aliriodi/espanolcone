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
    validates: {
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
    content:{
      type: String,
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
      type: [{}]
      
    },
    classes: {
      type: [
        {
          level: String,
          units:[
            {
              number:Number,
              name:String,
              unitID:String,
              description: String,
              done:Boolean,
              enable:Boolean,
              points:Number,
              maxPoints:Number
            }
          ],
              
        }
      ],
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
    
    //Datos para Teacher
    
    hablante: {
      type: String
    },
    intro: {
      type: String
    },
    enfoquePedagogico: {
      type: String
    },
    puntos: {
      type: Array
    },
    
    despedida: {
      type: String
    },
    youtube: {
      type: String
    },
    plan:{
      type: [{}]
    }
    

  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Users = models.Users || model('Users', UserSchema)

export default Users
