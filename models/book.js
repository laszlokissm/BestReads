const Schema = require('mongoose').Schema;
const db = require('../config/db.js');

const Book = db.model('Book', {
    _id: { type: Schema.Types.ObjectId, auto: true },
    title: String,
    author: String,
    description: String,
    ReleaseDate: Date,
    PageCount: Number,
    WordCount: Number,
    _reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = Book;