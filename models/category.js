const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    incOrExp: { type: String, required: true }, 
    // budgetId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "budget",
    //     required: true,
    // },
});

module.exports = mongoose.model("category", categorySchema);