var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    "name": Array,
    "creationDate": Date,
    "description": Array
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
