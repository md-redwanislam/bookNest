import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },

    coverImage: {
      type: String,
    },
    category: {
      type: String,
    },

    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

dataSchema.index({ title: 1 }, { unique: true });

export const BookModel = mongoose.model("books", dataSchema);
