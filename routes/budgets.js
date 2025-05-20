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
        res.json(budget);
        // if (budget) {
        //     res.json('success!');
        //   } else {
        //     res.sendStatus(404);
        //   }
        // const {title, transactions, balance, expTotal, incTotal} = budget;
        // res.send({title}, {transactions}, {balance}, {expTotal}, {incTotal});
        // res.send(title, transactions, balance, expTotal, incTotal);
        // res.json(budget.title, budget.transactions, budget.balance, budget.expTotal, budget.incTotal);
        // res.send(
        //     `title: ${title}, 
        //     transactions: ${transactions}, 
        //     balance: ${balance}, 
        //     expense total: ${expTotal}, 
        //     income total: ${incTotal}`
        // );
    } catch (error) {
        return res.sendStatus(400);
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