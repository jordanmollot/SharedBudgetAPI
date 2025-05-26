const { Router } = require("express");
const router = Router();
const transactionsDAO = require('../daos/transactions');
const budgetsDAO = require('../daos/budgets');

// POST / - Create a transaction
router.post("/", async (req, res, next) => {
    const transactionObj = req.body;
    // const {budgetId} = req.params;
    const budgetId = req.body.budgetId;
    try {
        // const newTranscation = await transactionsDAO.createTransaction(transactionObj, budgetId);
        const newTranscation = await transactionsDAO.createTransaction(transactionObj);
        await budgetsDAO.getTotals(budgetId);
        res.json(newTranscation);
    } catch (error) {
        return res.sendStatus(401);
    }
});

// GET /:id - Should return specified transaction
router.get("/:id", async (req, res, next) => {
    const transactionId = req.params.id;
    try {
        // console.log(transactionId);
        const transaction = await transactionsDAO.getTransaction(transactionId);
        if (transaction) {
            res.json(transaction);
            } else {
            res.sendStatus(404);
            }
    } catch (error) {
        return res.sendStatus(400);
    }
});

// GET /:budgetId - Should return all transactions for a specified budget
router.get("/:budgetId", async (req, res, next) => {
    const budgetId = req.params.budgetId;
    try {
        // console.log(budgetId);
        const budget = await transactionsDAO.getTransactions(budgetId);
        if (budget) {
            res.json(budget);
            } else {
            res.sendStatus(404);
            }
    } catch (error) {
        return res.sendStatus(400);
    }
});

// PUT /:id - Should update specified transaction
router.put("/:id", async (req, res, next) => {
    const transactionId = req.params.id;
    const updatedTransaction = req.body;
    // const budgetId = req.body.budgetId;
    if (!updatedTransaction || JSON.stringify(updatedTransaction) === '{}' ) {
      res.status(400).send('transaction details are required"');
    } else {
      try {
        const budgetId = await transactionsDAO.getBudgetId(transactionId);
        const success = await transactionsDAO.updateTransaction(transactionId, updatedTransaction);
        // if (success) {
        await budgetsDAO.getTotals(budgetId);
        res.sendStatus(success ? 200 : 400);  
        // }
      } catch (error) {
        return res.sendStatus(400);
      }
    }
});

// DELETE /:id - Should delete specified transaction
router.delete("/:id", async (req, res, next) => {
    const transactionId = req.params.id;
    try {
        const budgetId = await transactionsDAO.getBudgetId(transactionId);
        const success = await transactionsDAO.deleteTransaction(transactionId);
        await budgetsDAO.getTotals(budgetId);
        res.sendStatus(success ? 200 : 400);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;