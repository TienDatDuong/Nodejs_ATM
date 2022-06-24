import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const accountSchema = new mongoose.Schema({
  accName: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  accPhone: {
    type: String,
    required: true,
  },
  accNumber: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Account", accountSchema);
