const Schema = require('mongoose').Schema;
const db = require('../config/db.js');

const User = db.model('User', {
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});

module.exports = User;