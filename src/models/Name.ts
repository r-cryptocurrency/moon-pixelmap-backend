import mongoose, { Schema } from "mongoose";

const NameSchema = new Schema({
  address: {
    type: String
  },
  match: {
    type: String
  },
  name: {
    type: String
  }
})

const Name = mongoose.model('name', NameSchema)

export default Name