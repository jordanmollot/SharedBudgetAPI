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
    const budgetId = req.params.budgetId;
    try {
        // console.log(budgetId);
        const budget = await budgetsDAO.getBudget(budgetId);
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