import { Schema, model, models } from 'mongoose'


const FormularioSchema = new Schema(
  {

    pregunta1: {
      type: String,

    },
    pregunta2: {
      type: String,
    },
    pregunta3: {
      type: String,

    },
    pregunta4: {
      type: String,

    },
    pregunta5: {
      type: String,

    },
    pregunta6: {
      type: String,

    },
    pregunta7: {
      type: String,

    },
    pregunta8: {
      type: String,

    },
    pregunta9: {
      type: String,

    },
    pregunta10: {
      type: String,

    },
    pregunta11: {
      type: String,

    },
    pregunta12: {
      type: String,

    },
    pregunta13: {
      type: String,

    },
    pregunta14: {
      type: String,

    },
    pregunta15: {
      type: String,

    },
    pregunta16: {
      type: String,

    },
    pregunta17: {
      type: String,

    },
    pregunta18: {
      type: String,

    },
    pregunta19: {
      type: String,

    },
    pregunta20: {
      type: String,

    },
    puntos:{
    type: Number,
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
