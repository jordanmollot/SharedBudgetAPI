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

// GET /:id - Should return specified budget (all budget details, all budget transaction details and each transaction's category details)
router.get('/:id', async (req, res, next) => {
    const budgetId = req.params.id;
    try {
        // console.log(budgetId);
        const totals = await budgetsDAO.getTotals(budgetId);
        if (totals) {
            const budget = await budgetsDAO.getBudget(budgetId);
            res.json(budget);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        return res.sendStatus(400);
    }
});

// GET /:id/filter - Should return filtered transactions for specified budget 
// (filters transacactions by either category, income or expense)
router.get("/:id/filter", async (req, res, next) => {
    const budgetId = req.params.id;
    const incOrExp = req.body.incOrExp;
    const category = req.body.title;
    try {
        // console.log(budgetId);
        // console.log(filter);
        const filteredTransactions = await transactionsDAO.getFilteredTransactions(budgetId, incOrExp, category);
        if (filteredTransactions) {
            res.json(filteredTransactions);
            } else {
            res.sendStatus(404);
            }
    } catch (error) {
        return res.sendStatus(400);
    }
});

module.exports = router;