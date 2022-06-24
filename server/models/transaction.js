import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["withdraw","transfer"],
    default: "withdraw",
  },
  user_id:{
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  withdrawalAmount:{
    type: String,
    required: true,
  }
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
});

export default mongoose.model("Transaction", transactionSchema);
