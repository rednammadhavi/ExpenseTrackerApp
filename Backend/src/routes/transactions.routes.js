import express from 'express';
import {
    addTransactionController,
    deleteTransactionController,
    getAllTransactionController,
    updateTransactionController
} from '../controllers/transaction.controller.js';

const router = express.Router();

router.route("/addTransaction").post(addTransactionController);

router.route("/getTransaction").post(getAllTransactionController);

router.route("/deleteTransaction/:id").post(deleteTransactionController);

router.route('/updateTransaction/:id').put(updateTransactionController);

export { router };