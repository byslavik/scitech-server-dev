var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var peopleSchema = new Schema({
    "name": Array,
    "image": String,
    "description": Array,
    "contacts": Array,
    "sphere": Array,
    "specialization": Array,
    "publications": Array,
    "patents": Array,
    "projects": Array,
    "site": String,
    "address": Array,
    "job": Array,
    "type": String,
    "isCustom": Boolean,
    "creationDate": Date

});

var People = mongoose.model('People', peopleSchema);

module.exports = People;
