import { Schema, model, models } from 'mongoose'


const FormularioSchema = new Schema(
  {
       
    pregunta1: {
      type: String,
      
      },
    pregunta2: {
        type: String,
       },
   texto: {
    type: String,
      
     }
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Formulario = models.Formulario || model('Formulario', FormularioSchema)

export default Formulario
