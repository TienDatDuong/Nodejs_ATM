import express from "express";

import {
  createAccount,
  getAllAccount,
  getSingleAccount,
  updateAccount,
  deleteAccount,
  getBalance,
} from "../controllers/accounts.js";

import {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
  createWithdraw,
} from "../controllers/transaction.js";

const router = express.Router();

router.post("/accounts", createAccount);
router.get("/accounts", getAllAccount);
router.get("/accounts/:accountId", getSingleAccount);
router.patch("/accounts/:accountId", updateAccount);
router.delete("/accounts/:accountId", deleteAccount);

router.get("/accounts/:accountId/balance-inquiry", getBalance);

router.post("/accounts/:accountId/withdraw", createWithdraw);

router.post("/tranactions", createTransaction);
router.get("/tranactions", getAllTransaction);
router.get("/tranactions/:tranactionId", getSingleTransaction);
router.patch("/tranactions/:tranactionId", updateTransaction);
router.delete("/tranactions/:tranactionId", deleteTransaction);

export default router;
