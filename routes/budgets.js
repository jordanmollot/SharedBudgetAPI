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

module.exports = router;