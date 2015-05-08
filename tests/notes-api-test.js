'use strict';

// By modifying this process' env variable to a 'notes_test' database, we are ensuring that we do not modify any info
// in the development/production databases.
process.env.MONGOLAB_URI = 'mongodb://localhost/notes_test';
require('../server');

// Require our core modules.
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var expect = chai.expect;

// Create a test suite:
describe('Notes REST API', function() {

    after(function(done) {
        // This ensures that after we test, we drop the database so that we don't see our changes cumulate after
        // multiple testing iterations.
        mongoose.connection.db.dropDatabase(function() {
            done();
        });
    });

    // Test case:
    it('should be able to create a new note', function(done) {
        chai.request('localhost:3000')
            .post('/api/notes')
            .send({noteBody: 'test note'})
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res.body.noteBody).to.eql('test note');
                expect(res.body).to.have.proeprty('_id');
                done();
            });
    });

    // Test case:
    it('should get an array of notes', function(done) {
        chai.request('localhost:3000')
            .get('/api/notes')
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(Array.isArray(res.body).to.eql(true));
        });
    });

});