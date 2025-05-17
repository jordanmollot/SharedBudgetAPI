const { Router } = require("express");
const router = Router();
const budgetsDAO = require('../daos/budgets');
const transactionsDAO = require('../daos/transactions');

// router.get('/', (req, res) => {
//     res.send([{budget: 'budget 1'}]);
// });

// POST / - Create a budget
router.post("/", async (req, res, next) => {
    const budgetObj = req.body;
    try {
        const newBudget = await budgetsDAO.createBudget(budgetObj);
        res.json(newBudget);
    } catch (error) {
        return res.sendStatus(401);
    }
});

// router.get('/transactions', (req, res) => {
//     res.send([{transaction: 'transaction 1'}]);
// });

// POST /transactions - Create a transaction
router.post("/transactions", async (req, res, next) => {
    const transactionObj = req.body;
    try {
        const newTranscation = await transactionsDAO.createTransaction(transactionObj);
        res.json(newTranscation);
    } catch (error) {
        return res.sendStatus(401);
    }
});

module.exports = router;