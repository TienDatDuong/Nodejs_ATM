import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const transactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String,
    required: true,
  },
  // createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  requsted_balance: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
  },
  // sender: {
  //   type: String,
  //   required: true,
  // },
  // receiver: {
  //   type: String,
  //   required: true,
  // },
  // information: {
  //   type: String,
  //   required: true,
  // },
  // sender_balance: {
  //   type: String,
  //   required: true,
  // },
  // receiver_balance: {
  //   type: String,
  //   required: true,
  // },
  // id: {
  //   type: String,
  //   required: true,
  // },
});

export default mongoose.model("Transaction", transactionSchema);
