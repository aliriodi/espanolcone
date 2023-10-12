import { Schema, model, models } from 'mongoose'


const templateSchema = new Schema(
  {
    template: {
      type:String,
      unique:true
    },
    },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const template  = models.template || model('template',templateSchema )

export default template
