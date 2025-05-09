const Schema = require('mongoose').Schema;
const db = require('../config/db.js');

const Review = db.model('Review', {
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    review_text: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = Review;