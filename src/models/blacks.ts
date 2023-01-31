import mongoose, { Schema } from "mongoose";

const BlacksSchema = new Schema({
  blockId: {
    type: Number
  }
})

const Blacks = mongoose.model('blacks', BlacksSchema)

export default Blacks