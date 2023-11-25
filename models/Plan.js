import { Schema, model, models } from 'mongoose'


const PlanSchema = new Schema(
  {
       
    type: {
      type: String,
      unique:true
      },
    qty: {
        type: Number,
       },
   ammountUnit: {
      type: Number,
      
     },
     
    items: {
        type: [{}],
    },
    description: {
        type: String,
    },
    obs: {
        type: String,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Plan = models.Plan || model('Plan', PlanSchema)

export default Plan
