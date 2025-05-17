const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    res.send([{budget: 'budget 1'}]);
});

module.exports = router;