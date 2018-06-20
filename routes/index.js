var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Login
router.get('/login', function(req, res, next) {
  res.render('login', {message: req.flash('loginMessage')});
});
// create POST login

//Signup
router.get('/signup', function(req, res, next) {
  res.render('signup', {message: req.flash('signupMessage')});
});
// create POST signup

//Profile
router.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile', {
    user: req.user
  });
});

//Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// routes/index.js
// POST signup
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
}));

router.post('/login', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
