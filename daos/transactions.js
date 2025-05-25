const mongoose = require('mongoose');

const Transaction = require('../models/transaction');
const Budget = require('../models/budget');
const transaction = require('../models/transaction');

module.exports = {};

// createTransaction - should create a transaction
module.exports.createTransaction = async (transactionObj) => {
    try {
        // const created = await Transaction.create({...transactionObj, budgetId: budgetId});
        const created = await Transaction.create({...transactionObj});
        // const transactionId = created._id;
        // const updateBudget = await Budget.findOneAndUpdate(
        //     { _id: budgetId },
        //     { $addToSet: { transactions: transactionId } }
        // );
        // console.log(updateBudget);
        // console.log(created);
        return created;
        // return res.send("test");
    } catch (error) {
        return res.sendStatus(401);
    } 
}

// getTransactions - should return all transactions for specified budget
module.exports.getTransactions = async (budgetId) => {
    try {

        // const transactions = await Transaction.aggregate([
        //     { $match: { budgetId: new mongoose.Types.ObjectId(`${budgetId}`) } }
        // ]);
        const transactions = await Transaction.find({ budgetId: budgetId}).populate('categoryId').lean();
        return transactions;
    } catch (error) {
        return res.sendStatus(401);
    }
}

// updateTransaction - should update specified transaction
module.exports.updateTransaction = async (transactionId, updatedTransaction) => {
    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
      return false;
    }
    await Transaction.updateOne({ _id: transactionId }, updatedTransaction);
    return true;
  }