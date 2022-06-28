import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const transferSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["withdraw", "transfer"],
  },
  sender_id: {
    type: String,
    require: true,
  },
  receiver_id: {
    type: String,
    require: true,
  },
  transfer_amount: {
    type: Number,
    required: true,
  },
  information: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Transfer", transferSchema);
