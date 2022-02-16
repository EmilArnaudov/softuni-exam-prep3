const Housing = require('../models/Housing');
const User = require('../models/User');

async function createHousing(data) {
    const {name, type, year, city, image, description, availablePieces, owner} = data;

    const housing = new Housing({name, type, year, city, image, description, availablePieces, owner});

    return housing.save();
}

async function editHousing(data) {
    const {name, type, year, city, image, description, availablePieces, _id} = data;

    return Housing.updateOne({_id: _id}, {name, type, year, city, image, description, availablePieces}, {runValidators: true});
} 

async function getHousingDetails(housingId, user) {

    let housing = await Housing.findById(housingId).lean();
    housing.hasTenants = housing.tenants.length > 0;
    

    if (housing.hasTenants) {
        housing.tenants = housing.tenants.map(x => x.toString());

        let tenantModels = await User.find({_id: {$in: housing.tenants}}).lean();
        housing.tenantNames = tenantModels.map(x => x.name).join(', ');
    }

    if (!user) {
        return housing;
    }

    user.isCreator = false;
    user.isTenant = false;

    if (housing.owner.toString() === user._id) {
        user.isCreator = true;
    }

    if (housing.tenants.includes(user._id)) {
        user.isTenant = true;
    }

    return [housing, user]
}  

module.exports = {
    createHousing,
    getHousingDetails,
    editHousing,
}