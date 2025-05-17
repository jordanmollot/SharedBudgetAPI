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

