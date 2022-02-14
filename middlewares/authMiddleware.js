const {TOKEN_COOKIE_NAME, SECRET} = require('../constants');
const jwt = require('jsonwebtoken');
const { jwtVerify } = require('../utils/jwtUtils');


async function authenticate(req, res, next) {
    let token = req.cookies[TOKEN_COOKIE_NAME];

    if (!token) {
        return next();
    }
    
    try {

        let verifiedToken = await jwtVerify(token, SECRET);
        req.user = verifiedToken;
        res.locals.user = verifiedToken;
        return next();

    } catch (error) {

        return res.status(401).redirect('/login');
    }
}

async function isAuthenticated(req, res, next) {

    if (!req.user) {
        return res.status(401).redirect('/login');
    };

    return next();
}

module.exports = {
    authenticate,
    isAuthenticated,
}