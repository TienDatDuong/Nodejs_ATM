import express from "express";
import {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.js";

import {
  createAccount,
  getAllAccount,
  getSingleAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/account.js";

import {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.js";

const router = express.Router();

router.post("/accounts", createAccount);
router.get("/accounts", getAllAccount);
router.get("/accounts/:accountId", getSingleAccount);
router.patch("/accounts/:accountId", updateAccount);
router.delete("/accounts/:accountId", deleteAccount);

router.post("/tranactions", createTransaction);
router.get("/tranactions", getAllTransaction);
router.get("/tranactions/:tranactionId", getSingleTransaction);
router.patch("/tranactions/:tranactionId", updateTransaction);
router.delete("/tranactions/:tranactionId", deleteTransaction);

router.post("/courses", createCourse);
router.get("/courses", getAllCourse);
router.get("/courses/:courseId", getSingleCourse);
router.patch("/courses/:courseId", updateCourse);
router.delete("/courses/:courseId", deleteCourse);

export default router;
