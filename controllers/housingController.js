const router = require('express').Router();
const { createHousing } = require('../services/housingServices');
const { getHousingDetails } = require('../services/housingServices');
const { editHousing } = require('../services/housingServices');
const { deleteHousing } = require('../services/housingServices');
const { joinHousing } = require('../services/housingServices');
const createErrorMessage = require('../utils/errorMessage');
const Housing = require('../models/Housing');

router.get('/all', async (req, res) => {
    const housings = await Housing.find({}).lean();
    return res.render('aprt-for-recent', { housings });
})

router.get('/details/:id', async (req, res) => {
    let housingId = req.params.id;
    let userData = req.user;

    let [housing, user] = await getHousingDetails(housingId, userData);

    return res.render('details', {housing, user})
})

router.get('/rent/:id', async (req, res) => {
    const userId = req.user._id;
    const housingId = req.params.id;

    try {
        await joinHousing(userId, housingId);
        return res.redirect(`/housing/details/${housingId}`);
    } catch (error) {
        console.log(error);
    }
})

router.get('/delete/:id', async (req, res) => {
    const housingId = req.params.id;

    try {
        await deleteHousing(housingId)
        return res.redirect('/housing/all');
    } catch (error) {
        return res.redirect('/housing/all');
    }
})

router.get('/edit/:id', async (req, res) => {
    const housingId = req.params.id;
    const housing = await Housing.findById(housingId).lean();

    return res.render('edit', {housing});
});

router.post('/edit/:id', async (req, res) => {

    const housingId = req.params.id;
    const housingData = req.body;
    housingData._id = housingId;

    const housing = await Housing.findById(housingId).lean();

    try {
        const housing = await editHousing(housingData);
        return res.redirect(`/housing/all`);
    } catch (error) {
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        return res.render('edit', {housing, errorMessages});
    }

})

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', async (req, res) => {
    let housingData = req.body;
    housingData.owner = req.user._id

    try {
        let housing = await createHousing(housingData);
        return res.redirect('/housing/all');
    } catch (error) {
        let errorMessages = createErrorMessage(Object.keys(error.errors));
        return res.render('create', {errorMessages})
    }
})

module.exports = router;