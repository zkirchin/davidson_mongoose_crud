var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');

/* GET recipes index. */
router.get('/', function(req, res, next) {
  Recipe.find().then(function(recipes) {
    res.render('recipes/index', {recipes: recipes});
  });
});

// GET new page
router.get('/new', function(req, res, next) {
  res.render('recipes/new');
});

// POST Recipe
router.post('/', function(req, res, next) {
  const name = req.body.name;
  const authorName = req.body.authorName;
  const authorEmail = req.body.authorEmail;
  const ingredients = req.body.ingredients.split(', ');
  const averageCost = req.body.averageCost;
  const lastUpdated = Date.now();

  var recipe = new Recipe({
    name: name,
    author: {
      name: authorName,
      email: authorEmail
    },
    ingredients: ingredients,
    averageCost: averageCost,
    lastUpdated: lastUpdated
  });

  recipe.save(function(err, results) {
    console.log(results._id);
    const recipeResultsId = results._id;
    res.redirect('/recipes/' + recipeResultsId);
  });

});

// GET recipe show
router.get('/:id', function(req, res, next) {
  Recipe.findOne({'_id': req.params.id }).then(function(recipe) {
    res.render('recipes/show', {recipe: recipe});
  });
});

// GET Author show
router.get('/author/:name', function(req, res, next) {
  res.send('Recipes of the author: ' + req.params.name);
});

module.exports = router;
