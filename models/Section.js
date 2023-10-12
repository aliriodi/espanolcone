import { Schema, model, models } from 'mongoose'


const sectionSchema = new Schema(
  {
    section: {
      type: {index:Number,
            
             value:String},
      unique:true,
      _id:false,
          
    },

  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const section  = models.section || model('section', sectionSchema )

export default section
