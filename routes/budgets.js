const { Router } = require("express");
const router = Router();
const budgetsDAO = require('../daos/budgets');
const transactionsDAO = require('../daos/transactions');

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

router.get('/:budgetId', async (req, res, next) => {
    const {budgetId} = req.params;
    try {
        // console.log(budgetId);
        const budget = await budgetsDAO.getBudget(budgetId);
        res.json(budget);
    } catch (error) {
        return res.sendStatus(401);
    }
});

// POST /transactions - Create a transaction
router.post("/:budgetId/transactions", async (req, res, next) => {
    const transactionObj = req.body;
    const {budgetId} = req.params;
    try {
        const newTranscation = await transactionsDAO.createTransaction(transactionObj, budgetId);
        res.json(newTranscation);
    } catch (error) {
        return res.sendStatus(401);
    }
});

// router.get('/budgetId/transactions', (req, res) => {
//     res.send([{transaction: 'transaction 1'}]);
// });

module.exports = router;