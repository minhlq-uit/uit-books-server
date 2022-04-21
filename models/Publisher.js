import mongoose from "mongoose";
const { Schema } = mongoose;

const schema = new Schema(
  {
    firstName: String,
    secondName: String,
  },
  {
    timestamps: true,
  }
);

export const Publisher = mongoose.model("Publisher", schema);
