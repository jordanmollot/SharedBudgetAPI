const mongoose = require('mongoose');

const Budget = require('../models/budget');
const Transaction = require('../models/transaction');
const Category = require('../models/category');

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

// authorizedUser - checks if logged in user matches budget's userId
module.exports.authorizedUser = async (userId, budgetId) => {
    try {
        const userIdString = userId.toString();
        // console.log('userIdString: ', userIdString);
        const budget = await Budget.findById(budgetId);
        const budgetUserId = budget.userId.toString();
        if (userIdString === budgetUserId) {
            // console.log('userIdString: ', userIdString);
            // console.log('budgetUserId: ', budgetUserId);
            return true;
        }
        // return Budget.findOne({ _id: budgetId }).populate({ path: 'transactions', populate: { path: 'categoryId' }}).lean();
    } catch (error) {
        return res.sendStatus(400);
    }
}

// getTotals - calculates balance, total income and total expenses for specified budget
module.exports.getTotals = async (budgetId) => {
    try {
        const totals = await Transaction.aggregate([
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
            },
            {
                $group: {
                    _id: '$categoryInfo.incOrExp',
                    total: { $sum: '$amount'}
                }
            },
            {
                $group: {
                    _id: null,
                    incTotal: {
                        $sum: {
                            $cond: [{ $eq: ['$_id', 'income'] }, '$total', 0]
                        }
                    },
                    expTotal: {
                        $sum: {
                            $cond: [{ $eq: ['$_id', 'expense'] }, '$total', 0]
                        }
                    }
                }
            },
            {
                $addFields: {
                    balance: { $subtract: ['$incTotal', '$expTotal'] }
                }
            },
            {
                $project: {
                    _id: 0,
                    incTotal: 1,
                    expTotal: 1,
                    balance: 1
                }
            }
        ]);
        if (totals.length >= 0) {
        // if (totals || !totals) {    
            const { incTotal, expTotal, balance } = totals[0];
            const transactions = await Transaction.find({ budgetId: budgetId });
            await Budget.updateOne(
                { _id: budgetId },
                { incTotal: incTotal, expTotal: expTotal, balance: balance, transactions: transactions }
            );
            return true;
        }
    } catch (error) {
        return res.sendStatus(400);
    }
}

// getBudget - should return a budget by id
module.exports.getBudget = async (budgetId) => {
    try {
        return Budget.findOne({ _id: budgetId }).populate({ path: 'transactions', populate: { path: 'categoryId' }}).lean();
    } catch (error) {
        return res.sendStatus(400);
    }
}




//------
// getBudget (old) - should return a budget by id
// module.exports.getBudget = async (budgetId) => {
//     try {
//         // get all transactions for a specific budget using budgetId
//         // for each transaction use the categoryId to determine if the transaction is an expense or income
//         // for all expense get the sum which will be expTotal
//         // for all income get the sum which will be incTotal
//         // balance = incTotal - expTotal

//         // const budget = await Budget.findOne({ _id: budgetId }).lean();

//         // const budget = await Budget.aggregate([
//         //     { $match: { _id: new mongoose.Types.ObjectId(`${budgetId}`) } }

//         // ]);

//         const totals = await Transaction.aggregate([
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
//             },
//             {
//                 $group: {
//                     _id: '$categoryInfo.incOrExp',
//                     total: { $sum: '$amount'}
//                 }
//             },
//             {
//                 $group: {
//                     _id: null,
//                     incTotal: {
//                         $sum: {
//                             $cond: [{ $eq: ['$_id', 'income'] }, '$total', 0]
//                         }
//                     },
//                     expTotal: {
//                         $sum: {
//                             $cond: [{ $eq: ['$_id', 'expense'] }, '$total', 0]
//                         }
//                     }
//                 }
//             },
//             {
//                 $addFields: {
//                     balance: { $subtract: ['$incTotal', '$expTotal'] }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 0,
//                     incTotal: 1,
//                     expTotal: 1,
//                     balance: 1
//                 }
//             }
//         ]);
//         // const transactions = await Transaction.find({ budgetId: budgetId }).select('_id');
//         // const transIds = transactions.map(transaction => transaction._id);
//         if (totals.length > 0) {
//             const { incTotal, expTotal, balance } = totals[0];
//             const transactions = await Transaction.find({ budgetId: budgetId });
//             await Budget.updateOne(
//                 { _id: budgetId },
//                 { incTotal: incTotal, expTotal: expTotal, balance: balance, transactions: transactions }
//             );
//             // console.log(budget);
//             // return budget;
//         }
//         // return Budget.findOne({ _id: budgetId }).lean();

//         // return Budget.findOne({ _id: budgetId }).populate('transactions').lean();
//         return Budget.findOne({ _id: budgetId }).populate({ path: 'transactions', populate: { path: 'categoryId' }}).lean();
//     } catch (error) {
//         return res.sendStatus(400);
//     }
// }