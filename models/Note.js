'use strict';

var mongoose = require('mongoose');

// the .Schema() method takes an object that defines the schema.
// note that just because we change the schema does not mean that any data already created on the old schema will be
// updated in order to comply with the new schema.
var noteSchema = mongoose.Schema({
    author: String,
    noteBody: String
});

// export the model by defining the constructor (Note) to its schema object (noteSchema).
// mongodb will take the model name and use it for the collection name (table).
module.exports = mongoose.model('Note', noteSchema);