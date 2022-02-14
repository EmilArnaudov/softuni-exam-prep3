function createErrorMessage(errors) {
    let arr = [];

    errors.forEach(x => {
        arr.push({errorMessage: `Sorry, field ${x} was filled incorrectly.`})
    })

    return arr;
}

module.exports = createErrorMessage;