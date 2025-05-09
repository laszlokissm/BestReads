const Schema = require('mongoose').Schema;
const db = require('../config/db.js');

const User = db.model('User', {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    books: [{
        book: { type: Schema.Types.ObjectId, ref: 'Book' },
        tag: { type: String, enum: ['To be read', 'Currently reading', 'Finished'], default: null }
    }],
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

module.exports = User;