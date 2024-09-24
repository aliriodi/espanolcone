import { Schema, model, models } from 'mongoose'


const FormularioSchema = new Schema(
  {

    pregunta1: {
      type: [],

    },
    pregunta2: {
      type: [],
    },
    pregunta3: {
      type: [],

    },
    pregunta4: {
      type: [],

    },
    pregunta5: {
      type: [],

    },
    pregunta6: {
      type: [],

    },
    pregunta7: {
      type: [],

    },
    pregunta8: {
      type: [],

    },
    pregunta9: {
      type: [],

    },
    pregunta10: {
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
const Formulario = models.Formulario2 || model('Formulario2', FormularioSchema)

export default Formulario
