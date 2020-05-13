const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notesSchema = new Schema({
    content: {
        type: String
    }
});

var notesmodel = mongoose.model('notes', notesSchema);

module.exports = notesmodel;
