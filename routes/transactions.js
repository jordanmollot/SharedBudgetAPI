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
    if (!updatedTransaction || JSON.stringify(updatedTransaction) === '{}' ) {
      res.status(400).send('transaction details are required"');
    } else {
      try {
        const success = await transactionsDAO.updateTransaction(transactionId, updatedTransaction);
        res.sendStatus(success ? 200 : 400); 
      } catch (error) {
        return res.sendStatus(400);
      }
    }
});

// DELETE /:id - Should delete specified transaction
router.delete("/:id", async (req, res, next) => {
    const transactionId = req.params.id;
    try {
      const success = await transactionsDAO.deleteTransaction(transactionId);
      res.sendStatus(success ? 200 : 400);
    } catch(e) {
      res.status(500).send(e.message);
    }
  });
module.exports = router;