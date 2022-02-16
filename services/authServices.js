const User = require('../models/User');
const bcrypt = require('bcrypt');
const {SECRET} = require('../constants');
const { jwtSign } = require('../utils/jwtUtils');

async function register(name, username, password, repeatPassword) {
    if (!password === repeatPassword) {
        throw new Error('Passwords must match.');
    };

    let user = new User({name, username, password});

    return user.save()
}

async function login(username, password) {
    let user = await User.findOne({username: username}).lean();

    let passwordCorrect = await bcrypt.compare(password, user.password);

    if (passwordCorrect) {
        return user;
    } else {
        throw new Error('Email or password incorrect.')
    }

}

async function createToken(user) {
    let payload = {
        _id: user._id,
        username: user.username,
        name: user.name,
    }

    return jwtSign(payload, SECRET);
} 

module.exports = {
    register,
    login,
    createToken,
}