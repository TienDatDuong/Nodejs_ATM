import mongoose from "mongoose";
import Account from "../models/accounts.js";

export function createAccount(req, res) {
  const account = new Account({
    _id: mongoose.Types.ObjectId(),
    createAt: new Date ,
    accName: req.body.accName,
    pin: req.body.pin,
    id: req.body.id,
    balance: req.body.balance,
    accPhone: req.body.accPhone,
    accNumber: req.body.accNumber,
  });

  return account
    .save()
    .then((newAccount) => {
      return res.status(201).json({
        success: true,
        message: "New account created successfully",
        Course: newAccount,
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
export function getAllAccount(req, res) {
  Account.find()
    .select("_id title description")
    .then((allAccount) => {
      return res.status(200).json({
        success: true,
        message: "A list of all account",
        Account: allAccount,
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
export function getSingleAccount(req, res) {
  const id = req.params.accountId;
  Account.findById(id)
    .then((singleAccount) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleAccount.title}`,
        Account: singleAccount,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This account does not exist",
        error: err.message,
      });
    });
}

export function updateAccount(req, res) {
  const id = req.params.accountId;
  const updateObject = req.body;
  Account.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Account is updated",
        updateAccount: updateObject,
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
export function deleteAccount(req, res) {
  const id = req.params.accountId;
  Account.findByIdAndRemove(id)
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
