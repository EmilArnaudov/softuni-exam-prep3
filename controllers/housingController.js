const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', async (req, res) => {
})

module.exports = router;