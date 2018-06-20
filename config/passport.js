// config/passport.js
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {
    // session setup
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // local signup
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err) {
              return done(err);
            }

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
              var newUser = new User();

              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              // save the user
              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
            }

        });

        });

    }));

    // config/passport.js
    // just above final '};'

        // local login
        passport.use('local-login', new LocalStrategy({
           usernameField : 'email',
           passwordField : 'password',
           passReqToCallback : true
       },
       function(req, email, password, done) {
           User.findOne({ 'local.email' :  email }, function(err, user) {
               if (err) {
                   return done(err);
               }
               if (!user) {
                  return done(null, false, req.flash('loginMessage', 'No user found.'));
               }
               // if the user is found but the password is wrong
               if (!user.validPassword(password)) {
                   return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
               }
               // all is well, return successful user
               return done(null, user);
           });

       }));
};
