var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  name: String,
  author: {
    name: String,
    email: String
  },
  ingredients: Array,
  averageCost: Number,
  lastUpdated: Date
});

module.exports = mongoose.model('Recipe', recipeSchema);
