const Housing = require('../models/Housing');


async function createHousing(data) {
    const {name, type, year, city, image, description, availablePieces, owner} = data;

    const housing = new Housing({name, type, year, city, image, description, availablePieces, owner: owner});

    return housing.save();
}

module.exports = {
    createHousing,
}