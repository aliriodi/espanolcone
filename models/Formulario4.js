import { Schema, model, models } from 'mongoose'
//viene de /Membresy

const FormularioSchema = new Schema(
  {

    pregunta1: {
      type: [],

    },
    country: {
      type: String,

    },
    city: {
      type: String,

    },
    texto: {
      type: String,
    },
    Name: {
      type: String,

    },
    Email: {
      type: String,

    },
    language: {
      type: String,

    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const Formulario = models.Formulario4 || model('Formulario4', FormularioSchema)

export default Formulario
