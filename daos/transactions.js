const mongoose = require('mongoose');

const Transaction = require('../models/transaction');
const Budget = require('../models/budget');
const transaction = require('../models/transaction');

module.exports = {};

// createTransaction - should create a transaction
module.exports.createTransaction = async (transactionObj) => {
    try {
        const created = await Transaction.create({...transactionObj});
        return created;
    } catch (error) {
        return res.sendStatus(401);
    } 
}

// getTransaction - should return specified transaction
module.exports.getTransaction = async (transactionId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(transactionId)) {
            return false;
        }
        const transaction = await Transaction.findById(transactionId).populate('categoryId').lean();
        return transaction;
    } catch (error) {
        return res.sendStatus(401);
    }
}

// getFilteredTransactionsb - should return filtered transactions for specified budget 
// (filters transacactions by either category, income or expense)
module.exports.getFilteredTransactions = async (budgetId, incOrExp, category) => {
    try {
        const pipeline = [
            { 
                $match: { 
                    budgetId: new mongoose.Types.ObjectId(`${budgetId}`) 
                } 
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'categoryInfo'
                }
            },
            {
                $unwind: '$categoryInfo'
            }
        ];

        if (incOrExp === 'income' || incOrExp === 'expense') {
            pipeline.push({
                $match: {
                    'categoryInfo.incOrExp': incOrExp
                }
            });
        }

        if (category) {
            pipeline.push({
                $match: {
                    'categoryInfo.title': category
                }
            });
        }

        pipeline.push({
            $project: {
                _id: 1,
                description: 1,
                amount: 1,
                date: 1,
                // categoryId: 1,
                budgetId: 1,
                incOrExp: '$categoryInfo.incOrExp',
                category: '$categoryInfo.title'
            }
        });

        const transactions = await Transaction.aggregate(pipeline);
        
        return transactions;
    } catch (error) {
        return res.sendStatus(401);
    }
}

// getBudgetId - should return specified transaction's budgetId
module.exports.getBudgetId = async (transactionId) => {
    try {
        const transaction = await Transaction.findById(transactionId).select('budgetId');
        const budgetId = transaction.budgetId.toString();
        return budgetId;
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

// deleteTransaction - should delete specified transaction
module.exports.deleteTransaction = async (transactionId) => {
    if (!mongoose.Types.ObjectId.isValid(transactionId)) {
        return false;
    }
    await Transaction.deleteOne({ _id: transactionId });
    return true;
}