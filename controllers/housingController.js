const router = require('express').Router();
const { createHousing } = require('../services/housingServices');
const createErrorMessage = require('../utils/errorMessage');
const Housing = require('../models/Housing');

router.get('/all', async (req, res) => {
    const housings = await Housing.find({}).lean();
    console.log(housings);
    return res.render('aprt-for-recent', { housings });
})

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', async (req, res) => {
    let housingData = req.body;

    try {
        let housing = await createHousing(housingData);
        return res.redirect('/housing/all');
    } catch (error) {
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        return res.render('create', {errorMessages})
    }
})

module.exports = router;