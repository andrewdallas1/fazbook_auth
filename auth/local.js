// imports passport
const passport = require('passport');
// imports passport-local strategy
const LocalStrategy = require('passport-local').Strategy;

// imports passport functions declared in passport.js
const init = require('./passport');
// imports models from db directory
const models = require('../db/models/index');
// imports auth helpers functions
const authHelpers = require('../auth/auth-helpers');

const options = {};

// executes auth/passport functions
init();

// uses passports local strategy to allow only one account per person
passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  models.User.findAll({
    where: {
      username
    }
  })
  .then((user) => {
    if (user[0] === undefined) {
      return done(null, false);
    }
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
      return done(null, false);
    } else {
      return done(null, user[0].dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));

// exports this model
module.exports = passport;
