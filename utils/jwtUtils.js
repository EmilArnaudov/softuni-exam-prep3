const jwt = require('jsonwebtoken');

function jwtSign(payload, secret) {
    let promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })

    return promise;
}

function jwtVerify(token, secret) {
    let promise = new Promise((resolve, reject) => {
        jwt.verify(token, secret, function(err, decodedToken) {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken);
            }
        })
    })

    return promise;
}


module.exports = {
    jwtSign,
    jwtVerify,
}