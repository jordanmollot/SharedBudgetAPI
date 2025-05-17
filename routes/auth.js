const { Router } = require("express");
const router = Router();

router.get('/', (req, res) => {
    res.send([{auth: 'auth 1'}]);
});

module.exports = router;