const mongoose = require('mongoose');

const Budget = require('../models/budget');

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
        const budget = await Budget.findOne({ _id: budgetId }).lean();
        return budget;
    } catch (error) {
        return res.sendStatus(401);
    }
}

