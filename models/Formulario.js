import { Schema, model, models } from 'mongoose'


const FormularioSchema = new Schema(
  {

    pregunta1: {
      type: [],

    },
    pregunta2: {
      type: [],
    },
    texto: {
      type: String,
    },
    Name: {
      type: String,

    },
    Email: {
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
