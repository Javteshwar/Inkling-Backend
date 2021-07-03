const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'file name required'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'file price required']
    }
});

const Document = mongoose.model('document', DocumentSchema);
module.exports = Document;