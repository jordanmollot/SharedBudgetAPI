const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const budgetsDAO = require('../daos/budgets');
const transactionsDAO = require('../daos/transactions');

// authorization middleware
const isAuthorized = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, 'secret');
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// POST / - Create a budget
router.post("/", async (req, res, next) => {
    const budgetObj = req.body;
    // const userId = req.user._id;
    // console.log(budgetObj.userId);
    
    if (!budgetObj.budgetTitle || JSON.stringify(budgetObj.budgetTitle) === '{}' ) {
        res.status(400).send('userId is required');
    } else {
        try {
            const newBudget = await budgetsDAO.createBudget(budgetObj);
            res.json(newBudget);
        } catch (error) {
            return res.sendStatus(401);
        }
    }
});

// GET /:id - Should return specified budget (all budget details, all budget transaction details and each transaction's category details)
router.get('/:id', isAuthorized, async (req, res, next) => {
// router.get('/:id', async (req, res, next) => {
    const budgetId = req.params.id;
    const userId = req.user._id;
    // console.log(userId);
    // console.log(budgetId);
    try {
        const authorizedUser = await budgetsDAO.authorizedUser(userId, budgetId);
        // console.log(authorizedUser);
        const totals = await budgetsDAO.getTotals(budgetId);
        if (authorizedUser && totals) {
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
router.get("/:id/filter", isAuthorized, async (req, res, next) => {
    const budgetId = req.params.id;
    const incOrExp = req.body.incOrExp;
    const category = req.body.title;
    const userId = req.user._id;
    try {
        // console.log(budgetId);
        // console.log(filter);
        const authorizedUser = await budgetsDAO.authorizedUser(userId, budgetId);
        console.log(authorizedUser);
        const filteredTransactions = await transactionsDAO.getFilteredTransactions(budgetId, incOrExp, category);
        if (authorizedUser && filteredTransactions) {
            res.json(filteredTransactions);
            } else {
            res.sendStatus(404);
            }
    } catch (error) {
        return res.sendStatus(400);
    }
});

module.exports = router;