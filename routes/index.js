const { Router } = require("express");
const router = Router();

router.use("/auth", require('./auth'));
router.use("/budgets", require('./budgets'));
router.use("/transactions", require('./transactions'));
router.use("/categories", require('./categories'));

module.exports = router;