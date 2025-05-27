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
        // console.log(budgetId);
        // console.log(incOrExp);
        // console.log(category);
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

// getTransactions - should return all transactions for specified budget
// module.exports.getTransactions = async (budgetId) => {
//     try {
//         console.log(budgetId);
//         // const transactions = await Transaction.aggregate([
//         //     { $match: { budgetId: new mongoose.Types.ObjectId(`${budgetId}`) } }
//         // ]);
//         const transactions = await Transaction.find({ budgetId: budgetId}).populate('categoryId').lean();
//         return transactions;
//     } catch (error) {
//         return res.sendStatus(401);
//     }
// }

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



//----
//old
// getFilteredTransactionsb - should return filtered transactions for specified budget 
// (filters transacactions by either category, income or expense)
// module.exports.getFilteredTransactions = async (budgetId, incOrExp, category) => {
//     try {
//         // console.log(budgetId);
//         // console.log(incOrExp);
//         // console.log(category);
//         const transactions = await Transaction.aggregate([
//             { 
//                 $match: { 
//                     budgetId: new mongoose.Types.ObjectId(`${budgetId}`) 
//                 } 
//             },
//             {
//                 $lookup: {
//                     from: 'categories',
//                     localField: 'categoryId',
//                     foreignField: '_id',
//                     as: 'categoryInfo'
//                 }
//             },
//             {
//                 $unwind: '$categoryInfo'
//             }
//         ]);

//         // const transactions = await Transaction.find({ budgetId: budgetId}).populate('categoryId').lean();
        
//         return transactions;
//     } catch (error) {
//         return res.sendStatus(401);
//     }
// }