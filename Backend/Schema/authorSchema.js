const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {type: String},
    lastName: {type: String},
    nationality: {type: String}
});

module.exports = mongoose.model('Author', authorSchema);