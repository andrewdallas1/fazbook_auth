
// imports passport
const passport = require('passport');
// imports models/index
const models = require('../db/models/index');

// exports passprt serialize and deserialize functions
module.exports = () => {
  // serialize takes user info and allows thecomputer to store it
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

// deserialize takes the user data and converts it to something like a
// json object so teh app can manipulate it
  passport.deserializeUser((id, done) => {
    models.User.findById(id)
    .then((user) => { done(null, user); })
    // catches errors
    .catch((err) => { done(err, null); });
  });
};
