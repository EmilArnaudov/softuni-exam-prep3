const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [6, 'Name should be at least 6 characters long.']
    },

    type: {
        type: String,
        required: true,
        enum: ['Apartment', 'Villa', 'House']
    },

    year: {
        type: Number,
        required: true,
        min: [1850, 'Year cannot be less than 1850'],
        max: [2021, 'Year cannot be more than 2021'],
    },
    
    city: {
        type: String,
        required: true,
        minlength: [4, 'City name cannot be less than 4 characters long.']
    },
    
    image: {
        type: String,
        required: true,
        validate: [/^https?:\/\/.+$/, 'Image should be a valid image.']
    },
    
    description: {
        type: String,
        required: true,
        maxlength: [60, 'Description cannot not be longer than 40 characters.']
    },
    
    availablePieces: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    
    tenants: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})