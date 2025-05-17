const mongoose = require('mongoose');

const Transaction = require('../models/transaction');

module.exports = {};

// createTransaction - should create a transaction
module.exports.createTransaction = async (transactionObj) => {
    try {
        const created = await Transaction.create({...transactionObj});
        return created;
        // return res.send("test");
    } catch (error) {
        return res.sendStatus(401);
    } 
}

