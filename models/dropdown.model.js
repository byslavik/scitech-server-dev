var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dropdownSchema = new Schema({
    "name": String,
    "options": Array
});

var Dropdown = mongoose.model('Dropdown', dropdownSchema);

module.exports = Dropdown;
