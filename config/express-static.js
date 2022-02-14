const express = require('express');
const path = require('path');

function setUpStaticFiles(app) {
    app.use(express.static(path.normalize(path.join(__dirname, '../public'))));
}


module.exports = setUpStaticFiles;