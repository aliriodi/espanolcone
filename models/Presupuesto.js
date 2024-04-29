import { Schema, model, models } from 'mongoose'


const PresupuestoSchema = new Schema(
  {
       
    idUser: {
      type: String,
      },
    idGuide:{
        type: String,
      },
    item: {
        type: [],
       },
       paid:   {
        type: Boolean,
        default:false
       },
       validado:{
        type: Boolean,
        default:false
       },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Presupuesto = models.Presupuesto || model('Presupuesto', PresupuestoSchema)

export default Presupuesto
