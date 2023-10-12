import { Schema, model, models } from 'mongoose'


const typeElementSchema = new Schema(
  {
    typeelement: {
      type: String,
      unique:true
    },
   

  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const typeElement  = models.typeElement || model('typeElement', typeElementSchema )

export default typeElement
