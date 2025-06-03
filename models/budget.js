const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    budgetTitle: { type: String, required: true },
    balance: { type: Number, default: 0, required: true },
    expTotal: { type: Number, default: 0, required: true },
    incTotal: { type: Number, default: 0, required: true },
    transactions: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'transaction' }],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
});

module.exports = mongoose.model("budget", budgetSchema);
