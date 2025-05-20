const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    description: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    amount: { type: Number, required: true },
    // budgetId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "budget",
    //     required: true,
    // },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
});

module.exports = mongoose.model("transaction", transactionSchema);