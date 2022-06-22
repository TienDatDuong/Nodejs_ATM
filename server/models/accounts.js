import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const accountSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date,  default: Date.now },
  accName: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
  },
  id: {
    type: String,
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
