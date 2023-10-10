import { Schema, model, models } from 'mongoose'


const ClassSchema = new Schema(
  {
    // id: {
    //   type: mongoose.Types.ObjectId,
    // },
    
    level: {
      type: String,
      },
    unit: {
        type: String,
       },
   description: {
      type: String,
      unique:true
     },
    sheets: {
      type: [Object],
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Class = models.Class || model('Class', ClassSchema)

export default Class
