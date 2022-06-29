import mongoose from "mongoose";
import Account from "../models/accounts.js";

export function createAccount(req, res) {
  const account = new Account({
    accName: req.body.accName,
    pin: req.body.pin,
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
        account: newAccount,
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
export async function getAllAccount(req, res) {
  const result = await Account.find()
    .select("_id createdAt accName balance id accPhone accNumber pin ")
    .then((accounts) => {
      res.status(200).json({
        success: true,
        message: "A list of all account",
        accounts,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
  return result;
}

// get single course
export function getSingleAccount(req, res) {
  const id = req.params.accountId;
  Account.findById(id)
    .select("_id createdAt accName id accPhone accNumber ")
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

export function getPin(req, res) {
  const id = req.params.accountId;
  Account.findById(id)
    .select("pin")
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

export function updatePin(req, res) {
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

export function getBalance(req, res) {
  const id = req.params.accountId;
  Account.findById(id)
    .select("balance")
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
