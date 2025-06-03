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

// getAllCategories - should return all categories
module.exports.getAllCategories = async () => {
    try {
        const categories = await Category.find().lean();
        return categories;
    } catch (error) {
        return res.sendStatus(401);
    }
}

// updateCategory - should update specified category
module.exports.updateCategory = async (categoryId, updatedCategory) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return false;
    }
    await Category.updateOne({ _id: categoryId }, updatedCategory);
    return true;
}

// deleteCategory - should delete specified category
module.exports.deleteCategory = async (categoryId) => {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return false;
    }
    await Category.deleteOne({ _id: categoryId });
    return true;
}