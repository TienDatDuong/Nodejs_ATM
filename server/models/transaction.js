import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["withdraw", "transfer"],
    default: "withdraw",
  },
  accNumber: {
    type: String,
    required: true,
  },
  accNumberReceived: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  information: {
    type: String,
  },
});

export default mongoose.model("Transaction", transactionSchema);
