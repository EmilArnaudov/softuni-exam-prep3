const { authenticate } = require('../middlewares/authMiddleware');

function applyMiddlewares(app) {
    app.use(authenticate)
}

module.exports = applyMiddlewares;