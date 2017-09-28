var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var langVarSchema = new Schema({
    "key": String,
    "value": String,
    "lang": String
});

var LangVar = mongoose.model('LangVar', langVarSchema);

module.exports = LangVar;
