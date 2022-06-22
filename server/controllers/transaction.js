import mongoose from "mongoose";
import Transaction from "../models/transaction.js";

export function createTransaction(req, res) {
  const transaction = new Transaction({
    _id: mongoose.Types.ObjectId(),
    createAt: new Date ,
    type: req.body.type,
    balance: req.body.balance,
    sender: req.body.sender,
    receiver: req.body.receiver,
    information: req.body.information,
    sender_balance: req.body.sender_balance,
    receiver_balance: req.body.receiver_balance,
    id: req.body.id,
  });

  return transaction
    .save()
    .then((newTransaction) => {
      return res.status(201).json({
        success: true,
        message: "New transaction created successfully",
        Transaction: newTransaction,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get all course
export function getAllTransaction(req, res) {
  Transaction.find()
    .select("_id title description")
    .then((allTransaction) => {
      return res.status(200).json({
        success: true,
        message: "A list of all transaction",
        Transaction: allTransaction,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

// get single course
export function getSingleTransaction(req, res) {
  const id = req.params.tranactionId;
  Transaction.findById(id)
    .then((singleTransaction) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleTransaction.title}`,
        Transaction: singleTransaction,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This transaction does not exist",
        error: err.message,
      });
    });
}

export function updateTransaction(req, res) {
  const id = req.params.tranactionId;
  const updateObject = req.body;
  Transaction.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Transaction is updated",
        updateTransaction: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
}

// delete a course
export function deleteTransaction(req, res) {
  const id = req.params.tranactionId;
  Transaction.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}
