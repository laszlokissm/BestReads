const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/YOUR_DATABASE_NAME');

module.exports = mongoose;