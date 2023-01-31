import mongoose, { Schema } from "mongoose";

const BlocksSchema = new Schema({
  blockId: {
    type: Number
  },
  owner: {
    type: String
  },
  uri: {
    type: String
  }
})

const Blocks = mongoose.model('blocks', BlocksSchema)

export default Blocks