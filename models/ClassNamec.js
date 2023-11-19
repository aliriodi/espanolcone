import { Schema, model, models } from 'mongoose'


const classNameCSchema = new Schema(
  {
    classnamec: {
      type: {},
      unique:true
    },
   
  },
  {
    timestamps: true,
    versionKey: false,
  },
)


const classnamec  = models.classnamec || model('classnamec', classNameCSchema )

export default classnamec
