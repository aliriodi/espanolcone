import { Schema, model, models } from 'mongoose'


const UlessonSchema = new Schema(
  {
    level: {
      type: String,
    },
    topics: {
      type: String,
    },
    formats: {
      type: ["articulo", "libro", "leccion", "video", "letra", "podcast"],
      default: "articulo",
    },
    description: {
      type: String,
      unique: true
    },
    sheets: {
      type: [Object],
    },
    tags: {
      type: [String],
    },
    pay: {
      type: Boolean
    },
    image:{
      type: String,
    },
    inReview:{
      type: Boolean
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Ulesson = models.Ulesson || model('Ulesson', UlessonSchema)

export default Ulesson
