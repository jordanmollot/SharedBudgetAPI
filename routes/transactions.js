const { Router } = require("express");
const router = Router();
const transactionsDAO = require('../daos/transactions');

// POST / - Create a transaction
router.post("/", async (req, res, next) => {
    const transactionObj = req.body;
    // const {budgetId} = req.params;
    try {
        // const newTranscation = await transactionsDAO.createTransaction(transactionObj, budgetId);
        const newTranscation = await transactionsDAO.createTransaction(transactionObj);
        res.json(newTranscation);
    } catch (error) {
        return res.sendStatus(401);
    }
});

// GET /:budgetId - Should return all transactions for a specific budget
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

module.exports = router;