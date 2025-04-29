const Schema = require('mongoose').Schema;
const db = require('../config/db.js');

const Book = db.model('Book', {
    title: String,
    author: String,
    ReleaseDate: Date,
    PageCount: Number,
    WordCount: Number,

});

module.exports = Book;