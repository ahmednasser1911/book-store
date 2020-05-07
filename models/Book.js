const mongoose = require('mongoose');

const bookScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
    },
    describtion: {
        type: String
    },
    previewLink: {
        type: String,
        required: true
    },
    cover: {
        data: Buffer, 
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Books = mongoose.model('Books' , bookScheme);

module.exports = Books;