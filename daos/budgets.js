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
        // console.log(budgetId);
        const budget = await Budget.findOne({ _id: budgetId }).populate('transactions');
        // const budget = await Budget.findOne({ _id: budgetId }).lean();
        // console.log(budget.transactions);
        return budget;
        // return Budget.findOne({ _id: budgetId }).populate('transactions').lean();
        // return Budget.findOne({ _id: budgetId }).lean();
    } catch (error) {
        return res.sendStatus(400);
    }
}

