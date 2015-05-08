'use strict';

// Require core modules.
var bodyParser = require('body-parser');

// Require our mongodb 'Note' model.
var Note = require('../models/Note');

// Pass in a router object.
module.exports = function(router) {

    // Creates a new 'req.body' object that contains the JSON-parsed body as a JS object.
    router.use(bodyParser.json());

    router.get('/notes', function(req, res, next) {

        // Returns back an array of documents that match the contents of the object inside the .find() method.
        Note.find({}, function(err, data) {
            if (err) {
                consoel.log(err);
                return res.status(500);json({ msg: 'internal server error' });
            }

            res.json(data);
        });
    });

    // When a request POSTs to '/api/notes', create a new record (dccument), using the Note schema being passed in the 
    // newly created 'req.body' JS object. We then save
    router.post('/notes', function(req, res, next) {
        var newNote = new Note(req.body);

        // This is an async function (note the callback) that takes the data that is in the 'newNote' model and saves
        // it to the database. If we do not get an error, we use 'res.json()' to output the data to the screen.
        newNote.save(function(err, data) {

            // Best practice: We .log() the in-depth error to the console, but we only provide to the user 
            // generic-level data that does not pose a security risk.   
            if (err) {
                console.log(err); 
                return res.status(500).json({ msg: 'internal server error' });  
            }

            // Display the data to the user. The data that comes back will have an '_id' field that indicates the
            // unique identifier for this document/record. NOTE: any data sent that is not defined in the schema will
            // be ignored and not returned.
            res.json(data);

        });
    });

}