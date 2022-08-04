import mongoose from "mongoose";
import Transaction from "../models/transaction.js";
import Account from "../models/accounts.js";
import Transfer from "../models/transfer.js";

export function createTransaction(req, res) {
  const transaction = new Transaction({
    type: req.body.transaction,
    sender: req.body.sender,
    receiver: req.body.receiver,
    information: req.body.information,
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

export async function createWithdraw(req, res) {
  try {
    const createdTransaction = await Transaction.create({
      accNumber: req.body.accNumber,
      transactionType: req.body.transactionType,
      amount: req.body.amount,
    });
    const updatedBalance = await Account.findByIdAndUpdate(req.body.accNumber, {
      $inc: { balance: -req.body.amount },
    });
    return res.status(201).json({ createdTransaction });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}

export async function createTransfer(req, res) {
  try {
    const createTransfer = await Transaction.create({
      type: req.body.type,
      accNumber: req.body.accNumber,
      accNumberReceived: req.body.accNumberReceived,
      amount: req.body.amount,
      information: req.body.information,
    });
    const updateSender_id = await Account.findByIdAndUpdate(
      req.body.accNumber,
      {
        $inc: { balance: -req.body.amount },
      }
    );
    const updateReceiver_id = await Transfer.findByIdAndUpdate(
      req.body.accNumberReceived,
      {
        $inc: { balance: +req.body.amount },
      }
    );
    return res.status(201).json(createTransfer);
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
}

// Get all course
export function getAllTransaction(req, res) {
  Transaction.find()
    .select("type accNumber accNumberReceived amount information  ")
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
