import { Schema, model, models } from 'mongoose'


const ReceiptSchema = new Schema(
  {
       
    idUser: {
      type: String,
      },
    idPlan: {
        type: String,
       },
   qty: {
      type: Number,
      
     },
    ammount: {
        type: Number,
    },
    dates:{
      type: {}
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Receipt = models.Receipt || model('Receipt', ReceiptSchema)

export default Receipt
