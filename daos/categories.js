const mongoose = require('mongoose');

const Category = require('../models/category');

module.exports = {};

// createCategory - should create a category
module.exports.createCategory = async (categoryObj) => {
    try {
        const created = await Category.create({...categoryObj});
        return created;
    } catch (error) {
        return res.sendStatus(401);
    } 
}

