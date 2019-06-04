const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    isbn: {type: String},
    author: {type: String},
    price: {type: Number},
    yearOfPublication: {type: Number},
    publisher: {type: String}
});

module.exports = mongoose.model('Book', bookSchema);
