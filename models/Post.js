import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new Schema(
  {
    title: {
      type: String,
    },
    type_of: {
      type: String,
    },

    description: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    comments_count: {
      type: Number,
    },
    public_rections_counts: {
      type: Number,
    },
    positive_reactions_count: {
      type: Number,
    },
    cover_image: {
      type: String,
    },
    social_image: {
      type: String,
    },
    published_at: {
      type: String,
    },
    last_comment_at: {
      type: String,
    },
    es: {
      type: {},
    },
    en: {
      type: {},
    },
    pt: {
      type: {},
    },
    user: {
      type: {},
    },
    reviews: [ReviewSchema],
    publish: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const post = models.post || model("post", PostSchema);

export default post;
