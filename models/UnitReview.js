import { Schema, model, models } from 'mongoose'


const UnitReviewSchema = new Schema(
  {
       
    user_ID: {
        type: String,
    },
       
    user_first_name: {
        type: String,
    },

    user_last_name: {
        type: String,
    },

    user_email: {
        type: String
    },

    user_picture:{
        type: String,
    },

    unit_ID:{
        type: String,
    },

    unit_number:{
        type: String,
    },

    level:{
        type: String,
    },

    score: {
        type:Number,
    },

    comment: {
        type:String,
    },

  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// error poco frectuente de versionado de modelos por eso etsa esto, pero revisar si puedo armarlo como lo anterior
const UnitReview = models.UnitReview || model('UnitReview', UnitReviewSchema)

export default UnitReview
