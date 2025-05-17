const { Router } = require("express");
const router = Router();
const categoriesDAO = require('../daos/categories');

// router.get('/', (req, res) => {
//     res.send([{categories: 'category 1'}]);
// });

// POST / - Create a category
router.post("/", async (req, res, next) => {
    const categoryObj = req.body;
    try {
        const newCategory = await categoriesDAO.createCategory(categoryObj);
        res.json(newCategory);
    } catch (error) {
        return res.sendStatus(401);
    }
});

module.exports = router;