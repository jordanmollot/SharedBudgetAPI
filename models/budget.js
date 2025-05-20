const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    transactions: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transaction' }],
    },
    balance: { type: Number, default: 0, required: true },
    expTotal: { type: Number, default: 0, required: true },
    incTotal: { type: Number, default: 0, required: true },
    // userId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "users",
    // required: true,
    // },
});

module.exports = mongoose.model("budget", budgetSchema);
