const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    incOrExp: { type: String, enum: ['income', 'expense'], required: true }, 
});

module.exports = mongoose.model("category", categorySchema);