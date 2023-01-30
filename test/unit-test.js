let chai = require("chai");
var request = require('request');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/FullStackDB');

//server connection
it('Main page content', function(done) {
    request('http://localhost:8080' , function(error, response, body) {
        done();
    });
});

//mongoose database connection
it('Main page content', function(done) {
    mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });
    done();
});