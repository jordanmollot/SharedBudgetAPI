const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userDAO = require('../daos/user');

const isAuthorized = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, 'secret');
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// POST /signup - should create and user and use bcrypt on the incoming password. 
// store user with their email and encrypted password, 
router.post("/signup", async (req, res, next) => {
    const userObj = req.body;
    if (!req.body.password || JSON.stringify(req.body.password) === '{}' ) {
        res.sendStatus(400);
    } else {
        try {
            const newUser = await userDAO.createUser(userObj);
            return res.json(newUser);
        } catch (error) {
            return res.sendStatus(409);
        } 
    }
});

// POST /login - find the user with the provided email. 
// use bcrypt to compare stored password with the incoming password. 
// if they match, generate a JWT and return it to the user.
router.post("/login", async (req, res, next) => {

    const {email, password} = req.body;
    if (!password) {
        res.sendStatus(400);
    }
    const user = await userDAO.getUser(email, password);
    if (!user) {
        return res.sendStatus(401);
    }

    const token = jwt.sign({
        email: user.email,
        _id: user._id,
    }, 'secret', {expiresIn: '30m'});
    return res.send({token});
});

// PUT /password - should change password
router.put("/password", isAuthorized, async (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.user._id;
    if (!newPassword || JSON.stringify(newPassword) === '{}' ) {
        res.sendStatus(400);
    } else {
        try {
            await userDAO.changePassword(userId, newPassword);
            return res.sendStatus(200);
        } catch (error) {
            return res.sendStatus(401);
        } 
    }
});

module.exports = router;