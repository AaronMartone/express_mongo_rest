'use strict';

// Require core modules.
var mongoose = require('mongoose');
var express = require('express');
var app = express();

// Create a Router for the app.
var notesRouter = express.Router();

// Connect to mongodb instance on 27017 (default port for mongodb)
// to define the port at prompt: $ PORT=5000 node server.js
// The 'notes_development' is the name of the database being used.
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/notes_development');

// Pass the 'notesRouter' into the 'notes_route' module. 
require('./routes/notes_routes')(notesRouter);

// For all calls routed to '/api', use the 'notesRouter' router object to handle requests.
app.use('/api', notesRouter);

// Listen on the specified port.
app.listen(process.env.PORT || 3000, function() {
    console.log('web app on server running on port ' + (process.env.PORT || 3000));
})