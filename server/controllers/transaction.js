import mongoose from "mongoose";
import Transaction from "../models/transaction.js";
import Account from "../models/accounts.js";
export function createTransaction(req, res) {
  const transaction = new Transaction({
    type: req.body.transaction,
    sender: req.body.sender,
    receiver: req.body.receiver,
    information: req.body.information,
    // balance: req.body.balance,
    // sender_balance: req.body.sender_balance,
    // receiver_balance: req.body.receiver_balance,
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
  // create transaction
  // const transaction = new Transaction({
  //   balance: req.body.balance,
  //   requsted_balance: req.body.requsted_balance,
  //   type: req.body.type,
  // });

  // const id = req.params.accountId;
  // const updateObject = (req.body = {
  //   balance: req.body.balance - req.body.requsted_balance,
  // });
  // const a = Account.update({ _id: id }, { $set: updateObject });
  // console.log(111, a);
  // Account.find(id);
  try {
    const createdTransaction = await Transaction.create({
      transactionType: req.body.transactionType,
      balance: req.body.balance,
      withdrawalAmount: req.body.withdrawalAmount,
      user_id: req.body.user_id,
      // sender: req.body.sender,
      // receiver: req.body.receiver,
      // information: req.body.information,
      // amount: req.body.amount,
    });
    const updatedBalance = await Account.findByIdAndUpdate(req.body.user_id, {
      $inc: { balance: -req.body.withdrawalAmount },
    });
    // inc : tăng số âm để giảm đi
    return res.status(201).json({ createdTransaction, updatedBalance });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }

  // return transaction
  //   .save()
  //   .then((newTransaction) => {
  //     return res.status(201).json({
  //       success: true,
  //       message: "New transaction created successfully",
  //       Transaction: newTransaction,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).json({
  //       success: false,
  //       message: "Server error. Please try again.",
  //       error: error.message,
  //     });
  //   });
}

// Get all course
export function getAllTransaction(req, res) {
  Transaction.find()
    .select(
      "_id type createdAt amount sender receiver information sender_amount receiver_amount id "
    )
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
