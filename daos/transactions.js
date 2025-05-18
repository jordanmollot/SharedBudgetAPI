const mongoose = require('mongoose');

const Transaction = require('../models/transaction');
const Budget = require('../models/budget');
const transaction = require('../models/transaction');

module.exports = {};

// createTransaction - should create a transaction
module.exports.createTransaction = async (transactionObj, budgetId) => {
    try {
        const created = await Transaction.create({...transactionObj, budgetId: budgetId});
        const transactionId = created._id;
        const updateBudget = await Budget.findOneAndUpdate(
            { _id: budgetId },
            { $addToSet: { transactions: transactionId } }
        );
        // console.log(updateBudget);
        // console.log(created);
        return created;
        // return res.send("test");
    } catch (error) {
        return res.sendStatus(401);
    } 
}

