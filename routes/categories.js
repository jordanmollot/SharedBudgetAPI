const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    res.send([{categories: 'category 1'}]);
});

module.exports = router;