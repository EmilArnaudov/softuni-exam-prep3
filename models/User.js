const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [/^[A-Z][a-z]+\s[A-Z][a-z]+$/, 'Please enter a valid name.']
    },

    username: {
        type: String,
        required: true,
        minlength: [5, 'Username should be at least 5 characters long.']
    },

    password: {
        type: String,
        require: true,
        minlength: [4, 'Password should be at least 4 characters long.']
    },
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then((hashedPassword) => {
            this.password = hashedPassword;

            next();
        })
})

const User = mongoose.model('User', userSchema);



module.exports = User;