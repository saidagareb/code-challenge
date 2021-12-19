const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TextSchema = new Schema({
    frenchtext: {
        type: String
    },
    arabictext: {
        type: String
    },
    englishtext: {
        type: String
    },
    status: {
        type: String,
        enum: ['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'],
        default: 'DRAFT'
    },
});

//Export the model
module.exports = mongoose.model('Texte', TextSchema);