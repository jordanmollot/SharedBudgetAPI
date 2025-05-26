const { Router } = require("express");
const router = Router();
const categoriesDAO = require('../daos/categories');

// POST / - Should create a category
router.post("/", async (req, res, next) => {
    const categoryObj = req.body;
    try {
        const newCategory = await categoriesDAO.createCategory(categoryObj);
        res.json(newCategory);
    } catch (error) {
        return res.sendStatus(401);
    }
});

// GET / - Should return all categories
router.get("/", async (req, res, next) => {
    try {
        const categories = await categoriesDAO.getAllCategories();
        if (categories) {
            res.json(categories);
            } else {
            res.sendStatus(404);
            }
    } catch (error) {
        return res.sendStatus(400);
    }
});

// PUT /:id - Should update specified category
router.put("/:id", async (req, res, next) => {
    const categoryId = req.params.id;
    const updatedCategory = req.body;
    if (!updatedCategory || JSON.stringify(updatedCategory) === '{}' ) {
      res.status(400).send('category details are required"');
    } else {
      try {
        const success = await categoriesDAO.updateCategory(categoryId, updatedCategory);
        res.sendStatus(success ? 200 : 400);  
      } catch (error) {
        return res.sendStatus(400);
      }
    }
});


// DELETE /:id - Should delete specified category
router.delete("/:id", async (req, res, next) => {
    const categoryId = req.params.id;
    try {
        const success = await categoriesDAO.deleteCategory(categoryId);
        res.sendStatus(success ? 200 : 400);
    } catch(e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;