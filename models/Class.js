import { Schema, model, models } from 'mongoose'


const ClassSchema = new Schema(
  {
    // id: {
    //   type: mongoose.Types.ObjectId,
    // },
   name: {
      type: String,
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
