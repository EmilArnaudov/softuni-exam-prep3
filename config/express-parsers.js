const express = require('express');
const cookieParser = require('cookie-parser');

function applyParsers(app) {
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
}

module.exports = applyParsers;