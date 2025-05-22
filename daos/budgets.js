const mongoose = require('mongoose');

const Budget = require('../models/budget');
const Transaction = require('../models/transaction');

module.exports = {};

// createBudget - should create a category
module.exports.createBudget = async (budgetObj) => {
    try {
        const created = await Budget.create({...budgetObj});
        return created;
    } catch (error) {
        return res.sendStatus(401);
    } 
}

// getBudget - should return a budget by id
module.exports.getBudget = async (budgetId) => {
    try {
        // get all transactions for a specific budget using budgetId
        // for each transaction use the categoryId to determine if the transaction is an expense or income
        // for all expense get the sum which will be expTotal
        // for all income get the sum which will be incTotal
        // balance = incTotal - expTotal

        // const transactions = await Transaction.find({ budgetId: budgetId });

        const budget = await Budget.findOne({ _id: budgetId }).populate('transactions').lean();
        return budget;

        // return Budget.findOne({ _id: budgetId }).populate('transactions').lean();
    } catch (error) {
        return res.sendStatus(400);
    }
}

