const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {};

// getUser - should get a user record using their email
module.exports.getUser = async (email, plaintextPassword) => {
    const user = await User.findOne({email});
    if (!user) {
        return undefined;
    }

    const hasValidPassword = await bcrypt.compare(plaintextPassword, user.password);
    if (hasValidPassword) {
        return user;
    } else {
        return undefined;
    }
}

// createUser - should store a user record
module.exports.createUser = async (userObj) => {
    const email = userObj.email;
    const hashedPassword = await bcrypt.hash(userObj.password, 10);
    const user = await User.create({email, password: hashedPassword});
    return user;
}

// changePassword - should change user password
module.exports.changePassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ _id: userId }, {password: hashedPassword});
}